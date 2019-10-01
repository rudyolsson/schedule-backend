import { User } from '../entity/user.entity';
import { Company } from '../../company/entity/company.entity';
import { UserCompany } from '../entity/user-company.entity';

export class UserCompanyBuilder {
  private _user: User;
  private _company: Company;

  constructor() {}

  build(): UserCompany {
    return new UserCompany(this);
  }

  setUser(user: User): UserCompanyBuilder {
    this._user = user;
    return this;
  }

  setCompany(company: Company): UserCompanyBuilder {
    this._company = company;
    return this;
  }

  get user(): User {
    return this._user;
  }
  get company(): Company {
    return this._company;
  }
}
