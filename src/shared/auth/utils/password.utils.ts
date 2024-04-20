import { compare, hash } from 'bcrypt';

export class PasswordUtils {
  static async hashPassword(password: string) {
    const pwd = await hash(password, 12);
    return pwd;
  }

  static async validatePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
