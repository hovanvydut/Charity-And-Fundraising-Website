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
    const userList = await this.userService.getUsers();
    return {
      user: req.user,
      message: { status: 'error', contents: req.flash('error') },
      userList,
    };
  }

  @Get('/create-user')
  @Render('admin/page/users/create_user')
  createUserPage(@Req() req) {
    return {
      user: req.user,
      message: {
        status: 'error',
        contents: req.flash('error'),
      },
      formData: req.flash('formData')[0],
    };
  }

  @Post('/create-user')
  @UseFilters(CreateUserExceptionFilter)
  async createUser(
    @Body(new CreateUserValidationPipe()) createUserDto: CreateUserDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      await this.userService.createUser(createUserDto);
      return res.redirect('general');
    } catch (error) {
      req.flash('error', error.message);
      req.flash('formData', createUserDto);
      return res.redirect('create-user');
    }
  }

  @Get('/:id/edit')
  @Render('admin/page/users/edit_user')
  async editUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const userData = await this.userService.findOne({ id });
    return { user: req.user, userData, message: {} };
  }

  @Patch('/:id/edit')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new UpdateUserValidationPipe()) updateUserDto: UpdateUserDto,
    @Res() res,
    @Req() req,
  ) {
    await this.userService.updateUser(id, updateUserDto);
    await this.sessionService.destroyByUserId(id);
    return res.redirect(`/admin/manageusers/${id}/edit`);
  }

  @Delete('/:id/delete')
  @Redirect('/admin/manageusers/general')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
