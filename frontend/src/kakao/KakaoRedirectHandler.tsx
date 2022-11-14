import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import userAPI from '@src/api/userAPI';

const KakaoRedirectHandler = () => {
  // console.log('KakaoRedirectHandler');
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const code = new URL(window.location.href).searchParams.get('code');
  let token: string = '';
  let refresh: string = '';
  let user: any = null;
  let register: boolean = false;
  let url = localStorage.getItem('url');
  let paginationId = localStorage.getItem('paginationId');

  useEffect(() => {
    userAPI
      .signInCallback({ code })
      .then((res) => {
        token = res.data.response.jwt;
        refresh = res.data.response.refresh;
        user = res.data.response.user;
        register = res.data.response.register;

        setUserState((prev: IuserRecoil) => {
          const variable = { ...prev };
          variable.id = user.id;
          variable.userToken = user.token;
          variable.nickname = user.nickname;
          variable.points = user.points;
          variable.jwt = token;
          variable.refresh = refresh;
          return variable;
        });
        if (url && url !== '') {
          window.location.href = `/rolling/${url}`;
        } else {
          window.location.href = '/';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div></div>;
};

export default KakaoRedirectHandler;
