import { Company } from '../../../features/company/entity/company.entity';
import { CompanyBuilder } from '../../../features/company/builder/company.builder';

export async function createCompanyMock(
  name: string,
  companyId: string,
): Promise<Company> {
  const company: Company = await new CompanyBuilder()
    .setId(companyId)
    .setName(name)
    .build()
    .save();

  console.log('*****************************************');
  console.log(`Company ${name} created with is ${company.id}`);
  return company;
}
