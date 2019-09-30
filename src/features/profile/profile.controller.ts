import { Body, Controller, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('user')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
}
