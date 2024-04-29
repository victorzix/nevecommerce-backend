import { UserPayloadDTO } from '../dtos/user_payload.dto';
import { User } from '@/shared/users/dtos/';

export class UserPayloadBuilder {
  static createUserPayload(user: User): UserPayloadDTO {
    const { id, email } = user;
    return { id, email };
  }
}
