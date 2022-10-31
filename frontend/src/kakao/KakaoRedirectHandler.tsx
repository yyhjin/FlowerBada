import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '../recoil/userRecoil';

const KakaoRedirectHandler = () => {
  // console.log('KakaoRedirectHandler');
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const code = new URL(window.location.href).searchParams.get('code');
  let token: string = '';
  let user: any = null;
  let register: boolean = false;

  useEffect(() => {
    axios
      .post('http://localhost:8080/api/v1/user/signin/callback', { code })
      .then((res) => {
        token = res.data.response.jwt;
        user = res.data.response.user;
        register = res.data.response.register;
        // console.log(token, user, register);

        setUserState((prev: IuserRecoil) => {
          const variable = { ...prev };
          variable.id = user.id;
          variable.userToken = user.token;
          variable.nickname = user.nickname;
          variable.points = user.points;
          variable.jwt = token;
          return variable;
        });
        // alert('login success!!!');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div></div>;
};

export default KakaoRedirectHandler;
