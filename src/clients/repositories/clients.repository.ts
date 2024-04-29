import { PrismaService } from '@/config/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { Client, CreateClientDTO } from '@/clients/dtos';

@Injectable()
export class ClientsRepository {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateClientDTO): Promise<Client> {
    const client = await this.prisma.client.create({
      data: dto,
    });
    return client;
  }

  async getById(id: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { id },
    });
    return client;
  }

  async getByUserId(userId: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { userId },
    });
    return client;
  }

  async listClients() {
    const clients = await this.prisma.client.findMany();
    return clients;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({
      where: { id },
    });
    return;
  }
}
