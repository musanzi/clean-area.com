import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  get<T>(uri: string): Observable<T> {
    return this.http.get<{ data: T }>(uri).pipe(map((response) => response.data));
  }

  post<T, U>(uri: string, payload: U): Observable<T> {
    return this.http.post<{ data: T }>(uri, payload).pipe(map((response) => response.data));
  }

  patch<T, U>(uri: string, payload: U): Observable<T> {
    return this.http.patch<{ data: T }>(uri, payload).pipe(map((response) => response.data));
  }
}
