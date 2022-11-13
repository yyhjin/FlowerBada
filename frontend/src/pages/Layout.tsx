import { Dispatch, SetStateAction } from 'react';
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
  margin-top: 60px;
  height: calc(100vh - 60px);
`;
