import {
  Controller,
  Get,
  Render,
  Body,
  Post,
  Res,
  Param,
  ParseIntPipe,
  UseGuards,
  UseFilters,
  Delete,
  Req,
  Patch,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { GetUser } from 'src/user/other/get_user.decorator';
import { GetFlashMessage } from 'src/user/other/get_flash_message';
import { FlashMessageDto } from 'src/user/dto/flash_message';
import { CreateCampaignDto } from './dto/create_campaign.dto';
import { CampaignService } from './campaign.service';
import { AuthExceptionFilter } from 'src/auth/filter/auth_exceptions.filter';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { RoleEnum } from 'src/user/other/user_role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import cloudinary from './../config/cloudinary.config';
import { multerOptions } from 'src/config/multer.config.';
import * as fs from 'fs';
import { MessageDiscordLogger } from 'src/config/logger/message.discord.logger.dto';
import DiscordLogger from 'src/config/logger/discord.logger';

@Controller('admin/campaign')
@Roles(RoleEnum.ADMIN, RoleEnum.MOD)
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseFilters(AuthExceptionFilter)
export class CampaignController {
  private discordLogger = new DiscordLogger();

  constructor(private campaignService: CampaignService) {}

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(@UploadedFile() file, @Query() query) {
    const tags = query.tag || 'other';
    const uploadedImg = await cloudinary.uploader.upload(file.path, {
      tags,
      folder: 'Charity_And_Fundraising/upload/campaign',
    });
    const thumbnailUrl = uploadedImg.url;
    fs.unlinkSync(file.path);
    return { location: thumbnailUrl };
  }

  @Get('/general')
  @Render('admin/page/campaign/general')
  async viewGeneral(
    @GetUser() user,
    @GetFlashMessage() message: FlashMessageDto,
  ) {
    const campaigns = await this.campaignService.getAllCampaign();
    return {
      user,
      message,
      campaigns,
    };
  }

  @Get('create')
  @Render('admin/page/campaign/create_campaign')
  viewCreateCampaign(
    @GetUser() user,
    @GetFlashMessage() message: FlashMessageDto,
  ) {
    return {
      user,
      message,
      formData: null,
    };
  }

  @Post('create')
  async createCampaign(
    @Body() createCampaignDto: CreateCampaignDto,
    @Res() res,
    @GetUser() currentUser,
  ) {
    if (!createCampaignDto.thumbnail) delete createCampaignDto.thumbnail;
    const returnedData = await this.campaignService.createCampaign(
      createCampaignDto,
    );
    const campaign = returnedData.generatedMaps[0];

    const logMessage: MessageDiscordLogger = new MessageDiscordLogger(
      `${RoleEnum[currentUser.role]} @${
        currentUser.name
      } CREATE NEW CAMPAIGN (${createCampaignDto.name}) #email: ${
        currentUser.email
      }`,
    );
    this.discordLogger.log(logMessage);

    return res.redirect(`/admin/campaign/${campaign.id}/edit`);
  }

  @Get(':id/edit')
  @Render('admin/page/campaign/edit_campaign')
  async viewEditCampaign(
    @GetUser() user,
    @GetFlashMessage() message: FlashMessageDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const campaign = await this.campaignService.getCampaignById(id);
    return {
      user,
      message,
      campaign,
    };
  }

  @Patch(':id/update')
  async updateCampaign(
    @Param('id', ParseIntPipe) idOfCampaign: number,
    @Body() updateCampaignDto,
    @Req() req,
    @Res() res,
    @GetUser() currentUser,
  ) {
    await this.campaignService.updateCampaign(idOfCampaign, updateCampaignDto);

    const logMessage: MessageDiscordLogger = new MessageDiscordLogger(
      `${RoleEnum[currentUser.role]} @${currentUser.name} UPDATE CAMPAIGN: ${
        updateCampaignDto.name
      } #email: ${currentUser.email}`,
    );
    this.discordLogger.log(logMessage);
    req.flash('message', ['success', 'Cập nhật thành công']);

    res.redirect(`/admin/campaign/${idOfCampaign}/edit`);
  }

  @Delete(':id/delete')
  async deleteCampaign(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Res() res,
    @GetUser() currentUser,
  ) {
    await this.campaignService.deleteById(id);

    const logMessage: MessageDiscordLogger = new MessageDiscordLogger(
      `${RoleEnum[currentUser.role]} @${
        currentUser.name
      } DELETE CAMPAIGN which has id = ${id} #email: ${currentUser.email}`,
    );
    this.discordLogger.log(logMessage);
    req.flash('message', ['success', 'Xóa chiến dịch thành công']);
    res.redirect('/admin/campaign/general');
  }
}
