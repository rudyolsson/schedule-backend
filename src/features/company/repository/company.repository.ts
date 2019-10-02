import {
    EntityRepository,
    UpdateResult,
    } from 'typeorm';
import { CommonRepository } from '../../../core/database/common.repository';
import { Company } from '../entity/company.entity';
import { CompanyBuilder } from '../builder/company.builder';
import { CompanyDto } from '../dto/company.dto';

@EntityRepository(Company)
  export class CompanyRepository extends CommonRepository<Company> {
    public async updateEntity(
      companyId,
      {
        name,
      }: CompanyDto,
    ): Promise<UpdateResult> {
      const company: Company = await new CompanyBuilder()
        .setName(name)
        .build();

      return await this.update(companyId, company);
    }
  }
