import { atom, selector, selectorFamily } from 'recoil';
import { MypageService } from '../services/mypageService';

export const mypageSelector = selectorFamily({
  key: 'mypageSelector',
  get: (paginationId: number) => async () => {
    if (!paginationId) {
      return;
    }
    const response = await MypageService.delivery(paginationId);
    return response;
  },
});
