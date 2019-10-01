import {
    Column,
    Entity,
    EntityRepository,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
import { UserBuilder } from '../builder/user.builder';
import { TraceableEntity } from '../../../core/database/traceable.entity';
import { Profile } from '../../profile/entity/profile.entity';
import { Role } from '../../auth/types/auth.types';
import { UserCompany } from './user-company.entity';

@Entity({ name: 't_user' })
  @Unique(['email'])
  export class User extends TraceableEntity {
    constructor(userBuilder: UserBuilder) {
      super();
      if (userBuilder) {
        this.email = userBuilder.email;
        this.isActive = userBuilder.isActive;
        this.password = userBuilder.password;
      }
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToOne(type => Profile, profile => profile.user)
    profile: Profile;

    @OneToMany(type => UserCompany, company => company.user)
    companies: UserCompany[];

    roles: Role[];
  }
