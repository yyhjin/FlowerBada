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

// export const paymentRecoil = atom<IPaymentRecoil>({
//   key: 'paymentRecoil',
//   default: {
//     itemId: 0,
//     itemIndex: 0,
//     url: '',
//     title: '',
//   },
// });
