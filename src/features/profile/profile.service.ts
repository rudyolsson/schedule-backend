import { Injectable } from '@nestjs/common';
import { Profile } from './entity/profile.entity';
import { ProfileRepository } from './entity/profile.repository';
import { ProfileBuilder } from './builder/profile.builder';
import { getCustomRepository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { ProfileDto } from './dto/profile.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {
  constructor() {}

  public async get(userId: string): Promise<Profile> {
    const profileRepository: ProfileRepository = getCustomRepository(
      ProfileRepository,
    );

    return await profileRepository.findByUserId(userId, [
      'userId',
      'firstName',
      'lastName',
      'phone',
      'country',
      'address',
      'additionalAddress',
      'zip',
      'city',
    ]);
  }

  public async create(
    user: User,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    country: string,
  ): Promise<Profile> {
    const profileRepository: ProfileRepository = getCustomRepository(
      ProfileRepository,
    );
    const profile: Profile = new ProfileBuilder()
      .setUser(user)
      .setFirstName(firstName)
      .setLastName(lastName)
      .setPhone(phoneNumber)
      .setCountry(country)
      .build();

    return await profileRepository.save(profile);
  }
  public async update(profile: ProfileDto): Promise<void> {
    const profileRepository: ProfileRepository = getCustomRepository(
      ProfileRepository,
    );
    await profileRepository.update(profile.userId, profile);
  }
}
