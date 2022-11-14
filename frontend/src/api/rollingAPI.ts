import api from './api';

const END_POINT = 'rolling';
const BOOKMARK = 'bookmark';

interface IMakeRollingData {
  itemId: number;
  openDate: string;
  title: string;
}

const rollingAPI = {
  makeRolling(jwt: string, refresh: string, data: IMakeRollingData) {
    return api({
      method: 'post',
      url: `${END_POINT}`,
      data: data,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
  bookmarkRolling(jwt: string, refresh: string, url: string) {
    return api({
      method: 'patch',
      url: `${END_POINT}/${BOOKMARK}/${url}`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
};

export default rollingAPI;
