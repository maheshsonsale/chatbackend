import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignupDto,LoginDto, VerifyOtpDto, ResendOtpDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new account' })
  signup(@Body() dto: SignupDto) {
    return this.userService.signup(dto);
  }

  @Post('resendOtp')
  @ApiOperation({ summary: 'Resend OTP to user using userId' })
  @ApiResponse({ status: 200, description: 'OTP resent successfully' })
  resendOtp(@Body() dto: ResendOtpDto) {
    return this.userService.resendOtp(dto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify user OTP' })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.userService.verifyOtp(dto.userId, dto.otp);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }
}
