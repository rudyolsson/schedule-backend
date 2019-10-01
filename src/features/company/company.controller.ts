import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../auth/decorator/roles.decorator';
import { UpdateResult } from 'typeorm';
import { Company } from './entity/company.entity';
import { CompanyDto } from './dto/company.dto';
import { CompanyService } from './company.service';

@Controller('/brand')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
//   @Roles('admin')
  @Transactional({ propagation: Propagation.REQUIRES_NEW })
  async findOne(@Request() req): Promise<Company> {
    return await this.companyService.findById(req.user.companyId, [
      'name',
    ]);
  }

  @Post()
//   @Roles('admin')
  @Transactional({ propagation: Propagation.REQUIRES_NEW })
  async update(
    @Request() req,
    @Body() companyDto: CompanyDto,
  ): Promise<UpdateResult> {
    return await this.companyService.update(req.user.companyId, companyDto);
  }
}
