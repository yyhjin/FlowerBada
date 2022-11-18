import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import copy from '@assets/copy.png';
import MySwal from '@components/SweetAlert';

export default function RollingLink() {
  const VITE_APP_KAKAO_KEY = import.meta.env.VITE_APP_KAKAO_KEY;

  const url = useLocation().state.url;
  const title = useLocation().state.title;
  const root = 'https://k7a405.p.ssafy.io/rolling/';
  // const root = 'http://localhost:5173/rolling/';
  const navigate = useNavigate();
  const handleRollingPaper = (): void => {
    navigate(`/rolling/${url}`);
  };

  const copyUrl = (): void => {
    navigator.clipboard.writeText(root + url);
    MySwal.fire({
      title: '링크가 복사되었습니다.',
      icon: 'success',
      confirmButtonColor: '#16453e',
      confirmButtonText: '확인',
    });
  };

  function shareKakao() {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(VITE_APP_KAKAO_KEY);
      }
    }

    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '꽃바다 - 우리들의 이야기를 꽃에 담아',
        description: `${title}`,
        imageUrl:
          'https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/rollingpaper/03LO7T.png',
        link: {
          mobileWebUrl: `${root}${url}`,
          webUrl: `${root}${url}`,
        },
      },
      buttons: [
        {
          title: '롤링페이퍼 작성하기',
          link: {
            mobileWebUrl: `${root}${url}`,
            webUrl: `${root}${url}`,
          },
        },
      ],
    });
  }

  return (
    <>
      <div css={Background}>
        <div css={Info}>
          <div css={Writing}>링크를 복사해</div>
          <div css={Writing}>롤링페이퍼를 공유하세요.</div>
        </div>
        <div css={Link}>
          <div css={Url}>
            {root}
            {url}
          </div>
          <img src={copy} css={Copy} onClick={copyUrl} />
        </div>
        <div css={CuttingLine}>
          <div css={Line}></div>
          <div>OR</div>
          <div css={Line}></div>
        </div>
        <div>
          <img
            css={KakaoButton}
            onClick={shareKakao}
            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          />
        </div>
        <button onClick={handleRollingPaper} css={GoRollingButton}>
          작성하러 가기
        </button>
      </div>
    </>
  );
}

const Background = css`
  position: relative;
  width: 100vw;
  height: 100%;
`;

const Info = css`
  padding-top: 15vh;
  font-size: 30px;
  @media screen and (max-width: 300px) {
    font-size: 20px;
  }
`;

const Writing = css`
  margin-bottom: 3vh;
`;

const Link = css`
  display: flex;
`;

const Url = css`
  margin-top: 5vh;
  margin-left: 40px;
  font-size: 20px;
  background-color: white;
  padding: 10px 10px 10px 20px;
  border-radius: 8px;
  overflow-x: scroll;
  display: flex;
`;

const Copy = css`
  cursor: pointer;
  margin-top: 5vh;
  margin-left: 5px;
  margin-right: 5px;
  width: 40px;
`;

const CuttingLine = css`
  margin-top: 5vh;
  display: flex;
  justify-content: space-evenly;
`;

const Line = css`
  background-color: black;
  height: 0.1vh;
  width: 40%;
`;

const KakaoButton = css`
  cursor: pointer;
  margin-top: 6vh;
  height: 50px;
  width: 50px;
  @media screen and (max-height: 500px) {
    margin-top: 5vh;
  }
`;

const GoRollingButton = css`
  position: absolute;
  margin: auto;
  bottom: 30px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  color: white;
  background-color: #16453e;
  height: 60px;
  left: 5%;
  width: 90%;
  @media screen and (min-width: 500px) {
    /* margin-top: 5vh; */
    bottom: 30px;
    left: 5%;
    width: 90%;
    height: 60px;
  }
`;

declare global {
  interface Window {
    Kakao: any;
  }
}

window.Kakao = window.Kakao || {};
