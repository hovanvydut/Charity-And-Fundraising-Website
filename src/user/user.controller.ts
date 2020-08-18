import {
  Controller,
  Post,
  UseGuards,
  UseFilters,
  Body,
  Req,
  Res,
  Get,
  Render,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { CreateUserExceptionFilter } from './filter/create_user.exception.filter';
import { UserService } from './user.service';
import { CreateUserValidationPipe } from './pipe/create_user.validation.pipe';
import { CreateUserDto } from './dto/create_user.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RoleEnum } from './other/user_role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UpdateUserDto } from './dto/update_user.dto';
import { AuthExceptionFilter } from 'src/auth/filter/auth_exceptions.filter';
import { UpdateUserValidationPipe } from './pipe/update_user.validation.pipe';
import { SessionService } from 'src/session/session.service';
import { GetUser } from './other/get_user.decorator';
import { User } from './user.entity';
import { GetFlashMessage } from './other/get_flash_message';
import { FlashMessageDto } from './dto/flash_message';
import { FileInterceptor } from '@nestjs/platform-express';
import cloudinary from './../config/cloudinary.config';
import { multerOptions } from 'src/config/multer.config.';
import * as fs from 'fs';
import DiscordLogger from 'src/config/logger/discord.logger';
import { MessageDiscordLogger } from 'src/config/logger/message.discord.logger.dto';

@Controller('admin/manageusers')
@Roles(RoleEnum.ADMIN, RoleEnum.MOD)
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseFilters(AuthExceptionFilter)
export class UserController {
  private discordLogger = new DiscordLogger();

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  @Get('/general')
  @Render('admin/page/users/general')
  async generalUser(@Req() req, @GetFlashMessage() message) {
    const userList = await this.userService.getUsers();
    return {
      user: req.user,
      message,
      userList,
    };
  }

  @Get('/create-user')
  @Render('admin/page/users/create_user')
  viewCreateUserPage(@Req() req, @GetFlashMessage() message) {
    return {
      user: req.user,
      message,
      formData: req.flash('formData')[0],
    };
  }

  @Post('/create-user')
  @UseFilters(CreateUserExceptionFilter)
  async createUser(
    @Body(new CreateUserValidationPipe()) createUserDto: CreateUserDto,
    @GetUser() currentUser: User,
    @Req() req,
    @Res() res,
  ) {
    try {
      await this.userService.createUser(createUserDto, currentUser);

      const logMessage: MessageDiscordLogger = new MessageDiscordLogger(
        `${RoleEnum[currentUser.role]} @${
          currentUser.name
        } CREATE NEW USER who has email: ${createUserDto.email} and role: ${
          RoleEnum[currentUser.role]
        } #email: ${currentUser.email}`,
      );
      this.discordLogger.log(logMessage);
      req.flash('message', ['success', 'Tạo người dùng thành công']);

      return res.redirect('general');
    } catch (error) {
      req.flash('message', ['error', error.message]);
      req.flash('formData', createUserDto);
      return res.redirect('create-user');
    }
  }

  @Get('/:id/edit')
  @Render('admin/page/users/edit_user')
  async editUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const messageFlash = req.flash('message');
    const userData = await this.userService.findOne({ id });
    return {
      user: req.user,
      userData,
      message: {
        status: messageFlash[0],
        contents: messageFlash.slice(1),
      },
    };
  }

  @Patch('/:id/edit')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new UpdateUserValidationPipe()) updateUserDto: UpdateUserDto,
    @Res() res,
    @Req() req,
    @GetUser() currentUser: User,
  ) {
    try {
      await this.userService.updateUser(id, updateUserDto, currentUser);

      const logMessage: MessageDiscordLogger = new MessageDiscordLogger(
        `${RoleEnum[currentUser.role]} @${
          currentUser.name
        } UPDATE USER who has email: ${updateUserDto.email} and role: ${
          RoleEnum[updateUserDto.role]
        } #email: ${currentUser.email}`,
      );
      this.discordLogger.log(logMessage);

      if (currentUser.id === id)
        req.session.passport.user = {
          ...req.session.passport.user,
          ...updateUserDto,
        };
      req.session.save(function(error) {
        !error
          ? req.flash('message', ['success', 'Cập nhật thành công'])
          : req.flash('message', ['error', error.message]);

        return res.redirect(`/admin/manageusers/${id}/edit`);
      });
    } catch (error) {
      req.flash('message', ['error', error.message]);
      return res.redirect(`/admin/manageusers/${id}/edit`);
    }
  }

  @Delete('/:id/delete')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() currentUser: User,
    @Res() res,
    @Req() req,
  ) {
    try {
      await this.userService.deleteUser(id, currentUser);
      await this.sessionService.destroyByUserId(id);

      const logMessage: MessageDiscordLogger = new MessageDiscordLogger(
        `${RoleEnum[currentUser.role]} @${
          currentUser.name
        } DELETE USER who has id: ${id} #email: ${currentUser.email}`,
      );
      this.discordLogger.log(logMessage);
      req.flash('message', ['success', 'Xóa thành công']);

      return res.redirect('/admin/manageusers/general');
    } catch (error) {
      req.flash('message', ['error', error.message]);
      return res.redirect(`/admin/manageusers/${id}/edit`);
    }
  }

  // ! MY-PROFILE
  @Roles(RoleEnum.VOLUNTEER, RoleEnum.SPONSOR, RoleEnum.MOD, RoleEnum.ADMIN)
  @Get('/my-profile')
  @Render('admin/page/users/profile')
  async viewMyProfile(
    @GetUser() user,
    @GetFlashMessage() message: FlashMessageDto,
  ) {
    const userData = await this.userService.findOne({ id: user.id });
    return {
      user,
      message,
      userData,
    };
  }

  @Roles(RoleEnum.VOLUNTEER, RoleEnum.SPONSOR, RoleEnum.MOD, RoleEnum.ADMIN)
  @Patch('/my-profile/update')
  async updateMyProfile(
    @Req() req,
    @Res() res,
    @GetUser() currentUser,
    @Body(UpdateUserValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.updateUser(
        currentUser.id,
        updateUserDto,
        currentUser,
      );
      req.session.passport.user = {
        ...req.session.passport.user,
        ...updateUserDto,
      };
      await req.session.save();
      req.flash('message', ['success', 'Cập nhật thành công']);
    } catch (error) {
      req.flash('message', ['error', error.message]);
    }
    return res.redirect('/admin/manageusers/my-profile');
  }

  @Roles(RoleEnum.VOLUNTEER, RoleEnum.SPONSOR, RoleEnum.MOD, RoleEnum.ADMIN)
  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(@UploadedFile() file, @Query() query) {
    const tags = query.tag || 'other';
    const uploadedImg = await cloudinary.uploader.upload(file.path, {
      tags,
      folder: 'Charity_And_Fundraising/upload/avatar',
    });
    const thumbnailUrl = uploadedImg.url;
    fs.unlinkSync(file.path);
    return { location: thumbnailUrl };
  }
}
