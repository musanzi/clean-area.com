import { MessageInterface } from '../../../../../shared/auth/types/message.interface';

export interface UserInfoStoreInterface {
  isLoading: boolean;
  message: MessageInterface;
}
