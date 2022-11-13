import { atom } from 'recoil';

export interface IPaymentRecoil {
  optionType: string;
  url: string;
  paginationId: number;
  title: string;
  price: number;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  senderName: string;
  senderPhone: string;
  isAnonymous: boolean;
}

export const paymentRecoil = atom<IPaymentRecoil>({
  key: 'paymentRecoil',
  default: {
    optionType: 'default',
    url: '',
    paginationId: 0,
    title: 'string',
    price: 0,
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    senderName: '',
    senderPhone: '',
    isAnonymous: false,
  },
});
