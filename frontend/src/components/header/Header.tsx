import menuIcon from '@assets/Menu.png';
import backArrow from '@assets/backArrow.png';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useState } from 'react';
import SideBar from './SideBar';
import hamburgerBtn from '@assets/hamburger.png';
import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import { useRecoilState } from 'recoil';
import Login from '@assets/login_btn.png';

export default function Header(props: any) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);

  const slideLeft = () => {
    setIsOpen(!isOpen);
  };
  const linkToMain = () => {
    navigate('/');
  };

  const linkToSignIn = () => {
    localStorage.setItem('url', props.props.props.url);
    localStorage.setItem('paginationId', String(props.props.props.pageId));
    navigate('/');
  };

  return (
    <header css={HeaderNav}>
      <nav>
        {loginUser.jwt === '' ? null : (
          <a onClick={() => navigate(-1)} css={BackArrow}>
            <img id="back" src={backArrow} className="back-btn"></img>
          </a>
        )}
        <span css={LogoName}>
          {loginUser.jwt === '' ? (
            <div css={MainLogo}>
              <h1>꽃바다</h1>
            </div>
          ) : (
            <a href="#" onClick={linkToMain} css={MainLogo}>
              <h1>꽃바다</h1>
            </a>
          )}
        </span>
        {loginUser.jwt === '' ? (
          <span>
            <img src={Login} css={hamburger} onClick={linkToSignIn} />
            <div css={coverUp}></div>
          </span>
        ) : (
          <span>
            <img src={hamburgerBtn} css={hamburger} onClick={slideLeft} />
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div css={coverUp}></div>
          </span>
        )}
      </nav>
    </header>
  );
}

const HeaderNav = css`
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 500px;
  /* height: 10vh; */
  margin: 0 auto;
  background-color: #f2f0ef;
  z-index: 999;

  nav {
    height: 60px;
  }

  .dropdown {
    position: relative;
  }

  .menu {
    position: absolute;
    list-style-type: none;
    margin: 5px 0 0 0;
    padding: 0;
    border: 1px solid grey;
    width: 100px;
    right: 0px;
  }

  .menu > li {
    margin: 0;
    background-color: white;
  }

  .menu > li:hover {
    background-color: lightgray;
  }

  .menu > li > button {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    text-align: left;
    background: none;
    color: inherit;
    border: none;
    padding: 5px;
    margin: 0;
    font: inherit;
    cursor: pointer;
  }

  #back {
    position: relative;
    height: 30px;
    width: 30px;
    top: 15px;
    left: 20px;
  }

  .back-btn:hover,
  .back-btn:active {
    transform: scale(1.05, 1.05);
    transition: all ease 0.2s;
    cursor: pointer;
  }
`;

const LogoName = css`
  display: inline-block;
  font-family: 'GowunDodum-Regular';
`;

const MainLogo = css`
  text-decoration: none;
  color: black;

  h1:hover,
  h1:active {
    transform: scale(1.05, 1.05);
    transition: all ease 0.2s;
  }
`;

const BackArrow = css`
  text-decoration: none;
  cursor: pointer;
  float: left;
`;

const hamburger = css`
  position: relative;
  float: right;
  width: 30px;
  top: 20px;
  right: 20px;
  cursor: pointer;

  &:hover,
  &:active {
    transform: scale(1.05, 1.05);
    transition: all ease 0.2s;
  }
`;

const coverUp = css`
  position: absolute;
  background-color: white;
  top: 0px;
  width: 50%;
  height: 100pc;
  float: right;
  left: 100%;
  z-index: 1000;
`;
