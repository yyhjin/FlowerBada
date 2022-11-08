import api from './api';

const END_POINT = 'store';

interface IPutFlowerData {
  flowerId: number;
}

interface IPutRollingData {
  rollingId: number;
}

const storeAPI = {
  getFlowers(jwt: string) {
    return api({
      method: 'get',
      url: `${END_POINT}/flower`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
    });
  },
  putFlower(jwt: string, data: IPutFlowerData) {
    return api({
      method: 'put',
      url: `${END_POINT}/buy/flower`,
      data: data,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
    });
  },
  getRollings(jwt: string) {
    return api({
      method: 'get',
      url: `${END_POINT}/rolling`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
    });
  },
  putRolling(jwt: string, data: IPutRollingData) {
    return api({
      method: 'put',
      url: `${END_POINT}/buy/rolling`,
      data: data,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
    });
  },
};

export default storeAPI;
