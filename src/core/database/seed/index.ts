import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Company } from '../../../features/company/entity/company.entity';
import { User } from '../../../features/user/entity/user.entity';
import { createCompanyMock } from './company.mock';
import { createUserMock, createUserCompanyMock } from './user.mock';
const databaseConf = require('../../config/database');

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

    const evilCorp = await createCompanyMock(
    'Evil Corp',
    '1462b10e-a861-4863-92d2-af8377796626',
    );
    const rudy = await createUserMocks(
     evilCorp,
     'rudyolsson@gmail.com',
        );

    console.log('Finished');
    process.exit(0);
  })();
