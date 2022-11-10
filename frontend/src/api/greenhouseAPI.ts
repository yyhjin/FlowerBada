import api from './api';

const END_POINT = 'greenhouse';

interface ISentRolling {
  sort: number;
  paginationId: number;
}

interface IBookmark {
  sort: number;
  paginationId: number;
}

const greenhouseAPI = {
  sentRolling(jwt: string, refresh: string, params: ISentRolling) {
    return api({
      method: 'get',
      url: `${END_POINT}/sent`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
      params: params,
    });
  },

  bookmark(jwt: string, refresh: string, params: IBookmark) {
    return api({
      method: 'get',
      url: `${END_POINT}/bookmark`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
      params: params,
    });
  },
};

export default greenhouseAPI;
