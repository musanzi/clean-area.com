import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { ResetPasswordRequestStoreInterface } from '../types/reset-password-request-store.interface';
import { ApiValiationsErrorsInterface } from '../../../shared/auth/types/api-valiations-errors.interface';
import { Router } from '@angular/router';
import { mergeMap, Observable, tap } from 'rxjs';
import { ResetPasswordRequestService } from './reset-password-request.service';
import { ResetPasswordRequestPayloadInterface } from '../types/reset-password-request-payload.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ResetPasswordRequestStore extends ComponentStore<ResetPasswordRequestStoreInterface> {
  vm$: Observable<ResetPasswordRequestStoreInterface>;

  constructor(private resetPasswordRequestService: ResetPasswordRequestService, private router: Router) {
    super({ isLoading: false, error: null, validationErrors: [] });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string) => ({ ...state, error }));
  setValidationErrors = this.updater((state, validationErrors: ApiValiationsErrorsInterface[]) => ({
    ...state,
    validationErrors
  }));
  resetError = this.updater((state) => ({ ...state, error: null }));

  resetPassword = this.effect((payload$: Observable<ResetPasswordRequestPayloadInterface>) => {
    return payload$.pipe(
      tap(() => this.setIsLoading(true)),
      mergeMap((payload) =>
        this.resetPasswordRequestService.resetPasswordRequest(payload).pipe(
          tapResponse({
            next: () => this.router.navigate(['/reset-password']),
            error: (err: HttpErrorResponse) => {
              const message = err.error.message;
              if (typeof message === 'string') return this.setError(message);
              return this.setValidationErrors(message);
            },
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    );
  });
}
