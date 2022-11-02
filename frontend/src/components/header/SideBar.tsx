import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import axios from 'axios';

const SideBar = (props: any) => {
  const { isOpen } = props;
  const { setIsOpen } = props;
  const test = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);

  const logout = async () => {
    try {
      const res: any = await axios.post(
        'http://localhost:8080/api/v1/user/signout',
        {},
        {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        },
      );
      setLoginUser((prev: IuserRecoil) => {
        const variable = { ...prev };
        variable.id = 0;
        variable.userToken = '';
        variable.nickname = '';
        variable.points = 0;
        variable.jwt = '';
        return variable;
      });
      alert('logout success!');
      window.location.href = '/';
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div id="sideblock">
      <div css={sideBlock(isOpen)}>
        <img src="src\assets\close.png" css={close} onClick={test} />
        <div css={menus}>
          <a css={menuBtn} href="/mypage">
            마이페이지
          </a>
          <a css={menuBtn} href="/">
            홈
          </a>
          <a css={menuBtn} href="/greenhouse">
            그린하우스
          </a>
          <a css={menuBtn} href="/store">
            상점
          </a>
          <a css={menuBtn} href="/newroll">
            새로 만들기
          </a>
          <a css={menuBtn} href="#" onClick={logout}>
            로그아웃
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

const sideBlock = (isOpen: boolean) => css`
  position: absolute;
  background-color: #e4e2e1;
  width: 50%;
  top: 0px;
  height: 100pc;
  float: right;
  right: -50%;
  transition: 0.5s;
  transform: ${isOpen ? 'translateX(-100%)' : ''};
`;

const close = css`
  position: absolute;
  width: 25px;
  margin-top: 5px;
  top: 15px;
  right: 20px;
`;

const menus = css`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 5pc;
`;

const menuBtn = css`
  font-size: 1pc;
  margin-top: 1pc;
  color: black;
  text-decoration: none;
`;
