import menuIcon from '@assets/Menu.png';
import backArrow from '@assets/backArrow.png';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useState } from 'react';
import SideBar from './SideBar';
import hamburgerBtn from '@assets/hamburger.png';
import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import { useRecoilState } from 'recoil';

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);

  const slideLeft = () => {
    setIsOpen(!isOpen);
  };
  const linkToMain = () => {
    navigate('/');
  };

  return (
    <header css={HeaderNav}>
      <nav>
        {loginUser.jwt === '' ? null : (
          <a onClick={() => navigate(-1)} css={BackArrow}>
            <img id="back" src={backArrow}></img>
          </a>
        )}
        <span css={LogoName}>
          {loginUser.jwt === '' ? (
            <a href="#" css={MainLogo}>
              <h3>꽃바다</h3>
            </a>
          ) : (
            <a href="#" onClick={linkToMain} css={MainLogo}>
              <h3>꽃바다</h3>
            </a>
          )}
        </span>
        {loginUser.jwt === '' ? null : (
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
    top: 12px;
    left: 20px;
  }
`;

const LogoName = css`
  display: inline-block;
  font-family: 'GowunDodum-Regular';
`;

const MainLogo = css`
  text-decoration: none;
  color: black;
`;

const BackArrow = css`
  text-decoration: none;
  float: left;
`;

const hamburger = css`
  position: relative;
  float: right;
  width: 30px;
  top: 15px;
  right: 20px;
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
