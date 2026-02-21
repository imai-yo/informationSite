import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { first, Observable, skip, switchMap, tap, withLatestFrom } from 'rxjs';
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

  /** 画面データ */
  readonly view$: Observable<any> = this.select(({ view }) => view);
  /** 選択日付データ(初回は当日が登録) */
  readonly today$: Observable<string> = this.select(({ today }) => today);
  /** 予約情報データ */
  readonly reserve$: Observable<any> = this.select(({ reserve }) => reserve);
  /** モーダル表示フラグ */
  readonly modalFlg$: Observable<any> = this.select(({ modalFlg }) => modalFlg);
  /** モーダルデータ */
  readonly modalData$: Observable<any> = this.select(({ modalData }) => modalData);

  /** ビューモデル */
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

  /** 予約登録の送信 */
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

  readonly deleteReserve = this.effect<any>(arg$ =>
    arg$.pipe(
      withLatestFrom(this.today$),
      switchMap(([reserveId, today]) => {
        return this.http
          .deleteReserve(reserveId)
          .pipe(switchMap(() => this.http.getReserve(today)));
      }),
      tap(x => {
        return this.setReserve(x);
      }),
    ),
  );

  readonly scheduleChange = this.effect<void>(() =>
    this.today$.pipe(
      skip(1),
      switchMap(date => this.http.getReserve(date)),
      tap(x => this.setReserve(x)),
    ),
  );
}
