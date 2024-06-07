import { ApiValiationsErrorsInterface } from '../../../shared/auth/types/api-valiations-errors.interface';

export interface ResetPasswordRequestStoreInterface {
  isLoading: boolean;
  error: string | null;
  validationErrors: ApiValiationsErrorsInterface[];
}
