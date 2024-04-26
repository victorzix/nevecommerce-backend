import { AdminsService } from '@/admins/services/admins.service';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateAdminRequestDTO } from '../dtos/create_admin_request.dto';

@ApiTags('Admins')
@Controller('admin')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @Post()
  async register(@Body() dto: CreateAdminRequestDTO, @Res() res: Response) {
    const admin = await this.adminsService.create(dto);

    return res.status(HttpStatus.CREATED).json({
      data: admin,
      status: HttpStatus.CREATED,
    });
  }
}
