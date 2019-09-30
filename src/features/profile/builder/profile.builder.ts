import { Profile } from '../entity/profile.entity';
import { User } from '../../user/entity/user.entity';

export class ProfileBuilder {
  private _user: User;
  private _lastName: string;
  private _firstName: string;
  private _phone: string;
  private _country: string;
  private _address: string;
  private _additionalAddress: string;
  private _zip: number;
  private _city: string;

  constructor() {}

  build(): Profile {
    return new Profile(this);
  }

  public get user(): User {
    return this._user;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get phone(): string {
    return this._phone;
  }

  public get country(): string {
    return this._country;
  }

  public get address(): string {
    return this._address;
  }

  public get additionalAddress(): string {
    return this._additionalAddress;
  }

  public get zip(): number {
    return this._zip;
  }

  public get city(): string {
    return this._city;
  }

  public setUser(value: User): ProfileBuilder {
    this._user = value;
    return this;
  }

  public setLastName(value: string): ProfileBuilder {
    this._lastName = value;
    return this;
  }

  public setFirstName(value: string): ProfileBuilder {
    this._firstName = value;
    return this;
  }

  public setPhone(value: string): ProfileBuilder {
    this._phone = value;
    return this;
  }

  public setCountry(value: string): ProfileBuilder {
    this._country = value;
    return this;
  }

  public setAddress(value: string): ProfileBuilder {
    this._address = value;
    return this;
  }

  public setAdditionalAddress(value: string): ProfileBuilder {
    this._additionalAddress = value;
    return this;
  }

  public setZip(value: number): ProfileBuilder {
    this._zip = value;
    return this;
  }

  public setCity(value: string): ProfileBuilder {
    this._city = value;
    return this;
  }
}
