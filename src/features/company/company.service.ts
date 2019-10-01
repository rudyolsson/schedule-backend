import { Injectable } from '@nestjs/common';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { Company } from './entity/company.entity';
import { CompanyRepository } from './entity/company.repository';
import { getCustomRepository, UpdateResult } from 'typeorm';
import { CompanyBuilder } from './builder/company.builder';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor() {}

  @Transactional({ propagation: Propagation.MANDATORY })
  public async findById(
    id: string,
    select: string[],
    relation: string[] = [],
  ): Promise<Company> {
    const companyRepository: CompanyRepository = getCustomRepository(
      CompanyRepository,
    );
    const company: Company = await companyRepository.findById(id, select, relation);
    return company;
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async findByName(
    name: string,
    select: string[],
    relation: string[] = [],
  ): Promise<Company> {
    const companyRepository: CompanyRepository = getCustomRepository(
      CompanyRepository,
    );
    const company: Company = await companyRepository.findByName(
      name,
      select,
      relation,
    );
    return company;
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async create(name: string): Promise<Company> {
    const companyRepository: CompanyRepository = getCustomRepository(
      CompanyRepository,
    );
    const company: Company = await new CompanyBuilder()
      .setName(name)
      .build();

    return await companyRepository.save(company);
  }

  @Transactional({ propagation: Propagation.MANDATORY })
  public async update(
    companyId: string,
    companyDto: CompanyDto,
  ): Promise<UpdateResult> {
    const companyRepository: CompanyRepository = getCustomRepository(
      CompanyRepository,
    );
    return await companyRepository.updateEntity(companyId, companyDto);
  }
}
