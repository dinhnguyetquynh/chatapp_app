import {MessageRes} from '../models/message';
import request, {Request} from '../utils/request';

class MessageService {
  constructor(private req: Request) {
    this.req = req;
  }

  async getMessageListByConversationId(id: string) {
    return this.req.get<MessageRes>(`/messages/${id}?page=1&limit=10`);
  }

  async sendMessage(formData: FormData) {
    return this.req.post('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

const messageService = new MessageService(request);
export default messageService;
