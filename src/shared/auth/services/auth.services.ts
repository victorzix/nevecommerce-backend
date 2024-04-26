import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginData } from '@/shared/auth/interfaces/login_data.dto';
import { PasswordUtils } from '../utils/password.utils';
import { UserPayloadDTO } from '../dtos/user_payload.dto';
import { UserPayloadBuilder } from '../builders/user_payload.builder';
import { UsersService } from '@/shared/users/services/users.services';
import { User } from '@/shared/users/dtos/';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginData) {
    const user: User = await this.usersService.getByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await PasswordUtils.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload: UserPayloadDTO = UserPayloadBuilder.createAdminPayload(user);

    const token = this.jwtService.sign(payload);

    return { payload, token };
  }
}
