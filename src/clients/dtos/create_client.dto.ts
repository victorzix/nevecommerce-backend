import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateClientDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(11)
  cpf: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  userId: string;
}
