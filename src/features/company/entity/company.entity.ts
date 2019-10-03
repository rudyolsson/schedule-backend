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
import { Department } from './department.entity';

@Entity({ name: 't_company' })
export class Company extends TraceableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @OneToMany(type => UserCompany, company => company.company)
    users: UserCompany[];

    @OneToMany(type => Department, department => department.company)
    departments: Department[];

    constructor(companyBuilder: CompanyBuilder) {
        super();
        if (companyBuilder) {
        this.id = companyBuilder.id;
        this.name = companyBuilder.name;
        }
    }
}
