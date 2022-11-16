import api from './api';
import { IPaymentRecoil } from '@recoil/paymentRecoil';

const END_POINT = 'payment';

interface ISuccessPayment {
  pgToken: string | null;
  orderId: string | null;
}

const paymentAPI = {
  requestPayment(jwt: string, refresh: string, data: IPaymentRecoil) {
    return api({
      method: 'post',
      url: `${END_POINT}/request`,
      data: data,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
  // requestPayment(rollingId: number) {
  //   return api({
  //     method: 'post',
  //     url: `${END_POINT}/{rollingId}`,
  //     data: null,
  //     headers: {
  //      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //      'Access-Control-Allow-Origin': '*',
  //     }
  //   });
  // }
  successPayment(jwt: string, refresh: string, data: ISuccessPayment) {
    return api({
      method: 'post',
      url: `${END_POINT}/success`,
      data: data,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
};

export default paymentAPI;
