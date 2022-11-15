import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IstatusRecoil {
  message: string;
  code: number;
}

export const statusRecoil = atom<IstatusRecoil>({
  key: 'statusRecoil',
  default: {
    message: '',
    code: 404,
  },
  effects_UNSTABLE: [persistAtom],
});
