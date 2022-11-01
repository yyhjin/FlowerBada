import { atom, selector } from 'recoil';
import { UserService } from '../services/userService';

export const userSelector = selector({
  key: 'userSelector',
  get: async () => {
    const response = await UserService.signIn();
    return response;
  },
});
