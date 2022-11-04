import api from './api';

const END_POINT = 'mypage';

interface IDeliveryParams {
  sort: number;
  paginationId: number;
}

interface IPointParams {
  paginationId: number;
}

const mypageAPI = {
  getDelivery(jwt: string, params: IDeliveryParams) {
    return api({
      method: 'get',
      url: `${END_POINT}/delivery`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
      params: params,
    });
  },
  getPointList(jwt: string, params: IPointParams) {
    return api({
      method: 'get',
      url: `${END_POINT}/mypoint`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
      params: params,
    });
  },
};

export default mypageAPI;
