import { Observable } from 'rxjs';
import { HttpClientService } from '../../../../../shared/services/http-client.service';
import { Injectable } from '@angular/core';
import { PasswordPayloadInterface } from '../types/password-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  constructor(private http: HttpClientService) {}

  updatePassword(payload: PasswordPayloadInterface): Observable<null> {
    return this.http.patch<null, PasswordPayloadInterface>('auth/update-password', payload);
  }
}
