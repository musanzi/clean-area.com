import { Injectable } from '@angular/core';
import { ResetPasswordPayloadInterface } from '../types/reset-password-payload.interface';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../shared/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private httpClient: HttpClientService) {}

  resetPassword(payload: ResetPasswordPayloadInterface): Observable<null> {
    return this.httpClient.post<null, ResetPasswordPayloadInterface>('auth/reset-password', payload);
  }
}
