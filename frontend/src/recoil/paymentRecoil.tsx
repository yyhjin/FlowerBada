import { atom } from 'recoil';

export interface IPaymentRecoil {
  optionType: string;
  url: string;
  paginationId: number;
  title: string;
  price: number;
  receiver: string;
  receiverPhone: string;
  receiverAddress: string;
  senderName: string;
  senderPhone: string;
}

export const paymentRecoil = atom<IPaymentRecoil>({
  key: 'paymentRecoil',
  default: {
    optionType: 'default',
    url: '',
    paginationId: 0,
    title: 'string',
    price: 0,
    receiver: '',
    receiverPhone: '',
    receiverAddress: '',
    senderName: '',
    senderPhone: '',
  },
});
