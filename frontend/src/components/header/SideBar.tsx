import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import userAPI from '@api/userAPI';
import closeBtn from '@assets/close.png';

const SideBar = (props: any) => {
  const { isOpen } = props;
  const { setIsOpen } = props;
  const test = () => {
    setIsOpen(!isOpen);
  };

  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);

  const logout = async () => {
    try {
      await userAPI.signOut(loginUser.jwt, loginUser.refresh);
      setLoginUser((prev: IuserRecoil) => {
        const variable = { ...prev };
        variable.id = 0;
        variable.userToken = '';
        variable.nickname = '';
        variable.points = 0;
        variable.jwt = '';
        variable.refresh = '';
        return variable;
      });
      window.location.href = '/';
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div id="sideblock">
      <div css={sideBlock(isOpen)}>
        <img src={closeBtn} css={close} onClick={test} />
        <div css={menus}>
          <a css={menuBtn} href="/">
            홈
          </a>
          <a css={menuBtn} href="/newroll/item">
            새로 만들기
          </a>
          <a css={menuBtn} href="/greenhouse">
            그린하우스
          </a>
          <a css={menuBtn} href="/store">
            꽃가게
          </a>
          <a css={menuBtn} href="/mypage">
            마이페이지
          </a>
          <a css={menuBtn} href="/manual">
            이용가이드
          </a>
          <a css={menuBtn} href="#" onClick={logout}>
            <span className="logout_text">로그아웃</span>
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
  left: 100%;
  transition: 0.5s;
  transform: ${isOpen ? 'translateX(-100%)' : ''};
  z-index: 500;
`;

const close = css`
  position: absolute;
  width: 25px;
  margin-top: 5px;
  top: 15px;
  right: 20px;
  cursor: pointer;
`;

const menus = css`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 5pc;
  z-index: 600;

  .logout_text {
    color: red;
  }
`;

const menuBtn = css`
  font-size: 1.15pc;
  margin-bottom: 2pc;
  color: black;
  text-decoration: none;
`;
