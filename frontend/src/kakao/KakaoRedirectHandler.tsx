import React from 'react';
import axios from 'axios';

const KakaoRedirectHandler = () => {
  console.log('KakaoRedirectHandler');
  const code = new URL(window.location.href).searchParams.get('code');
  let token: string = '';
  let user: any = null;
  let register: boolean = false;
  axios
    .post('http://localhost:8080/api/v1/user/signin/callback', { code })
    .then((res) => {
      token = res.data.response.jwt;
      user = res.data.response.user;
      register = res.data.response.register;
      console.log(token, user, register);
      window.sessionStorage.setItem('X-AUTH-TOKEN', token);
    })
    .catch(() => {
      alert('social Callback failed');
    });

  return <div>카카오 로그인 핸들러</div>;
};

export default KakaoRedirectHandler;
