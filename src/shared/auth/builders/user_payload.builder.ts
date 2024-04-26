import { UserPayloadDTO } from '../dtos/user_payload.dto';
import { User } from '@/shared/users/dtos/user.dto';

export class UserPayloadBuilder {
  static createAdminPayload(user: User): UserPayloadDTO {
    const { id, email } = user;
    return { id, email };
  }
}
