import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePetDto {

  @ApiProperty({ example: 'Bruno' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Dog' })
  @IsString()
  @IsNotEmpty()
  type: string;
}