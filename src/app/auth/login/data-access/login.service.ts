import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { LoginPayloadInterface } from '../types/login-payload.interface';
import { Observable } from 'rxjs';
import { User } from '../../../shared/types/models-interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClientService) {}

  login(payload: LoginPayloadInterface): Observable<User> {
    return this.httpClient.post<User, LoginPayloadInterface>('auth/login', payload);
  }
}
