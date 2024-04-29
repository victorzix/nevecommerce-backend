import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientsRepository } from '../repositories/clients.repository';
import { UsersService } from '@/shared/users/services/users.services';
import { CreateClientRequestDTO } from '../dtos';
import { cpf } from 'cpf-cnpj-validator';
import { UpdateUserDTO } from '@/shared/users/dtos';

@Injectable()
export class ClientsService {
  constructor(
    private clientsRepository: ClientsRepository,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateClientRequestDTO) {
    if (!cpf.isValid(dto.cpf)) {
      throw new BadRequestException('Invalid CPF');
    }

    const user = await this.usersService.register({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });

    const client = await this.clientsRepository.register({
      cpf: dto.cpf,
      userId: user.id,
    });

    return client;
  }

  async getById(id: string) {
    const client = await this.clientsRepository.getById(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async listClients() {
    const clients = await this.clientsRepository.listClients();
    return clients;
  }

  async updateClient(userId: string, dto: UpdateUserDTO) {
    const client = await this.clientsRepository.getByUserId(userId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const updatedClient = await this.usersService.updateUser(userId, dto);

    if (!updatedClient) {
      throw new BadRequestException('Could not update this user');
    }

    return updatedClient;
  }

  async delete(userId: string) {
    const client = await this.clientsRepository.getByUserId(userId);

    if (!client) {
      throw new BadRequestException('Could not update this account');
    }

    await this.clientsRepository.delete(client.id);

    return;
  }
}
