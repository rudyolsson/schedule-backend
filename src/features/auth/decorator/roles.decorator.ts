import { SetMetadata } from '@nestjs/common';
import { Role } from '../types/auth.types';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
