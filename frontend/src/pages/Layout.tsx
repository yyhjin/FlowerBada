import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import Header from '@components/header/Header';

export default function Layout(props: any) {
  return (
    <>
      <div css={OutletCSS}>
        <Outlet />
      </div>
      <Header props={props} />
    </>
  );
}

const OutletCSS = css`
  margin-top: 65px;
  max-width: 500px;
  width: 100vw;
  height: calc(100vh - 70px);
  background-color: #f2f0ef;
`;
