import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import axios from 'axios';
import { useRecoilState } from 'recoil';
const DEV = 'http://localhost:8080/api/v1';
const HOST = 'https://k7a405.p.ssafy.io:8080/api/v1/';

const api = axios.create({
  baseURL: HOST,
});

let tokenRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);

function addSubScriber(cb: (token: string) => void) {
  subscribers.push(cb);
}

function onRefreshed(token: string) {
  subscribers.map((cb) => cb(token));
}

function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem('jwt');
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem('refresh');
  return refreshToken;
}

// refresh token 재발급 api 요청
function refreshToken(access: string, refresh: string) {
  return api({
    method: 'get',
    url: 'user/points',
    headers: {
      'X-AUTH-TOKEN': `Bearer ` + access,
      'REFRESH-TOKEN': 'Bearer ' + refresh,
    },
  });
}

// 요청 인터셉터
api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === 404 || error.response.status === 429) {
      window.location.href = `/error/${error.response.status}`;
    }
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      if (!tokenRefreshing) {
        tokenRefreshing = true;
        const refreshToken = loginUser.refresh;
         
      }
    }

    if (error.response.status === 404 || error.response.status === 429) {
      window.location.href = `/error/${error.response.status}`;
    }

    return Promise.reject(error);
  },
);
export default api;
