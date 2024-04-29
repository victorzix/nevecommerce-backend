import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientsService } from '@/clients/services/clients.service';
import { CreateClientRequestDTO } from '../dtos';
import { Request, Response } from 'express';
import { UpdateUserDTO } from '@/shared/users/dtos';
import { AuthGuard } from '@/shared/guards/auth.guard';
import { PermissionGuard } from '@/shared/guards/permission.guard';
import { RegisterGuard } from '@/shared/guards/register.guard';

@ApiTags('Clients')
@Controller('client')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @UseGuards(RegisterGuard)
  @Post()
  async create(@Body() dto: CreateClientRequestDTO, @Res() res: Response) {
    const client = await this.clientsService.create(dto);

    return res.status(HttpStatus.CREATED).json({
      data: client,
      status: HttpStatus.CREATED,
    });
  }

  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard)
  @Get('list')
  async listClients(@Res() res: Response) {
    const clients = await this.clientsService.listClients();

    return res.status(HttpStatus.OK).json({
      data: clients,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':userId')
  async updateAdmin(
    @Param('userId') userId: string,
    @Res() res: Response,
    @Body() data: UpdateUserDTO,
  ) {
    const client = await this.clientsService.updateClient(userId, data);

    return res.status(HttpStatus.OK).json({
      data: client,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteAdmin(@Req() req: Request, @Res() res: Response) {
    await this.clientsService.delete(req.user.id);

    return res.clearCookie('access_token').status(HttpStatus.NO_CONTENT).json();
  }
}
