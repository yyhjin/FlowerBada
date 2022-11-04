import { css } from '@emotion/react';
import kakaoLogo from '@assets/kakaoTalk.png';
import userAPI from '@src/api/userAPI';

export default function SignIn() {
  const handleLogin = async () => {
    try {
      const res: any = await userAPI.signIn();
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
        <img width="20px" height="17px" src={kakaoLogo}></img>
        <span css={LoginText}>카카오 로그인</span>
      </button>
    </div>
  );
}

const DefaultColor = css`
  background-color: #f2f0ef;
  width: 100vw;
`;

const Kkotbada = css`
  margin-top: 200px;
  h1 {
    font-family: 'GowunDodum-Regular';
    font-size: 3rem;
  }
`;

const LoginParagraph = css`
  margin: 120px 0 30px 0;
  color: black;
  font-size: 1rem;
  font-family: SeoulNamsanM;
  font-weight: bolder;
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
