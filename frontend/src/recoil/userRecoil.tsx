import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IuserRecoil {
  jwt: string;
  refresh: string;
  id: number;
  userToken: string;
  nickname: string;
  points: number;
}

export const userReCoil = atom<IuserRecoil>({
  key: 'userRecoil',
  default: {
    jwt: '',
    refresh: '',
    id: 0,
    userToken: '',
    nickname: '',
    points: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
