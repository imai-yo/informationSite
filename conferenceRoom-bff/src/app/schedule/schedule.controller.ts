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

    const reserve$ = of({
      '1_08:00': {
        reservationId: '1',
        roomName: 'Grande',
        conferenceName: 'てすと',
        date: '2026/02/14',
        reserver: '今井',
        startTime: '08:00',
        endTime: '09:30',
      },
      '1_08:30': {
        reservationId: '1',
        roomName: 'Grande',
        conferenceName: 'てすと',
        date: '2026/02/14',
        reserver: '今井',
        startTime: '08:00',
        endTime: '09:30',
      },
      '1_09:00': {
        reservationId: '1',
        roomName: 'Grande',
        conferenceName: 'てすと',
        date: '2026/02/14',
        reserver: '今井',
        startTime: '08:00',
        endTime: '09:30',
      },
      '1_09:30': {
        reservationId: '1',
        roomName: 'Grande',
        conferenceName: 'てすと',
        date: '2026/02/14',
        reserver: '今井',
        startTime: '08:00',
        endTime: '09:30',
      },
    });

    return forkJoin({
      view: initData$,
      reserve: reserve$,
    });

    // return result;
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
