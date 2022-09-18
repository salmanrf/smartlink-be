import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  @ApiProperty({ example: 'salmanrf' })
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({ example: 'asdasd' })
  password: string;
}
