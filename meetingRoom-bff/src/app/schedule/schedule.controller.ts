import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiCoreService } from '../../../api/api-core.service';
import { forkJoin, map, of } from 'rxjs';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly api: ApiCoreService,
    private readonly scheduleService: ScheduleService,
  ) {}

  /** 初期データ取得 */
  @Get('firstView')
  getFirstView(@Query() prm: any) {
    const initData$ = this.api.getJsonData<any>('init-data');

    const reserve$ = this.api.getJsonData<any>('reservations/get', {
      date: prm.date,
    });

    return forkJoin([initData$, reserve$]).pipe(
      map(([initData, reserve]) => this.scheduleService.editFirstView(prm.date, initData, reserve)),
    );
  }

  /** 予約の取得 */
  @Get('get')
  getReserve(@Query() prm: any) {
    const reserve$ = this.api.getJsonData<any>('reservations/get', {
      date: prm.date,
    });

    return forkJoin([reserve$]).pipe(map(([reserve]) => this.scheduleService.editReserve(reserve)));
  }

  /** 予約の追加 */
  @Post('add')
  postReserve(@Body() body: any) {
    return this.api.postJsonData('reservations/add', body);
  }

  /** 予約の削除 */
  @Delete('delete/:id')
  deleteReserve(@Param('id') id: string) {
    return this.api.deleteJsonData(`reservations/delete/${id}`);
  }
}
