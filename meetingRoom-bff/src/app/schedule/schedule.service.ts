import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleService {
  editFirstView(initData: any, reserve: any): any {
    return {
      view: initData,
      reserve: getReserve(reserve),
    };
  }
}

function getReserve(reserve: any): any {
  return Object.fromEntries(
    reserve.flatMap(x => {
      return x.time.map(y => {
        return [
          x.reservationId + '_' + y,
          {
            reservationId: x.reservationId,
            roomId: x.roomId,
            conferenceName: x.conferenceName,
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
