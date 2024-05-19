import {UserRes} from '../models/user';
import request, {Request} from '../utils/request';

class UserService {
  constructor(private req: Request) {
    this.req = req;
  }
  async getInfo() {
    return this.req.get<UserRes>('/users');
  }
  async getUserByPhone(phoneNumber: string) {
    return this.req.get<UserRes>(`/users/${phoneNumber}/phone`);
  }
  async updateUserNameAndAvatar(data: FormData) {
    return this.req.put('/users', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
const userService = new UserService(request);
export default userService;
