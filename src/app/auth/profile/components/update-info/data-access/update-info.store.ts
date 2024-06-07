import { ComponentStore } from '@ngrx/component-store';
import { Observable, exhaustMap, tap } from 'rxjs';
import { User } from '../../../../../shared/types/models-interfaces';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../../shared/auth/data-access/auth.reducers';
import { tapResponse } from '@ngrx/operators';
import { authActions } from '../../../../../shared/auth/data-access/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateInfoService } from './update-info.service';
import { InfoPayloadInterface } from '../types/update-info-payload.interface';
import { MessageInterface } from '../../../../../shared/auth/types/message.interface';
import { ApiValiationsErrorsInterface } from '../../../../../shared/auth/types/api-valiations-errors.interface';
import { UpdateInfoStoreInterface } from '../types/update-info-store.interface';

@Injectable()
export class UpdateInfoStore extends ComponentStore<UpdateInfoStoreInterface> {
  vm$: Observable<{ udpateInfoState: UpdateInfoStoreInterface; user: User | null }>;

  constructor(private updateInfoService: UpdateInfoService, private store: Store) {
    super({ isLoading: false, message: { type: null, message: null }, errors: [] });
    this.vm$ = this.select({
      udpateInfoState: this.select((state) => state),
      user: this.store.select(selectUser)
    });
  }
  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setMessage = this.updater((state, message: MessageInterface) => ({ ...state, message }));
  setErrors = this.updater((state, errors: ApiValiationsErrorsInterface[]) => ({ ...state, errors }));
  resetInfoUpdateMessage() {
    this.setMessage({ type: null, message: null });
  }

  upatedProfile = this.effect((payload$: Observable<InfoPayloadInterface>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((payload) =>
        this.updateInfoService.updateProfile(payload).pipe(
          tapResponse({
            next: (user) => {
              this.setMessage({ type: 'success', message: 'Informations mises à jour' });
              this.store.dispatch(authActions.authenticateUser({ user }));
            },
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.setMessage({ type: 'error', message });
              return this.setErrors(error.error.message);
            },
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
