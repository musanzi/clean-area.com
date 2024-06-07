import { ComponentStore } from '@ngrx/component-store';
import { Observable, exhaustMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdatePasswordStoreInterface } from '../types/update-password-store.interface';
import { MessageInterface } from '../../../../../shared/auth/types/message.interface';
import { PasswordPayloadInterface } from '../types/password-payload.interface';
import { ApiValiationsErrorsInterface } from '../../../../../shared/auth/types/api-valiations-errors.interface';
import { UpdatePasswordService } from './update-password.service';

@Injectable()
export class UpdatePasswordStore extends ComponentStore<UpdatePasswordStoreInterface> {
  vm$: Observable<UpdatePasswordStoreInterface>;

  constructor(private updateInfoService: UpdatePasswordService, private store: Store) {
    super({ isLoading: false, message: { type: null, message: null }, errors: [] });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isUpdatingImage: boolean) => ({ ...state, isUpdatingImage }));
  setMessage = this.updater((state, message: MessageInterface) => ({ ...state, message }));
  setErrors = this.updater((state, errors: ApiValiationsErrorsInterface[]) => ({ ...state, errors }));
  resetUpdateImageMessage() {
    this.setMessage({ type: null, message: null });
  }

  updatePassword = this.effect((payload$: Observable<PasswordPayloadInterface>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((payload) =>
        this.updateInfoService.updatePassword(payload).pipe(
          tapResponse({
            next: () => this.setMessage({ type: 'success', message: 'Mot de passe mis à jour' }),
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.setMessage({ type: 'error', message });
              return this.setErrors(message);
            },
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
