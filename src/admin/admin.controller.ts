import {
  Controller,
  Get,
  Render,
  UseGuards,
  Post,
  Req,
  Redirect,
  Res,
  UseFilters,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { LoginGuard } from 'src/auth/guard/login.guard';
import { AuthExceptionFilter } from 'src/auth/filter/auth-exceptions.filter';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserValidationPipe } from 'src/user/pipe/create_user.validation.pipe';

@Controller('admin/')
@UseFilters(AuthExceptionFilter)
export class AdminController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render('admin/page/home/index')
  adminHomePage(@Req() req) {
    return { user: req.user };
  }

  //!--> Authentication
  @Get('auth/login')
  @Render('admin/page/login/index')
  loginPage() {
    return {};
  }

  @Post('auth/login')
  @UseGuards(LoginGuard)
  @Redirect('/admin')
  handleLogin(@Req() req) {
    return req.user;
  }

  @Get('auth/logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('/admin/auth/login');
  }
  //! End Authentication <--

  //! --> User
  @Get('manageusers/general')
  @UseGuards(AuthenticatedGuard)
  @Render('admin/page/users/general')
  generalUser(@Req() req) {
    return { user: req.user };
  }

  @Get('manageusers/general/create-user')
  @UseGuards(AuthenticatedGuard)
  @Render('admin/page/users/create_user')
  createUserPage(@Req() req) {
    return { user: req.user };
  }

  @Post('/users')
  @UseGuards(AuthenticatedGuard)
  async createUser(
    @Body(new CreateUserValidationPipe()) createUserDto: CreateUserDto,
  ) {
    await this.userService.createUser(createUserDto);
  }

  //! End User <--
}
