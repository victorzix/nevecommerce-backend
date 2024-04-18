import { AdminsService } from '@/admins/services/admins.service';
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminDTO } from '@/admins/dtos';
import { Response } from 'express';

@ApiTags('Admins')
@Controller('admin')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @Post()
  async register(@Body() dto: CreateAdminDTO, @Res() res: Response) {
    const admin = await this.adminsService.register(dto);

    return res.status(HttpStatus.CREATED).json({
      data: admin,
      status: HttpStatus.CREATED,
    });
  }

  @Delete('adminId')
  async deleteAdmin(@Param('adminId') adminId: string, @Res() res: Response) {
    await this.adminsService.delete(adminId);

    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
