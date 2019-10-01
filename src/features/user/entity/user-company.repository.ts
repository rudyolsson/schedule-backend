import { EntityRepository } from 'typeorm';
import { CommonRepository } from '../../../core/database/common.repository';
import { Company } from '../../company/entity/company.entity';
import { User } from './user.entity';
import { UserCompanyBuilder } from '../builder/user-company.builder';
import { UserCompany } from './user-company.entity';

@EntityRepository(UserCompany)
export class UserCompanyRepository extends CommonRepository<UserCompany> {
  public async saveEntity(user: User, company: Company): Promise<UserCompany> {
    const userCompany: UserCompany = await new UserCompanyBuilder()
      .setUser(user)
      .setBrand(company)
      .build();
    return await this.save(userCompany);
  }
}
