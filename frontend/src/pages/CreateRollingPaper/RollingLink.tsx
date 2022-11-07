import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import copy from '@assets/copy.png';
import MySwal from '@components/SweetAlert';

export default function RollingLink() {
  const { state } = useLocation();
  const root = 'localhost:5173/rolling/';
  const navigate = useNavigate();
  const handleRollingPaper = (): void => {
    navigate(`/rolling/${state}`);
  };
  const copyUrl = (): void => {
    navigator.clipboard.writeText(root + state);
    MySwal.fire({
      title: '링크가 복사되었습니다.',
      icon: 'success',
      confirmButtonColor: '#16453e',
      confirmButtonText: '확인',
    });
  };
  return (
    <>
      <div css={Background}>
        <div css={Info}>
          <div css={Writing}>링크를 복사해</div>
          <div css={Writing}>롤링페이퍼를 공유하세요</div>
        </div>
        <div css={Link}>
          <div css={Url}>
            {root}
            {state}
          </div>
          <img src={copy} css={Copy} onClick={copyUrl} />
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

const Background = css`
  width: 100vw;
`;

const Info = css`
  margin-top: 23vh;
  font-size: 6vw;
`;

const Writing = css`
  margin-bottom: 3vh;
`;

const Link = css`
  display: flex;
  margin-right: 4vw;
`;

const Url = css`
  margin-top: 5vh;
  margin-left: 10vw;
  margin-right: 2vw;
  font-size: 4.5vw;
  background-color: white;
  padding: 1vh 4vw 1vh 4vw;
  border-radius: 2vw;
  overflow: scroll;
  display: flex;
`;

const Copy = css`
  margin-top: 5vh;
  width: 9vw;
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
