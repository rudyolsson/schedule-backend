import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TraceableEntity } from '../../../core/database/traceable.entity';
import { Company } from '../../company/entity/company.entity';
import { User } from './user.entity';
import { UserCompanyBuilder } from '../builder/user-company.builder';

@Entity({ name: 't_user_company' })
export class UserCompany extends TraceableEntity {
  @ManyToOne(type => User, user => user.companies, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Company, company => company.users, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  constructor(userCompanyBuilder: UserCompanyBuilder) {
    super();
    if (userCompanyBuilder) {
      this.user = userCompanyBuilder.user;
      this.company = userCompanyBuilder.company;
    }
  }
}
