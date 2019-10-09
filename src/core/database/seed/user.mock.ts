import { User } from '../../../features/user/entity/user.entity';
import { UserBuilder } from '../../../features/user/builder/user.builder';
import { Company } from '../../../features/company/entity/company.entity';
import { UserCompanyBuilder } from '../../../features/user/builder/user-company.builder';
import { UserCompany } from '../../../features/user/entity/user-company.entity';
import { CryptoUtils } from '../../lib/utils/crypto.utils';
import { ProfileBuilder } from 'src/features/profile/builder/profile.builder';
import { Profile } from 'src/features/profile/entity/profile.entity';

export async function createUserMock(email: string): Promise<User> {
  const user: User = await new UserBuilder()
    .setEmail(email)
    .setPassword(await CryptoUtils.getHash('123'))
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

  console.log(
    `  Hashed user ${user.id} and Company ${company.name} are linked`,
  );
  return userCompany;
}

export async function createUserProfileMock(
  user: User,
  firstName: string,
  lastName: string,
  country: string,
  address: string,
  phone: string,
): Promise<Profile> {
  const profile: Profile = await new ProfileBuilder()
    .setUser(user)
    .setFirstName(firstName)
    .setLastName(lastName)
    .setCountry(country)
    .setAddress(address)
    .setPhone(phone)
    .build()
    .save();
  console.log(`  Profile for user ${user.id} created`);
  return profile;
}
