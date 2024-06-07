import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from './auth.service';
import { authActions } from './auth.actions';
import { Router } from '@angular/router';

export const authenticateEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.authentication),
      exhaustMap(() =>
        authService.authenticatedUser().pipe(
          map((user) => authActions.authenticateUser({ user })),
          catchError(() => of())
        )
      )
    ),
  { functional: true }
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.logout),
      exhaustMap(() =>
        authService.logout().pipe(
          map(() => {
            router.navigate(['/']);
            return authActions.logout();
          })
        )
      ),
      catchError(() => of())
    ),
  { functional: true }
);
