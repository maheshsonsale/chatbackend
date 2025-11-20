import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chatapp')
    , UserModule, ChatModule
  ],
 
})
export class AppModule { }
