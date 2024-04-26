import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAdminRequestDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
