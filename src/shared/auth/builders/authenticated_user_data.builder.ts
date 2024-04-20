export class AuthenticatedUserDataBuilder {
  static createAuthenticateUserData({ id, name, email }) {
    return { id, name, email };
  }
}
