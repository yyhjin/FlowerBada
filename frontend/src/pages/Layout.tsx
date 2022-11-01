import { Outlet } from 'react-router-dom';
import Header from '@components/header/Header';
import { css } from '@emotion/react';

export default function Layout() {
  return (
    <>
      <Header />
      <div css={OutletCss}>
        <Outlet />
      </div>
    </>
  );
}

const OutletCss = css`
  margin-top: 60px;
`;
