import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ default:"" })
  username: string;

  @Prop({ default :"" })
  email: string;

  @Prop({ default :"" })
  password: string;

  @Prop({ default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' })
  avatarUrl: string;

  @Prop({ default: 'Hey there! I am using ChatApp.' })
  bio: string;

  @Prop({default:""})
  otp:string

  @Prop({default:false})
  verified:boolean

//   @Prop({ type: [String], default: [] })
//   friends: string[]; // store user IDs

//   @Prop({ type: [String], default: [] })
//   blockedUsers: string[];

//   @Prop({ default: false })
//   isOnline: boolean;

//   @Prop({ default: Date.now })
//   lastActive: Date;

//   @Prop({ default: 'user', enum: ['user', 'admin', 'moderator'] })
//   role: string;

//   @Prop()
//   resetPasswordToken?: string;

//   @Prop()
//   resetPasswordExpires?: Date;

  // For 2FA or login verification
//   @Prop()
//   twoFactorSecret?: string;

//   @Prop({ default: false })
//   isTwoFactorEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
