import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';

export default function RollingLink() {
  const { state } = useLocation();
  const root = 'localhost:5173/rollingpaper/';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleRollingPaper = (): void => {
    navigate(`/rolling/${state}/1`);
  };
  return (
    <>
      <div css={Background}>
        <div css={Info}>
          링크를 복사해 <br />
          롤링페이퍼를 공유하세요
        </div>
        <div css={Link}>
          {root}
          {state}/1
        </div>
        <div css={CuttingLine}>
          <div css={Line}></div>
          <div>OR</div>
          <div css={Line}></div>
        </div>
        <button css={KakaoButton}>카카오톡으로 공유</button>
        <button onClick={handleRollingPaper} css={GoRollingButton}>
          작성하러 가기
        </button>
      </div>
    </>
  );
}

const DefaultColor = css`
  background-color: #f2f0ef;
  color: red;
`;

const Background = css`
  width: 100vw;
`;

const Info = css`
  margin-top: 23vh;
  font-size: 6vw;
`;

const Link = css`
  margin-top: 5vh;
  margin-left: 5vw;
  margin-right: 5vw;
  font-size: 4.5vw;
  background-color: white;
  padding: 2vw;
  border-radius: 2vw;
`;

const CuttingLine = css`
  margin-top: 5vh;
  display: flex;
  justify-content: space-evenly;
`;

const Line = css`
  background-color: black;
  height: 0.1vh;
  width: 35vw;
`;

const KakaoButton = css`
  margin-top: 8vh;
  height: 5vh;
  width: 50vw;
`;

const GoRollingButton = css`
  margin-top: 26.5vh;
  height: 7vh;
  width: 94vw;
  border-radius: 3vw;
  color: white;
  font-size: 4vw;
  background-color: #16453e;
`;
