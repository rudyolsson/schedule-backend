import { Body, Controller, Post } from '@nestjs/common';
import { ShiftService } from './shift.service';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}
}
