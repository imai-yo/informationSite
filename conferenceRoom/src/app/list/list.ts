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
  constructor(public store: ListStore) {
    afterNextRender(() => {});
  }

  ngAfterViewInit() {}

  modalDisp(rs: any = null) {
    this.store.setModalData(rs);
    this.store.setModalFlg();
  }
}
