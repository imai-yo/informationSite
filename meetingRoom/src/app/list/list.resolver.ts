import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpService } from '../../../service/http.service';

export const listResolver: ResolveFn<any> = () => {
  /** 今日の日付を取得 */
  const getToday = (): string => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  return inject(HttpService).getFirstView(getToday());
};
