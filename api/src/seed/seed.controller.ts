import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}


  @Get()
  runSeed() {
    return this.seedService.populateDB();
  }

}
