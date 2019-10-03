import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { TraceableEntity } from '../../../core/database/traceable.entity';
import { Company } from './company.entity';
import { DepartmentBuilder } from '../builder/department.builder';
import { Shift } from 'src/features/shift/entity/shift.entity';

@Entity({ name: 't_department' })
export class Department extends TraceableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    companyId: string;

    @ManyToOne(type => Company, company => company.departments, {
            onDelete: 'CASCADE',
          })
    @JoinColumn({ name: 'companyId' })
    company: Company;

    @OneToMany(type => Shift, shift => shift.department)
    shifts: Shift[];

    constructor(departmentBuilder: DepartmentBuilder) {
        super();
        if (departmentBuilder) {
            this.id = departmentBuilder.id;
            this.name = departmentBuilder.name;
            this.companyId = departmentBuilder.companyId;
        }
    }
}
