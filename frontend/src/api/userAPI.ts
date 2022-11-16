import api from './api';

const END_POINT = 'user';

interface ISignInCallback {
  code: string | null;
}

const userAPI = {
  signIn() {
    return api({
      method: 'get',
      url: `${END_POINT}/signin`,
    });
  },
  signInCallback(data: ISignInCallback) {
    return api({
      method: 'post',
      url: `${END_POINT}/signin/callback`,
      data: data,
    });
  },
  signOut(jwt: string, refresh: string) {
    return api({
      method: 'post',
      url: `${END_POINT}/signout`,
      data: {},
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
  getPoint(jwt: string, refresh: string) {
    return api({
      method: 'get',
      url: `${END_POINT}/points`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
};

export default userAPI;
