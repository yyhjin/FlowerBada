import backArrow from '../../img/backArrow.png';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useState } from 'react';
import SideBar from './SideBar';

import './Header.css';

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
        <img
          src="src\assets\hamburger.png"
          css={hamburger}
          onClick={slideLeft}
        />
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
  margin: 0 auto;
  background-color: #f2f0ef;
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
