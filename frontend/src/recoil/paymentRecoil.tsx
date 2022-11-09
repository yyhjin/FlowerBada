import { atom } from 'recoil';

export interface IPaymentRecoil {
  tap: string;
  url: string;
  paginationId: number;
  title: string;
  price: number;
  receiver: string;
  receiverPhone: string;
  reveicerAddress: string;
  senderName: string;
  senderPhone: string;
}

export const paymentRecoil = atom<IPaymentRecoil>({
  key: 'paymentRecoil',
  default: {
    tap: 'option',
    url: '',
    paginationId: 0,
    title: 'string',
    price: 0,
    receiver: '',
    receiverPhone: '',
    reveicerAddress: '',
    senderName: '',
    senderPhone: '',
  },
});
