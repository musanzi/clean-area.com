import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { ResetPasswordRequestPayloadInterface } from '../types/reset-password-request-payload.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordRequestService {
  constructor(private httpClient: HttpClientService) {}

  resetPasswordRequest(payload: ResetPasswordRequestPayloadInterface): Observable<null> {
    return this.httpClient.post<null, ResetPasswordRequestPayloadInterface>('auth/reset-password-request', payload);
  }
}
