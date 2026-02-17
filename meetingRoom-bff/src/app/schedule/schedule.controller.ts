import { Controller, Get } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiCoreService } from '../../../api/api-core.service';
import { forkJoin, map, of } from 'rxjs';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly api: ApiCoreService,
    private readonly scheduleService: ScheduleService,
  ) {}
  @Get('firstView')
  getFirstView() {
    const initData$ = this.api.getJsonData<any>('init-data');

    const reserve$ = this.api.getJsonData<any>('reservations', {
      date: '2026-02-14',
    });

    return forkJoin([initData$, reserve$]).pipe(
      map(([initData, reserve]) => this.scheduleService.editFirstView(initData, reserve)),
    );
  }

  @Get('reserve')
  getReserve() {
    const data = {};

    const result = {
      data,
    };

    return result;
  }
}
