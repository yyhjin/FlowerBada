import axios from 'axios';
import { css } from '@emotion/react';
import kakaoLogo from '../img/kakaoTalk.png';

export default function SignIn() {
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
    <div css={DefaultColor}>
      <div css={Kkotbada}>
        <h1>꽃바다</h1>
      </div>
      <div css={LoginParagraph}>
        <p>
          간편하게 로그인하고
          <br />
          다양한 서비스를 이용해보세요
        </p>
      </div>
      <button css={LoginButton} type="button" onClick={handleLogin}>
        <img width="15px" height="15px" src={kakaoLogo}></img>
        <span css={LoginText}>카카오 로그인</span>
      </button>
    </div>
  );
}

const DefaultColor = css`
  background-color: #f2f0ef;
`;

const Kkotbada = css`
  margin-top: 120px;
`;

const LoginParagraph = css`
  margin: 15px;
`;

const LoginButton = css`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  background-color: #16453e;
`;

const LoginText = css`
  color: white;
  margin-left: 30px;
  margin-right: 30px;
`;
