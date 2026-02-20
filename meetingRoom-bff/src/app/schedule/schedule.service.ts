import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleService {
  /** 初期表示 */
  editFirstView(date: string, initData: any, reserve: any): any {
    return {
      date: date,
      view: initData,
      reserve: getReserve(reserve),
    };
  }

  /** 予約情報 */
  editReserve(reserve: any) {
    return getReserve(reserve);
  }
}

/** 予約情報の編集仕様 */
function getReserve(reserve: any): any {
  return Object.fromEntries(
    reserve.flatMap(x => {
      return x.time.map(y => {
        return [
          x.roomId + '_' + y,
          {
            reservationId: x.reservationId,
            roomId: x.roomId,
            roomName: x.roomName,
            meetingName: x.meetingName,
            date: x.date,
            reserver: x.reserver,
            start_time: x.start_time,
            end_time: x.end_time,
          },
        ];
      });
    }),
  );
}
