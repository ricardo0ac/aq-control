import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsString()
  @Matches(/^[a-zA-Z]+\.?$/, {
    message: 'Proporcione un username válido',
  })
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @MinLength(1)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Proporcione un Nombre válido',
  })
  nombre: string;

  @IsString()
  @MinLength(1)
  rol: string;
}
