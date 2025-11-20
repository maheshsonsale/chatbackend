import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  receiver?: Types.ObjectId; // For DMs

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  roomId?: Types.ObjectId; // For group chats

  @Prop({ required: true })
  content: string;

  @Prop({ type: String, enum: ['text', 'image', 'file', 'video'], default: 'text' })
  messageType: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ type: Date })
  readAt?: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isEdited: boolean;

  @Prop({ type: [String], default: [] })
  attachments: string[]; // File URLs

  @Prop({ default: Date.now })
  sentAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
