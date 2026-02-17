import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { first, Observable, tap } from 'rxjs';

export interface ListState {
  view: any;
  reserve: any;
  modalFlg: boolean;
  modalData: any;
}

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  constructor(private route: ActivatedRoute) {
    super({ view: null, reserve: null, modalFlg: false, modalData: null });

    this.effect(() =>
      route.data.pipe(
        first(),
        tap(data => {
          // console.log(data['data']);
          this.setView(data['data']);
        }),
      ),
    )();
  }

  readonly view$: Observable<any> = this.select(({ view }) => view);
  readonly reserve$: Observable<any> = this.select(({ reserve }) => reserve);
  readonly modalFlg$: Observable<any> = this.select(({ modalFlg }) => modalFlg);
  readonly modalData$: Observable<any> = this.select(({ modalData }) => modalData);

  readonly vm$: Observable<any> = this.select(
    this.view$,
    this.reserve$,
    this.modalFlg$,
    this.modalData$,
    (view, reserve, modalFlg, modalData) => ({
      view,
      reserve,
      modalFlg,
      modalData,
    }),
  );

  readonly setView = this.updater((state, data: any) => ({
    ...state,
    view: data.view,
    reserve: data.reserve,
  }));

  readonly setModalFlg = this.updater(state => ({
    ...state,
    modalFlg: !state.modalFlg,
  }));

  readonly setModalData = this.updater((state, modalData: any) => ({
    ...state,
    modalData: modalData,
  }));
}
