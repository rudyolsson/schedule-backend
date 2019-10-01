import { User } from '../entity/user.entity';
import { CryptoUtils } from '../../../core/lib/utils/crypto.utils';

export class UserBuilder {
  private _email: string;
  private _isActive: boolean;
  private _password: string;

  constructor() {}

  build(): User {
    return new User(this);
  }

  setEmail(email: string): UserBuilder {
    this._email = email;
    return this;
  }

  setPassword(value: string): UserBuilder {
    this._password = CryptoUtils.encrypt(value);
    return this;
  }

  setIsActive(value: boolean): UserBuilder {
    this._isActive = value;
    return this;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return CryptoUtils.decrypt(this._password);
  }

  get isActive(): boolean {
    return this._isActive;
  }
}
