import { AdminsService } from '@/admins/services/admins.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateAdminRequestDTO } from '../dtos/create_admin_request.dto';
import { AuthGuard } from '@/shared/guards/auth.guard';

@ApiTags('Admins')
@UseGuards(AuthGuard)
@Controller('admin')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @Post()
  async create(@Body() dto: CreateAdminRequestDTO, @Res() res: Response) {
    const admin = await this.adminsService.create(dto);

    return res.status(HttpStatus.CREATED).json({
      data: admin,
      status: HttpStatus.CREATED,
    });
  }

  @Get('list')
  async listAdmins(@Res() res: Response) {
    const admins = await this.adminsService.listAdmins();

    return res.status(HttpStatus.OK).json({
      data: admins,
      status: HttpStatus.OK,
    });
  }

  @Delete()
  async deleteAdmin(@Req() req: Request, @Res() res: Response) {
    await this.adminsService.delete(req.user.id);

    return res.clearCookie('access_token').status(HttpStatus.NO_CONTENT).json();
  }
}
