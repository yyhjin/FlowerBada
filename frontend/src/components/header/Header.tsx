/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import menuIcon from '../../img/Menu.png';
import backArrow from '../../img/backArrow.png';
import { css } from '@emotion/react';

export default function Header() {
  return (
    <header
      css={css({
        alignItmes: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        backgroundColor: '#F2F0EF',
      })}
    >
      <nav>
        <a
          href="#"
          css={css({
            textDecoration: 'none',
            float: 'left',
          })}
        >
          <img height="20px" width="20px" id="back" src={backArrow}></img>
        </a>
        <span
          css={css({
            display: 'inline-block',
          })}
        >
          <h3>꽃바다</h3>
        </span>
        <a
          href="#"
          css={css({
            textDecoration: 'none',
            float: 'right',
          })}
        >
          <img height="20px" width="20px" id="menu" src={menuIcon}></img>
        </a>
      </nav>
    </header>
  );
}
