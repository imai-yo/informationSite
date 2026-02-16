import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class ApiCoreService {
  private apiDomain = 'http://127.0.0.1:8000/';

  constructor(private readonly httpService: HttpService) {}

  getJsonData<T>(path: string, query?: string[]): Observable<T> {
    const url = this.apiDomain + path;

    return this.httpService
      .get(url)
      .pipe(map((res: AxiosResponse) => res.data));
  }
}
