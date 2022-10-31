import axios from 'axios';
import Logout from '@pages/SignOut';
import { userReCoil } from '@recoil/userRecoil';
import { useRecoilState } from 'recoil';
import { css } from '@emotion/react';
import kakaoLogo from '../img/kakaoTalk.png';

export default function Login() {
  const [loginUser] = useRecoilState(userReCoil);
  // console.log('Login()', loginUser);
  const handleLogin = async () => {
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/user/signin',
      );
      let url: string = res.data.response.redirectURL;
      window.location.href = url;
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div
      css={css({
        backgroundColor: '#F2F0EF',
      })}
    >
      <div
        css={css({
          // marginTop: '70px',
          marginBottom: '120px',
        })}
      >
        <h1>꽃바다</h1>
      </div>
      <div
        css={css({
          margin: '15px',
        })}
      >
        <p>
          간편하게 로그인하고
          <br />
          다양한 서비스를 이용해보세요
        </p>
      </div>
      <button
        css={css({
          backgroundColor: '#16453E',
        })}
        type="button"
        onClick={handleLogin}
      >
        <img width="15px" height="15px" src={kakaoLogo}></img>
        <span
          css={css({
            color: 'white',
            marginLeft: '30px',
            marginRight: '30px',
          })}
        >
          카카오 로그인
        </span>
      </button>
    </div>
  );
}
