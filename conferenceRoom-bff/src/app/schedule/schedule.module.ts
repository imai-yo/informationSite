import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ApiCoreService } from '../../../api/api-core.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ScheduleController],
  providers: [ApiCoreService, ScheduleService],
})
export class ScheduleModule {}
