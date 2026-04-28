import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password cannot be longer than 32 characters' })
  password: string;

  @IsString()
  firstName: string;

  // Since we made lastName nullable in the entity, we make it optional in the dto
  @IsOptional()
  @IsString()
  lastName?: string;
}