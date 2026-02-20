import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { first, Observable, switchMap, tap } from 'rxjs';
import { HttpService } from '../../../service/http.service';

export interface ListState {
  view: any;
  today: string;
  reserve: any;
  modalFlg: boolean;
  modalData: any;
}

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
  ) {
    super({ view: null, today: '', reserve: null, modalFlg: false, modalData: null });

    this.effect(() =>
      route.data.pipe(
        first(),
        tap(data => {
          console.log(data['data']);
          this.setView(data['data']);
        }),
      ),
    )();
  }

  readonly view$: Observable<any> = this.select(({ view }) => view);
  readonly today$: Observable<any> = this.select(({ today }) => today);
  readonly reserve$: Observable<any> = this.select(({ reserve }) => reserve);
  readonly modalFlg$: Observable<any> = this.select(({ modalFlg }) => modalFlg);
  readonly modalData$: Observable<any> = this.select(({ modalData }) => modalData);

  readonly vm$: Observable<any> = this.select(
    this.view$,
    this.today$,
    this.reserve$,
    this.modalFlg$,
    this.modalData$,
    (view, today, reserve, modalFlg, modalData) => ({
      view,
      today,
      reserve,
      modalFlg,
      modalData,
    }),
  );

  readonly setView = this.updater((state, data: any) => ({
    ...state,
    view: data.view,
    today: data.date,
    reserve: data.reserve,
  }));

  readonly setModalFlg = this.updater(state => ({
    ...state,
    modalFlg: !state.modalFlg,
  }));

  readonly setModalData = this.updater((state, modalData: any) => ({
    ...state,
    modalData,
  }));

  readonly setToday = this.updater((state, today: string) => ({
    ...state,
    today,
  }));

  readonly setReserve = this.updater((state, reserve: any) => ({
    ...state,
    reserve: reserve,
  }));

  /** 予約情報の取得 */
  readonly postReserve = this.effect<any>(arg$ =>
    arg$.pipe(
      switchMap(arg => {
        return this.http.postSchedule(arg).pipe(switchMap(() => this.http.getReserve(arg.date)));
      }),
      tap(x => {
        return this.setReserve(x);
      }),
    ),
  );
}
