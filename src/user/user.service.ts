import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { SignupDto, LoginDto, ResendOtpDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }


  //  ************************************* user create *********************************

  async signup(dto: SignupDto) {
    const { username, email, password } = dto;

    const existing = await this.userModel.findOne({ $or: [{ email }, { username }] });
    if (existing) return console.log('User already exists');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      username,
      email,
      password,
      otp,

    });
    const dataObj = {
      userId:user._id,
      otp
    }

    return { status: true, message: 'Account created. Verify your OTP to activate.', data: dataObj };
  }

  async verifyOtp(userId: string, otp: string) {
    const user = await this.userModel.findById(userId);
    if (!user) return ({ status: false, message: 'User not found' });

    if (user.verified) return ({ status: false, message: 'User already verified' });

    if (user.otp !== otp) return ({ status: false, message: 'Invalid OTP' });

    await this.userModel.findOneAndUpdate({ _id: userId }, { $set: { verified: true, otp: "" } }, { new: true })

    return { status: true, message: 'Account verified successfully' };
  }

  async resendOtp(dto: ResendOtpDto) {
  const { userId } = dto;

  // Find user by ID
  const user = await this.userModel.findById(userId);

  if (!user) return ({status:false,message:'User not found'});

  // Generate new OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  await user.save();

  console.log(`✅ Resent OTP for ${user.email}: ${otp}`); // For testing; replace with email/SMS in production

  return {
    status: true,
    message: 'OTP resent successfully',
    data: { userId: user._id, otp },
  };
}


  async login(dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.userModel.findOne({ username, password });
    if (!user) return ({ status: false, message: 'User not found by user name or password' });

    if (!user.verified) return ({ status: false, message: 'Account not verified' });

    return { data: user, message: "login success", status: true };
  }
}
