import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private apiUrl = 'http://localhost:3000/bff/schedule/';

  constructor(private http: HttpClient) {}

  getFirstView(date: string) {
    const screen = 'firstView';

    return this.http.get(this.apiUrl + screen, {
      params: { date },
    });
  }

  getReserve(date: string) {
    const screen = 'get';

    return this.http.get(this.apiUrl + screen, {
      params: { date },
    });
  }

  postSchedule(prm: any) {
    const screen = 'add';
    return this.http.post(this.apiUrl + screen, prm);
  }
}
