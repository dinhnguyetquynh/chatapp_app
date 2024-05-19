import {ConversationRes, Conversation} from '../models/conversation';
import request, {Request} from '../utils/request';

class ConversationService {
  constructor(private req: Request) {
    this.req = req;
  }

  async getConversationList() {
    return this.req.get<ConversationRes>('/conversations');
  }

  async getConversationById(id: string) {
    return this.req.get<Conversation>(`/conversations/${id}`);
  }
}

const conversationService = new ConversationService(request);
export default conversationService;
