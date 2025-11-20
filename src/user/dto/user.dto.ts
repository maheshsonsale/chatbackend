import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'johndoe' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'johndoe' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsNotEmpty()
  password: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '64c1f2b7e3b8d1234567890a', description: 'User ID' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '123456', description: 'OTP sent to user' })
  @IsNotEmpty()
  otp: string;
}
export class ResendOtpDto {
  @ApiProperty({ example: '64c1f2b7e3b8d1234567890a', description: 'User ID' })
  @IsNotEmpty()
  userId: string;
}