import api from './api';

const END_POINT = 'user';

const userAPI = {
  signIn() {
    return api({
      method: 'get',
      url: `${END_POINT}/signin`,
    });
  },
  signOut(jwt: string) {
    return api({
      method: 'post',
      url: `${END_POINT}/signout`,
      data: {},
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
    });
  },
  getPoint(jwt: string) {
    return api({
      method: 'get',
      url: `${END_POINT}/points`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
      },
    });
  },
};

export default userAPI;
