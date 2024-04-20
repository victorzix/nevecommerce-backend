import { Admin } from '@/admins/dtos';
import { UserPayloadDTO } from '../dtos/user_payload.dto';

export class UserPayloadBuilder {
  static createAdminPayload(admin: Admin): UserPayloadDTO {
    const { id, email } = admin;
    return { id, email };
  }
}
