import api from './api';

const END_POINT = 'store';

interface IPutFlowerData {
  flowerId: number;
}

interface IPutRollingData {
  rollingId: number;
}

const storeAPI = {
  getFlowers(jwt: string, refresh: string) {
    return api({
      method: 'get',
      url: `${END_POINT}/flower`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
  putFlower(jwt: string, refresh: string, data: IPutFlowerData) {
    return api({
      method: 'put',
      url: `${END_POINT}/buy/flower`,
      data: data,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
  getRollings(jwt: string, refresh: string) {
    return api({
      method: 'get',
      url: `${END_POINT}/rolling`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
  putRolling(jwt: string, refresh: string, data: IPutRollingData) {
    return api({
      method: 'put',
      url: `${END_POINT}/buy/rolling`,
      data: data,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
};

export default storeAPI;
