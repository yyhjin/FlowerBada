import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IcreateRollingRecoil {
  itemId: number;
  itemIndex: number;
  url: string;
  title: string;
}

export const createRollingRecoil = atom<IcreateRollingRecoil>({
  key: 'createRollingRecoil',
  default: {
    itemId: 0,
    itemIndex: 0,
    url: '',
    title: '',
  },
  effects_UNSTABLE: [persistAtom],
});
