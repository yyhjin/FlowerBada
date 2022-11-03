import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import Header from '@components/header/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <div css={OutletCSS}>
        <Outlet />
      </div>
    </>
  );
}

const OutletCSS = css`
  margin-top: 60px;
  height: calc(100vh - 60px);
`;
