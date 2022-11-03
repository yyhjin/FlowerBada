import backArrow from '@src/img/backArrow.png';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useState } from 'react';
import SideBar from './SideBar';
import hamburgerBtn from '@assets/hamburger.png';

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const slideLeft = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header css={HeaderNav}>
      <nav>
        <a onClick={() => navigate(-1)} css={BackArrow}>
          <img height="20px" width="20px" id="back" src={backArrow}></img>
        </a>
        <span css={InlineBlock}>
          <h3>꽃바다</h3>
        </span>
        <img src={hamburgerBtn} css={hamburger} onClick={slideLeft} />
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div css={coverUp}></div>
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
  width: 450px;
  max-width: 1280px;
  height: 60px;
  margin: 0 auto;
  background-color: #f2f0ef;

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
`;

const BackArrow = css`
  text-decoration: none;
  float: left;
`;

const InlineBlock = css`
  display: inline-block;
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
  right: -50%;
  z-index: 1000;
`;
