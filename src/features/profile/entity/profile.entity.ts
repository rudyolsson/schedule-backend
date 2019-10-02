import {
  Column,
  Entity,
  EntityRepository,
  OneToOne,
  JoinColumn,
  Unique,
  PrimaryColumn,
} from 'typeorm';
import { TraceableEntity } from '../../../core/database/traceable.entity';
import { User } from '../../user/entity/user.entity';
import { ProfileBuilder } from '../builder/profile.builder';

@Entity({ name: 't_profile' })
@Unique(['phone'])
export class Profile extends TraceableEntity {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  additionalAddress: string;

  @Column({ nullable: true })
  zip: number;

  @Column({ nullable: true })
  city: string;

  @OneToOne(type => User, user => user.profile, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  constructor(profileBuilder: ProfileBuilder) {
    super();
    if (profileBuilder) {
      this.user = profileBuilder.user;
      this.firstName = profileBuilder.firstName;
      this.lastName = profileBuilder.lastName;
      this.phone = profileBuilder.phone;
      this.country = profileBuilder.country;
      this.address = profileBuilder.address;
      this.additionalAddress = profileBuilder.additionalAddress;
      this.zip = profileBuilder.zip;
      this.city = profileBuilder.city;
    }
  }
}
