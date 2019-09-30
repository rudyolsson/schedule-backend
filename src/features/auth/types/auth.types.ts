export enum Role {
    GOD = 'ROLE_GOD',
    ADMIN = 'ROLE_ADMIN',
    BASIC_USER = 'ROLE_BASIC_USER',
  }

export class JwtPayload {
  email: string;
  roles: Role[];
}
