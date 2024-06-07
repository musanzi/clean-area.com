import { Observable } from 'rxjs';
import { HttpClientService } from '../../../../../shared/services/http-client.service';
import { User } from '../../../../../shared/types/models-interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private http: HttpClientService) {}

  updateImage(userId: number | undefined, file: FormData): Observable<User> {
    return this.http.post<User, FormData>(`users/image/${userId}`, file);
  }
}
