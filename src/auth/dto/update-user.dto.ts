import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  IsBoolean,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  isBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsOptional()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  rol?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
