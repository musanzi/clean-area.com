import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStoreInterface } from '../types/auth-store.interface';
import { authActions } from './auth.actions';

const initialState: AuthStoreInterface = {
  user: null
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.authentication, (state) => ({ ...state })),
    on(authActions.authenticateUser, (state, actions) => ({ user: actions.user })),
    on(authActions.logout, (state) => ({ ...state, user: null }))
  )
});

export const { reducer: authReducers, selectUser, selectAuthState } = authFeature;
