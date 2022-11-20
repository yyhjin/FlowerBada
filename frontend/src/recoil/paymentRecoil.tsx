import { atom } from 'recoil';

export interface IPaymentRecoil {
  optionType: string;
  rollingId: number;
  flowerCnt: number;
  paginationId: number;
  title: string;
  userToken: string;
  price: number;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  senderName: string;
  senderPhone: string;
  senderMsg: string;
  isAnonymous: boolean;
  imgUrl: string;
}

export const paymentRecoil = atom<IPaymentRecoil>({
  key: 'paymentRecoil',
  default: {
    optionType: 'default',
    rollingId: 0,
    flowerCnt: 0,
    paginationId: 0,
    title: 'string',
    userToken: '',
    price: 0,
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    senderName: '',
    senderPhone: '',
    senderMsg: '',
    isAnonymous: false,
    imgUrl: '',
  },
});
