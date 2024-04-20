import { AdminsService } from '@/admins/services/admins.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginData } from '@/shared/auth/interfaces/login_data.dto';
import { PasswordUtils } from '../utils/password.utils';
import { Admin } from '@/admins/dtos';
import { UserPayloadDTO } from '../dtos/user_payload.dto';
import { UserPayloadBuilder } from '../builders/user_payload.builder';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginData) {
    const user: Admin = await this.adminsService.getByEmail(email);

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
