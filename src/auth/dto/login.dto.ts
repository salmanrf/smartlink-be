import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
