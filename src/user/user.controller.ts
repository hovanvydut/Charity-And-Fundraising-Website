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
  Redirect,
  Delete,
  InternalServerErrorException,
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

@Controller('admin/manageusers')
@Roles(RoleEnum.ADMIN, RoleEnum.MOD)
@UseGuards(AuthenticatedGuard, RolesGuard)
@UseFilters(AuthExceptionFilter)
export class UserController {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  @Get('/general')
  @Render('admin/page/users/general')
  async generalUser(@Req() req) {
    const messageFlash = req.flash('message');
    const userList = await this.userService.getUsers();
    return {
      user: req.user,
      message: {
        status: messageFlash[0],
        contents: messageFlash.slice(1),
      },
      userList,
    };
  }

  @Get('/create-user')
  @Render('admin/page/users/create_user')
  createUserPage(@Req() req) {
    const messageFlash = req.flash('message');
    return {
      user: req.user,
      message: {
        status: messageFlash[0],
        contents: messageFlash.slice(1),
      },
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
    @GetUser() currentUSer: User,
    @Res() res,
    @Req() req,
  ) {
    try {
      await this.userService.deleteUser(id, currentUSer);
      await this.sessionService.destroyByUserId(id);
      req.flash('message', ['success', 'Xóa thành công']);
      return res.redirect('/admin/manageusers/general');
    } catch (error) {
      req.flash('message', ['error', error.message]);
      return res.redirect(`/admin/manageusers/${id}/edit`);
    }
  }
}
