import api from './api';

const END_POINT = 'rolling';

interface IMakeRollingData {
  itemId: number;
  openDate: string;
  title: string;
}

const rollingAPI = {
  makeRolling(jwt: string, data: IMakeRollingData) {
    return api({
      method: 'post',
      url: `${END_POINT}`,
      data: data,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
    });
  },
};

export default rollingAPI;
