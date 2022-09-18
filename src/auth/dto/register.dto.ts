import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  @ApiProperty({ example: 'salmanrf' })
  username: string;

  @IsString()
  @MinLength(10)
  @MaxLength(15)
  @ApiProperty({ example: '08979457877' })
  phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({ example: 'asdasd' })
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({ example: 'Salman Rizqi Fatih' })
  name: string;
}
