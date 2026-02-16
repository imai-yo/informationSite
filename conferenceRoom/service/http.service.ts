import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private apiUrl = 'http://localhost:3000/bff/schedule/firstView';

  constructor(private http: HttpClient) {}

  getSchedule() {
    return this.http.get(this.apiUrl);
  }
}
