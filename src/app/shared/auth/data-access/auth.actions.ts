import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../types/models-interfaces';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    authentication: emptyProps(),
    authenticateUser: props<{ user: User | null }>(),
    logout: emptyProps()
  }
});
