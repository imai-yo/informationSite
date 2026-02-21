import { Component, AfterViewInit, afterNextRender } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Modal } from '../modal/modal';
import { ListStore } from './list.store';

@Component({
  selector: 'app-list',
  imports: [MatDatepickerModule, Modal, AsyncPipe],
  providers: [ListStore],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements AfterViewInit {
  modalFlg = false;
  selectedDate: Date | null = null;

  constructor(public store: ListStore) {
    afterNextRender(() => {});
  }

  ngAfterViewInit() {}

  /** カレンダーの日付選択 */
  onSelect(date: Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    this.store.setToday(`${yyyy}-${mm}-${dd}`);
  }

  /** モーダルを開く */
  openModal(rs: any) {
    rs.end_time = rs.end_time !== '' ? rs.end_time : add30Minuites(rs.start_time);
    this.store.setModalData(rs);
    this.store.setModalFlg();
  }

  /** モーダルを閉じる */
  closeModal() {
    this.store.setModalData(null);
    this.store.setModalFlg();
  }

  /** 予約実行 */
  reserve(event: any) {
    const prm = {
      roomId: event.roomId,
      meetingName: event.meetingName,
      date: event.date,
      reserver: event.reserver,
      start_time: event.start_time,
      end_time: event.end_time,
    };

    this.store.postReserve(prm);
  }

  deleteReserve(reserveId: string) {
    this.store.deleteReserve(reserveId);
    this.closeModal();
  }
}

/** ３０分加えた時刻を返却する */
function add30Minuites(time: string): string {
  const [hour, minuites] = time.split(':');

  let result = '';
  if (minuites == '00') {
    result = hour + ':' + '30';
  }

  if (minuites == '30') {
    let add1Hour: number | string = Number(hour) + 1;
    add1Hour = add1Hour < 10 ? '0' + add1Hour : add1Hour;
    result = add1Hour + ':' + '00';
  }
  return result;
}
