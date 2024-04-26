import { UsersService } from '@/shared/users/services/users.services';
import { AuthService } from '@/shared/auth/services/auth.services';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginData } from '@/shared/auth/interfaces/login_data.dto';
import { Request, Response } from 'express';
import { RegisterGuard } from '@/shared/guards/register.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(RegisterGuard)
  @Post('login')
  async login(
    @Body() payload: LoginData,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.authService.login(payload);
    req['user'] = user.payload;
    return res.cookie('access_token', user.token).status(HttpStatus.OK).json({
      message: 'Successfully logged in',
      status: HttpStatus.OK,
    });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie('access_token').status(HttpStatus.OK).json({
      message: 'Successfuly logged out',
      status: HttpStatus.OK,
    });
  }
}
