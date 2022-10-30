import { css } from '@emotion/react';

const Mainpage = () => {
  return (
    <div css={TestCSS}>
      Mainpage
      <p className="test">얘는 파란색이야</p>
    </div>
  );
};

const TestCSS = css`
  color: red;
  display: flex;
  .test {
    color: blue;
  }
`;

export default Mainpage;
