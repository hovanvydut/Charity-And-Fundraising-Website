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

@Controller('admin/campaign')
@Roles(RoleEnum.ADMIN, RoleEnum.MOD)
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseFilters(AuthExceptionFilter)
export class CampaignController {
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
  ) {
    if (!createCampaignDto.thumbnail) delete createCampaignDto.thumbnail;
    const returnedData = await this.campaignService.createCampaign(
      createCampaignDto,
    );
    const campaign = returnedData.generatedMaps[0];
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
  ) {
    await this.campaignService.updateCampaign(idOfCampaign, updateCampaignDto);
    req.flash('message', ['success', 'Cập nhật thành công']);
    res.redirect(`/admin/campaign/${idOfCampaign}/edit`);
  }

  @Delete(':id/delete')
  async deleteCampaign(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Res() res,
  ) {
    await this.campaignService.deleteById(id);
    req.flash('message', ['success', 'Xóa chiến dịch thành công']);
    res.redirect('/admin/campaign/general');
  }
}
