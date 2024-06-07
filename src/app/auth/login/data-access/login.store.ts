import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { LoginStoreInterface } from '../types/login-store.interface';
import { exhaustMap, Observable, tap } from 'rxjs';
import { LoginPayloadInterface } from '../types/login-payload.interface';
import { Router } from '@angular/router';
import { authActions } from '../../../shared/auth/data-access/auth.actions';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppStoreInterface } from '../../../shared/types/app-store.interface';

@Injectable()
export class LoginStore extends ComponentStore<LoginStoreInterface> {
  vm$: Observable<LoginStoreInterface> = this.select((state) => state);

  constructor(private loginService: LoginService, private router: Router, private store: Store<AppStoreInterface>) {
    super({ isLoading: false, error: null });
  }

  setLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string) => ({ ...state, error }));
  resetError = this.updater((state) => ({ ...state, error: null }));

  readonly login = this.effect((payload$: Observable<LoginPayloadInterface>) => {
    return payload$.pipe(
      tap(() => this.setLoading(true)),
      exhaustMap((payload: LoginPayloadInterface) =>
        this.loginService.login(payload).pipe(
          tapResponse({
            next: (user) => {
              this.router.navigateByUrl('/profile');
              this.store.dispatch(authActions.authenticateUser({ user }));
            },
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setLoading(false)
          })
        )
      )
    );
  });
}
