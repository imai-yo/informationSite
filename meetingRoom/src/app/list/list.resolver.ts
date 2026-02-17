import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpService } from '../../../service/http.service';

export const listResolver: ResolveFn<any> = () => {
  return inject(HttpService).getSchedule();
};
