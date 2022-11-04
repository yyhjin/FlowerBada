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
  sentRolling(jwt: string, params: ISentRolling) {
    return api({
      method: 'get',
      url: `${END_POINT}/sent`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
      params: params,
    });
  },

  bookmark(jwt: string, params: IBookmark) {
    return api({
      method: 'get',
      url: `${END_POINT}/bookmark`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
      params: params,
    });
  },
};

export default greenhouseAPI;
