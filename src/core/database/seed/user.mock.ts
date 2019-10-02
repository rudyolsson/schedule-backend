import { User } from '../../../features/user/entity/user.entity';
import { UserBuilder } from '../../../features/user/builder/user.builder';
import { Company } from '../../../features/company/entity/company.entity';
import { UserCompanyBuilder } from '../../../features/user/builder/user-company.builder';
import { UserCompany } from '../../../features/user/entity/user-company.entity';
import { CryptoUtils } from '../../lib/utils/crypto.utils';

export async function createUserMock(email: string): Promise<User> {
  const user: User = await new UserBuilder()
    .setEmail(email)
    .setPassword(CryptoUtils.encrypt('123'))
    .build()
    .save();

  console.log('*****************************************');
  console.log(`User ${email} created with id ${user.id}`);
  return user;
}

export async function createUserCompanyMock(
  user: User,
  company: Company,
): Promise<UserCompany> {
  const userCompany: UserCompany = await new UserCompanyBuilder()
    .setUser(user)
    .setCompany(company)
    .build()
    .save();

  console.log(`  Hashed user ${user.id} and Company ${company.name} are linked`);
  return userCompany;
}
