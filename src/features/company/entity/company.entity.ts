import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { TraceableEntity } from '../../../core/database/traceable.entity';
import { CompanyBuilder } from '../builder/company.builder';
import { UserCompany } from '../../user/entity/user-company.entity';

@Entity({ name: 't_company' })
@Unique(['name'])
export class Company extends TraceableEntity {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ nullable: false })
name: string;

constructor(companyBuilder: CompanyBuilder) {
    super();
    if (companyBuilder) {
    this.id = companyBuilder.id;
    this.name = companyBuilder.name;
    }
}

@OneToMany(type => UserCompany, company => company.company)
users: UserCompany[];

}
