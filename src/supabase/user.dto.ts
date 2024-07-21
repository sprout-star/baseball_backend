import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;  // Email field with validation

  @IsString()
  jobTitle: string;

  @IsString()
  @IsOptional()
  aboutMe?: string;

  @IsString()
  @IsOptional()
  twitter?: string;

  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  linkedin?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsOptional()
  picture?: any;  // Handle file upload, no specific validation here
}