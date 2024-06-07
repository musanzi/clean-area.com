import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { RegisterPayloadInterface } from '../types/register-payload.interface';
import { Observable } from 'rxjs';
import { User } from '../../../shared/types/models-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private httpClient: HttpClientService) {}

  register(payload: RegisterPayloadInterface): Observable<User> {
    return this.httpClient.post<User, RegisterPayloadInterface>('auth/register', payload);
  }
}
