import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import copy from '@assets/copy.png';
import MySwal from '@components/SweetAlert';

{
  /* <script
  src="https://t1.kakaocdn.net/kakao_js_sdk/2.0.1/kakao.min.js"
  integrity="sha384-eKjgHJ9+vwU/FCSUG3nV1RKFolUXLsc6nLQ2R1tD0t4YFPCvRmkcF8saIfOZNWf/"
  crossOrigin="anonymous"
></script>; */
}

export default function RollingLink() {
  const VITE_APP_KAKAO_KEY = import.meta.env.VITE_APP_KAKAO_KEY;

  const url = useLocation().state.url;
  const title = useLocation().state.title;
  const root = 'https://k7a405.p.ssafy.io/rolling/';
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
    console.log(root + url);
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

  // const Explain = useEffect(() => {
  //   if (!Window.Kakao.init) {
  //     Kakao.init('a452135df47a8eef043c1b08491c2c34');
  //   }
  // }, []);

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
  width: 100vw;
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
  border-radius: 2vw;
  overflow: scroll;
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
  margin-top: 20vh;
  height: 7vh;
  width: 94%;
  border-radius: 3vw;
  color: white;
  font-size: 20px;
  background-color: #16453e;
  @media screen and (max-height: 500px) {
    margin-top: 5vh;
  }
  @media screen and (max-height: 600px) {
    margin-top: 7vh;
  }
  @media screen and (max-height: 700px) {
    margin-top: 10vh;
  }
`;

declare global {
  interface Window {
    Kakao: any;
  }
}

window.Kakao = window.Kakao || {};
