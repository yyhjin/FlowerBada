import menuIcon from '../../img/Menu.png';
import backArrow from '../../img/backArrow.png';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header css={HeaderNav}>
      <nav>
        <a onClick={() => navigate(-1)} css={BackArrow}>
          <img height="20px" width="20px" id="back" src={backArrow}></img>
        </a>
        <span css={InlineBlock}>
          <h3>꽃바다</h3>
        </span>
        <a href="#" css={Menu}>
          <img height="20px" width="20px" id="menu" src={menuIcon}></img>
        </a>
      </nav>
    </header>
  );
}

const HeaderNav = css`
  align-itmes: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f2f0ef;
`;

const BackArrow = css`
  text-decoration: none;
  float: left;
`;

const InlineBlock = css`
  display: inline-block;
`;

const Menu = css`
  text-decoration: none;
  float: right;
`;
