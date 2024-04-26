import { UsersRepository } from '@/shared/users/repositories/users.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from '@/shared/users/dtos/create_user.dto';
import { PasswordUtils } from '@/shared/auth/utils/password.utils';
import { User } from '@/shared/users/dtos/user.dto';
import { UpdateUserDTO } from '../dtos/update_user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async register(dto: CreateUserDTO): Promise<User> {
    const checkUser = await this.usersRepository.getByEmail(dto.email);

    if (checkUser) {
      throw new BadRequestException('User already registered');
    }

    const hashedPass = await PasswordUtils.hashPassword(dto.password);

    const user = await this.usersRepository.register({
      ...dto,
      password: hashedPass,
    });

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getById(userId: string): Promise<User> {
    const user = await this.usersRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(userId: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.getById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.usersRepository.update(user.id, data);

    if (!updatedUser) {
      throw new BadRequestException('Could not update this user');
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);

    return;
  }
}
