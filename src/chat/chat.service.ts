import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/chat.dto';


@Injectable()
export class ChatService {
  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

}
