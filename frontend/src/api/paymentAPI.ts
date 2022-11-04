import api from './api';

const END_POINT = 'payment';

interface ISuccessPayment {
  pgToken: string | null;
  orderId: string | null;
}

const paymentAPI = {
  requestPayment() {
    return api({
      method: 'post',
      url: `${END_POINT}/payment/1`,
      data: null,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
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
  successPayment(data: ISuccessPayment) {
    return api({
      method: 'post',
      url: `${END_POINT}/success`,
      data: data,
    });
  },
};

export default paymentAPI;
