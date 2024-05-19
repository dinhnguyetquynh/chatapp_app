import {FriendListRes, FriendReq} from '../models/friend';
import request, {Request} from '../utils/request';

class FriendService {
  constructor(private req: Request) {
    this.req = req;
  }
  //   async login(data: LoginDataReq) {
  //     console.log(data);
  //     return this.req.post<LoginDataRes>('/auth/login', data);
  //   }
  async getListFriend() {
    const data = this.req.get<FriendListRes>('/friends/list');
    return data;
  }
  async addFriend(data: FriendReq) {
    console.log(data);
    return this.req.post('/friends', data);
  }
}

const friendService = new FriendService(request);
export default friendService;
