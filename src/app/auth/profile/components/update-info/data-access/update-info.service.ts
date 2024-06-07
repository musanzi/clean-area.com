import { Observable } from 'rxjs';
import { HttpClientService } from '../../../../../shared/services/http-client.service';
import { User } from '../../../../../shared/types/models-interfaces';
import { Injectable } from '@angular/core';
import { InfoPayloadInterface } from '../types/update-info-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class UpdateInfoService {
  constructor(private http: HttpClientService) {}

  updateProfile(payload: InfoPayloadInterface): Observable<User> {
    return this.http.patch<User, InfoPayloadInterface>('auth/profile', payload);
  }
}
