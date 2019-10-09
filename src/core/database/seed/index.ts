import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Company } from '../../../features/company/entity/company.entity';
import { User } from '../../../features/user/entity/user.entity';
import { Profile } from '../../../features/profile/entity/profile.entity';
import { createCompanyMock } from './company.mock';
import {
  createUserMock,
  createUserCompanyMock,
  createUserProfileMock,
} from './user.mock';
const databaseConf = require('../../config/database');

async function remove(
  user: boolean,
  company: boolean,
  profile: boolean,
): Promise<void> {
  if (user) {
    await User.delete({});
  }
  if (company) {
    await Company.delete({});
  }
  if (profile) {
    await Profile.delete({});
  }
  console.log('Remove data executed');
}

async function createUserMocks(
  company: Company,
  userEmail: string,
): Promise<User> {
  const user: User = await createUserMock(userEmail);
  await createUserCompanyMock(user, company);

  return user;
}

(async () => {
  await createConnection(databaseConf);
  await remove(true, true, true);

  const evilCorp = await createCompanyMock(
    'Evil Corp',
    '1462b10e-a861-4863-92d2-af8377796626',
  );
  const rudy = await createUserMocks(evilCorp, 'rudyolsson@gmail.com');
  await createUserProfileMock(
    rudy,
    'Rudy',
    'Olsson',
    'France',
    '1 Street',
    '+33 34 34 34 34 34',
  );
  console.log('Finished');
  process.exit(0);
})();
