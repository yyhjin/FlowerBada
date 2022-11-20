import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import Message from '@src/components/message/Message';
import DotSlice from '@components/paging/DotSlice';
import messageAPI from '@api/messageAPI';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CaptureRolling from '@pages/CaptureRolling';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import rollingAPI from '@api/rollingAPI';
import Star from '@assets/Star.png';
import EmptyStar from '@assets/EmptyStar.png';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { paymentRecoil } from '@recoil/paymentRecoil';
import MySwal from '@components/SweetAlert';
import updateTokens from '@utils/updateTokens';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LinkIcon from '@mui/icons-material/Link';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';

import Kakao from '@assets/kakaoTalk2.png';
import { styled } from '@mui/material/styles';

export interface IRolling {
  rollingId?: number;
  imgUrl?: string;
  imgFront?: string;
  imgBack?: string;
  title?: string;
  bookmark?: boolean;
  date?: string;
  messages?: IMessage[];
}

export interface IMessage {
  imgUrl: string;
  writer: string;
  flowerId: number;
  messageId: number;
  price: number;
}

export default function RollingPaper(props: any) {
  const [loading, setLoading] = useState<Boolean>(false);
  const [rolling, setRolling] = useState<IRolling>({});
  const [paginationId, setPaginationId] = useState<number>(1);
  const [valid, setValid] = useState<Boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [type, setType] = useState<number>(1);
  const [bookmark, setBookmark] = useState<Boolean>(false);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  let paramCopy: any = {};
  let url: string;
  paramCopy = useParams();
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [rollingDate, setRollingDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const [deliveryModal, setDeliveryModal] = useState<boolean>(false);
  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);
  const [color, setColor] = useState<Boolean>(false);
  const [left, setLeft] = useState<string>('0px');
  const [capture, setCapture] = useState<Boolean>(false);
  const [leng, setLeng] = useState<string>('0pt');
  const [mediaLeng, setMediaLeng] = useState<string>('0pt');
  const [printModal, setPrintModal] = useState<boolean>(false);
  const [device, setDevice] = useState<boolean>(false);

  const captureRef = useRef<any>(null);

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 500) {
      setLeft((window.innerWidth - 500) / 2 + 'px');
    } else {
      setLeft('0px');
    }
  });

  let componentRef = useRef<HTMLDivElement>(null);
  const root = 'https://k7a405.p.ssafy.io/rolling/';
  // const root = 'http://localhost:5173/rolling/';
  const VITE_APP_KAKAO_KEY = import.meta.env.VITE_APP_KAKAO_KEY;

  function afterGetRolling(res: any) {
    const curr = new Date();
    const open = new Date(res.data.response.date.replaceAll('.', '-'));

    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const utcOpen = open.getTime() + open.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    const nowDate = new Date(utc + KR_TIME_DIFF);
    setNowDate(nowDate);
    const rollingDate = new Date(utcOpen);
    setRollingDate(rollingDate);

    if (rollingDate <= nowDate) {
      setValid(true);
    } else {
      setValid(false);
    }

    setRolling(res.data.response);
    setLoading(true);
    setStepNumber(
      Math.floor(
        res.data.response.totalMessages <= res.data.response.capacity
          ? 1
          : Number(res.data.response.totalMessages - 1) /
              Number(res.data.response.capacity) +
              1,
      ),
    );
    if (res.data.response.bookmark) {
      setBookmark(true);
    }
    const tmpType = res.data.response.imgFront.split('_')[2];
    if (Number(tmpType) >= 1 && Number(tmpType) <= 4) {
      setType(1);
    } else if (Number(tmpType) >= 5 && Number(tmpType) <= 7) {
      setType(2);
    } else {
      setType(3);
    }
  }

  async function getRolling() {
    url = paramCopy.url;
    if (userState.jwt === '') {
      props.Setters.setUrl(paramCopy.url);
      props.Setters.setPageId(paginationId);
    }

    if (window.innerWidth >= 500) {
      setLeft((window.innerWidth - 500) / 2 + 'px');
    } else {
      setLeft('0px');
    }

    setLoading(false);
    setDeliveryModal(false);
    try {
      const res: any = await messageAPI.getRolling(
        userState.jwt,
        userState.refresh,
        url,
        paginationId,
      );
      afterGetRolling(res);

      let titleLength = res.data.response.title.length;
      if (titleLength >= 16) {
        setLeng('12px');
        setMediaLeng('15px');
      } else if (titleLength >= 11) {
        setLeng('15px');
        setMediaLeng('18px');
      } else if (titleLength >= 6) {
        setLeng('20px');
        setMediaLeng('25px');
      } else {
        setLeng('30px');
        setMediaLeng('37px');
      }
    } catch (err: any) {
      if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
        MySwal.fire({
          title: '로그아웃 되었습니다!',
          icon: 'warning',
          confirmButtonColor: '#16453e',
          confirmButtonText: '확인',
        }).then(async () => {
          setUserState((prev: IuserRecoil) => {
            const variable = { ...prev };
            variable.id = 0;
            variable.userToken = '';
            variable.nickname = '';
            variable.points = 0;
            variable.jwt = '';
            variable.refresh = '';
            return variable;
          });
          const res: any = await messageAPI.getRolling(
            '',
            '',
            url,
            paginationId,
          );
          afterGetRolling(res);
        });
      } else {
        let accessToken: string = err.response.headers.get('x-auth-token');
        let refreshToken: string = err.response.headers.get('refresh-token');
        if (accessToken && refreshToken) {
          accessToken = accessToken.split(' ')[1];
          refreshToken = refreshToken.split(' ')[1];
          updateTokens(accessToken, refreshToken, setUserState);
          const res: any = await messageAPI.getRolling(
            accessToken,
            refreshToken,
            url,
            paginationId,
          );
          afterGetRolling(res);
        } else {
          MySwal.fire({
            title: '불러오기 실패...',
            icon: 'warning',
            confirmButtonColor: '#16453e',
            confirmButtonText: '확인',
          });
          navigate('/');
        }
      }
    }
  }
  const bookmarkSwitch = async () => {
    //비 로그인시
    if (userState.jwt === '') {
      MySwal.fire({
        title: '로그인 후<br/>사용 가능합니다!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    }
    //로그인시
    else {
      const url = paramCopy.url;
      try {
        await rollingAPI.bookmarkRolling(userState.jwt, userState.refresh, url);
        setBookmark(!bookmark);
        // console.log('북마크 스위치 성공!');
      } catch (err: any) {
        if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
          MySwal.fire({
            title: '로그인이 필요합니다!',
            icon: 'warning',
            confirmButtonColor: '#16453e',
            confirmButtonText: '확인',
          });
          setUserState((prev: IuserRecoil) => {
            const variable = { ...prev };
            variable.id = 0;
            variable.userToken = '';
            variable.nickname = '';
            variable.points = 0;
            variable.jwt = '';
            variable.refresh = '';
            return variable;
          });
          navigate('/');
        } else {
          let accessToken: string = err.response.headers.get('x-auth-token');
          let refreshToken: string = err.response.headers.get('refresh-token');
          if (accessToken && refreshToken) {
            accessToken = accessToken.split(' ')[1];
            refreshToken = refreshToken.split(' ')[1];
            updateTokens(accessToken, refreshToken, setUserState);
            await rollingAPI.bookmarkRolling(accessToken, refreshToken, url);
            setBookmark(!bookmark);
          } else {
            MySwal.fire({
              title: '북마크 실패...',
              icon: 'warning',
              confirmButtonColor: '#16453e',
              confirmButtonText: '확인',
            });
            navigate('/');
          }
        }
      }
    }
  };

  const moveMessageWrite = () => {
    navigate('/rolling/message/create', {
      state: {
        rollingId: rolling.rollingId,
        rollingUrl: paramCopy.url,
      },
    });
  };

  const openDeliveryModal = () => {
    if (userState.jwt === '') {
      MySwal.fire({
        title: '로그인 후<br/>사용 가능합니다!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    } else {
      setDeliveryModal(true);
    }
  };

  const closeDeliveryModal = () => {
    if (userState.jwt === '') {
      MySwal.fire({
        title: '로그인 후<br/>사용 가능합니다!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    } else {
      setDeliveryModal(false);
    }
  };

  // const closePrintModal = () => {
  //   setColor(false);
  //   // if (userState.jwt === '') {
  //   //   MySwal.fire({
  //   //     title: '로그인 후<br/>사용 가능합니다!',
  //   //     icon: 'warning',
  //   //     confirmButtonColor: '#16453e',
  //   //     confirmButtonText: '확인',
  //   //   });
  //   // } else {
  //   //   setColor(false);
  //   // }
  // };

  const openPrintModal = () => {
    if (userState.jwt === '') {
      MySwal.fire({
        title: '로그인 후<br/>사용 가능합니다!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    } else {
      setPrintModal(true);
    }
  };

  const closePrintModal = () => {
    if (userState.jwt === '') {
      MySwal.fire({
        title: '로그인 후<br/>사용 가능합니다!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    } else {
      setPrintModal(false);
    }
  };

  const sendDelivery = () => {
    // 로컬스토리지에 담기
    localStorage.setItem('url', paramCopy.url);
    localStorage.setItem('paginationId', paginationId.toString());
    navigate('/payment/option', {
      state: {
        rolling,
        type,
        valid,
        stepNumber,
        userToken: userState.userToken,
        paginationId,
      },
    });
  };

  const linkCopy = () => {
    navigator.clipboard.writeText(root + paramCopy.url);
    MySwal.fire({
      title: '링크가 복사되었습니다.',
      icon: 'success',
      confirmButtonColor: '#16453e',
      confirmButtonText: '확인',
    });
  };

  const kakaoShare = () => {
    if (userState.jwt === '') {
      MySwal.fire({
        title: '로그인 후<br/>사용 가능합니다!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    } else {
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
          description: `${rolling.title}`,
          imageUrl:
            'https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/rollingpaper/03LO7T.png',
          link: {
            mobileWebUrl: `${root}${paramCopy.url}`,
            webUrl: `${root}${paramCopy.url}`,
          },
        },
        buttons: [
          {
            title: '롤링페이퍼 작성하기',
            link: {
              mobileWebUrl: `${root}${paramCopy.url}`,
              webUrl: `${root}${paramCopy.url}`,
            },
          },
        ],
      });
    }
  };

  useEffect(() => {
    const paginationCheck = localStorage.getItem('paginationId');
    if (paginationCheck) setPaginationId(+paginationCheck);
    localStorage.removeItem('url');
    localStorage.removeItem('paginationId');
  }, []);

  const saveRolling = () => {
    setColor(true);
    closePrintModal();
  };

  useEffect(() => {
    const goPrintAsync = async () => {
      if (color) {
        // 캡쳐
        await captureRef.current.captureToPrint();
        setColor(false);
      }
    };
    goPrintAsync();
  }, [color]);

  const deviceCheck = () => {
    var pcDevice =
      'win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos';

    // 접속한 디바이스 환경
    if (navigator.platform) {
      if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
        // console.log('MOBILE');
        setDevice(false);
      } else if (
        navigator.platform === 'MacIntel' &&
        navigator.maxTouchPoints > 1
      ) {
        // console.log('IPAD');
        setDevice(false);
      } else {
        // console.log('PC');
        setDevice(true);
      }
    }
  };

  useEffect(() => {
    deviceCheck();
  }, []);

  const dateBeforeActions = [
    { icon: <EditIcon />, name: '메시지 작성', function: moveMessageWrite },
    { icon: <LinkIcon />, name: '링크 복사', function: linkCopy },
    {
      icon: (
        <img
          src={Kakao}
          style={{
            userSelect: 'none',
            width: '1em',
            height: '1em',
            display: 'inline-block',
            fill: 'currentColor',
            flexShrink: '0',
            fontSize: '1.5rem',
          }}
        />
      ),
      name: '카카오톡 공유',
      function: kakaoShare,
    },
  ];

  const dateAfterActions = [
    { icon: <LocalShippingIcon />, name: '배송', function: openDeliveryModal },
    { icon: <PrintIcon />, name: '프린트', function: openPrintModal },
    {
      icon: (
        <img
          src={Kakao}
          style={{
            userSelect: 'none',
            width: '1em',
            height: '1em',
            display: 'inline-block',
            fill: 'currentColor',
            flexShrink: '0',
            fontSize: '1.5rem',
          }}
        />
      ),
      name: '카카오톡 공유',
      function: kakaoShare,
    },
  ];

  useEffect(() => {
    getRolling();
  }, [paginationId]);

  const captureGo = () => {
    navigate('/rolling/capture', {
      state: {
        // rollingUrl: paramCopy.url,
        // mainImg: rolling.imgUrl,
        type,
        valid,
        rolling,
        nowDate,
        rollingDate,
      },
    });
  };

  return (
    <>
      {loading && rolling && rolling.messages && type ? (
        <>
          <div>
            <div css={DetailCss({ leng: leng, mediaLeng: mediaLeng })}>
              {!valid ? (
                <div className={`valid_${type}`}>
                  {rolling.date} 이후로 개봉 가능합니다.
                </div>
              ) : (
                <div className={`valid_${type}`}>꽃을 눌러보세요!</div>
              )}
              <div className={`titlezone_${type}`}>
                <div className="title">{rolling.title}</div>
                {bookmark ? (
                  <img src={Star} css={BookmarkImg} onClick={bookmarkSwitch} />
                ) : (
                  <img
                    src={EmptyStar}
                    css={BookmarkImg}
                    onClick={bookmarkSwitch}
                  />
                )}
              </div>

              {/* <div css={SaveParent(color, imgWidth, imgHeight)}> */}
              <div>
                <div className={`imgbox_${type}`}>
                  <img
                    id="base-img"
                    src={'/src/assets/' + rolling.imgBack}
                  ></img>
                </div>
                <div className="flowerlist">
                  {rolling.messages.map((message, index) => {
                    return (
                      <div key={index} className={`flowerbox_${type}`}>
                        <Message
                          imgUrl={message.imgUrl}
                          messageId={message.messageId}
                          writer={message.writer}
                          valid={valid}
                          writerDisplay={true}
                          type={type}
                        ></Message>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={`imgbox_front_${type}`}>
                <img src={'/src/assets/' + rolling.imgFront}></img>
              </div>
            </div>
            {/* <div css={`dot_${type}`}> */}
            <div css={Dot}>
              <ThemeProvider theme={theme}>
                <SpeedDial
                  ariaLabel="SpeedDial openIcon example"
                  sx={{ position: 'absolute', bottom: 16, right: 16 }}
                  icon={<SpeedDialIcon />}
                  className="speed-dial-zone"
                >
                  {rollingDate <= nowDate
                    ? dateAfterActions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          onClick={action.function}
                        />
                      ))
                    : dateBeforeActions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          onClick={action.function}
                        />
                      ))}
                </SpeedDial>
                <DotSlice
                  paginationId={paginationId}
                  setPaginationId={setPaginationId}
                  stepNumber={stepNumber}
                ></DotSlice>
              </ThemeProvider>
              <DialogCustom open={deliveryModal} left={left}>
                <DialogTitle id="alert-dialog-title" css={Font}>
                  확인해주세요
                </DialogTitle>
                <DialogContent>
                  <DialogContentText css={Font}>
                    현재 선택하신 페이지의 꽃들로 주문을 진행합니다.
                  </DialogContentText>
                </DialogContent>
                <DialogActions css={ActionCss}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={sendDelivery}
                      css={Font}
                      id="yes"
                    >
                      확인
                    </Button>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="neutral"
                      size="small"
                      onClick={closeDeliveryModal}
                      css={Font}
                      id="no"
                    >
                      취소
                    </Button>
                  </ThemeProvider>
                </DialogActions>
              </DialogCustom>
              <DialogCustom open={printModal} left={left}>
                <DialogTitle id="alert-dialog-title" css={Font}>
                  안내
                </DialogTitle>
                {device ? (
                  <>
                    <DialogContent>
                      <DialogContentText css={Font}>
                        프린트 창이 뜨면 설정 더보기 - 배경그래픽 옵션을 꼭
                        체크해주세요!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions css={ActionCss}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={saveRolling}
                          css={Font}
                        >
                          확인
                        </Button>
                        <Button
                          variant="contained"
                          color="neutral"
                          size="small"
                          onClick={closePrintModal}
                          css={Font}
                        >
                          취소
                        </Button>
                      </ThemeProvider>
                    </DialogActions>
                  </>
                ) : (
                  <>
                    <DialogContent>
                      <DialogContentText css={Font}>
                        프린트 기능은 PC에서 지원합니다.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions css={ActionCss}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={closePrintModal}
                          css={Font}
                        >
                          확인
                        </Button>
                      </ThemeProvider>
                    </DialogActions>
                  </>
                )}
              </DialogCustom>
            </div>
            {/* {rollingDate <= nowDate ? (
              <>
                <div css={BottomBar}>
                  <ThemeProvider theme={theme}>
                    <IconButton
                      size="large"
                      color="primary"
                      className="share-btn"
                      onClick={saveRolling}
                    >
                      <SaveAltIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      size="large"
                      color="primary"
                      className="write-btn"
                      onClick={() => changeDelivery(true)}
                    >
                      <LocalShippingIcon fontSize="large" />
                    </IconButton>
                  </ThemeProvider>
                </div>
                <Dialog open={deliveryModal}>
                  <DialogTitle id="alert-dialog-title" css={Font}>
                    확인해주세요
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText css={Font}>
                      현재 선택하신 페이지의 꽃들로 주문을 진행합니다.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions css={ActionCss}>
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={sendDelivery}
                        css={Font}
                      >
                        확인
                      </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color="neutral"
                        size="small"
                        onClick={() => changeDelivery(false)}
                        css={Font}
                      >
                        취소
                      </Button>
                    </ThemeProvider>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <div css={BottomBar}>
                <ThemeProvider theme={theme}>
                  <IconButton
                    size="large"
                    color="primary"
                    className="share-btn"
                    onClick={shareRolling}
                  >
                    <IosShareIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    size="large"
                    color="primary"
                    className="write-btn"
                    onClick={moveMessageWrite}
                  >
                    <CreateIcon fontSize="large" />
                  </IconButton>
                </ThemeProvider>
              </div>
            )} */}
          </div>
          <div css={CapturePage}>
            <CaptureRolling
              ref={captureRef}
              type={type}
              rolling={rolling}
              nowDate={nowDate}
              rollingDate={rollingDate}
              url={paramCopy.url}
              color={color}
            />
          </div>
        </>
      ) : (
        <div css={Loading}></div>
      )}
    </>
  );
}

const DetailCss = (props: any) => css`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translate(0%, -15%);
  .valid_1 {
    margin-top: 25vh;
    justify-content: center;
    @media screen and (min-width: 1000px) {
      margin-top: 30vh;
    }
  }
  .valid_2 {
    margin-top: 30vh;
    justify-content: center;
    @media screen and (min-width: 1000px) {
    }
  }
  .valid_3 {
    margin-top: 35vh;
    justify-content: center;
  }
  .titlezone_1 {
    justify-content: center;
    padding-top: 50px;
    margin-bottom: -20vh;
    font-size: ${props.leng};
    display: flex;
    @media screen and (min-width: 500px) {
      padding-top: 50px;
      font-size: ${props.mediaLeng};
      margin-bottom: -100px;
    }
    @media screen and (max-width: 300px) {
      padding-top: 150px;
      margin-bottom: -50px;
    }
    @media screen and (min-height: 700px) {
      padding-top: 50px;
      margin-bottom: -100px;
    }
    @media screen and (min-width: 1000px) {
      padding-top: 50px;
      margin-bottom: -150px;
    }
  }
  .titlezone_2 {
    justify-content: center;
    padding-top: 30px;
    margin-bottom: -50px;
    font-size: ${props.leng};
    display: flex;
    @media screen and (min-width: 500px) {
      padding-top: 20px;
      margin-bottom: -100px;
      font-size: ${props.mediaLeng};
    }
    @media screen and (max-width: 300px) {
      padding-top: 20px;
      margin-bottom: -50px;
    }
    @media screen and (min-height: 700px) {
      padding-top: 20px;
      margin-bottom: -50px;
    }
    @media screen and (min-width: 1000px) {
      padding-top: 20px;
      margin-bottom: -150px;
    }
  }
  .titlezone_3 {
    justify-content: center;
    padding-top: 50px;
    margin-bottom: -10vh;
    font-size: ${props.leng};
    display: flex;
    @media screen and (min-width: 500px) {
      padding-top: 60px;
      margin-bottom: -30vh;
      font-size: ${props.mediaLeng};
    }
    @media screen and (max-width: 300px) {
      padding-top: 50px;
      margin-bottom: -50px;
    }
    @media screen and (min-height: 700px) {
      padding-top: 60px;
      margin-bottom: -120px;
    }
    @media screen and (min-width: 1000px) {
      padding-top: 50px;
      margin-bottom: -200px;
    }
  }

  .flowerlist {
    /* width: 100%; */
    position: static;
    /* margin-top: -100px; */

    .flowerbox_1 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -5vw;
        top: 46vw;
        transform: rotate(0deg);
        @media screen and (min-width: 500px) {
          left: -25px;
          top: 230px;
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: 16vw;
        top: 45vw;
        transform: rotate(5deg);
        @media screen and (min-width: 500px) {
          left: 75px;
          top: 230px;
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -16vw;
        top: 40vw;
        transform: rotate(20deg);
        @media screen and (min-width: 500px) {
          left: -90px;
          top: 200px;
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -40vw;
        top: 50vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 500px) {
          left: -220px;
          top: 250px;
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 12vw;
        top: 27vw;
        transform: rotate(25deg);
        @media screen and (min-width: 500px) {
          left: 70px;
          top: 120px;
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -15vw;
        top: 36vw;
        transform: rotate(-20deg);
        @media screen and (min-width: 500px) {
          left: -80px;
          top: 165px;
        }
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -31vw;
        top: 32vw;
        transform: rotate(0deg);
        @media screen and (min-width: 500px) {
          left: -170px;
          top: 140px;
        }
      }
    }
    .flowerbox_2 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -12vw;
        top: 60vw;
        transform: rotate(0deg);
        @media screen and (min-width: 500px) {
          left: -70px;
          top: 400px;
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: 3vw;
        top: 56vw;
        transform: rotate(0deg);
        @media screen and (min-width: 500px) {
          left: 0px;
          top: 390px;
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -32vw;
        top: 61vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 500px) {
          left: -170px;
          top: 400px;
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -11vw;
        top: 42vw;
        transform: rotate(10deg);
        @media screen and (min-width: 500px) {
          left: -60px;
          top: 305px;
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 16vw;
        top: 37vw;
        transform: rotate(25deg);
        @media screen and (min-width: 500px) {
          left: 70px;
          top: 290px;
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -38vw;
        top: 47vw;
        transform: rotate(-20deg);
        @media screen and (min-width: 500px) {
          left: -190px;
          top: 335px;
        }
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -24vw;
        top: 32vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 500px) {
          left: -120px;
          top: 255px;
        }
      }
      &:nth-of-type(8) {
        z-index: 3;
        left: -4vw;
        top: 29vw;
        transform: rotate(5deg);
        @media screen and (min-width: 500px) {
          left: -15px;
          top: 240px;
        }
      }
    }
    .flowerbox_3 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -15vw;
        top: 80vw;
        transform: rotate(0deg);
        @media screen and (min-width: 500px) {
          left: -65px;
          top: 510px;
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: -1vw;
        top: 80vw;
        transform: rotate(0deg);
        @media screen and (min-width: 500px) {
          left: 0px;
          top: 510px;
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -34vw;
        top: 83vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 500px) {
          left: -150px;
          top: 525px;
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: 17vw;
        top: 75vw;
        transform: rotate(15deg);
        @media screen and (min-width: 500px) {
          left: 90px;
          top: 485px;
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: -45vw;
        top: 80vw;
        transform: rotate(-5deg);
        @media screen and (min-width: 500px) {
          left: -220px;
          top: 505px;
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -15vw;
        top: 65vw;
        transform: rotate(-5deg);
        @media screen and (min-width: 500px) {
          left: -70px;
          top: 430px;
        }
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -32vw;
        top: 68vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 500px) {
          left: -150px;
          top: 440px;
        }
      }
      &:nth-of-type(8) {
        z-index: 3;
        left: 2vw;
        top: 65vw;
        transform: rotate(5deg);
        @media screen and (min-width: 500px) {
          left: 10px;
          top: 425px;
        }
      }
      &:nth-of-type(9) {
        z-index: 2;
        left: -45vw;
        top: 70vw;
        transform: rotate(-20deg);
        @media screen and (min-width: 500px) {
          left: -230px;
          top: 450px;
        }
      }
      &:nth-of-type(10) {
        z-index: 1;
        left: 15vw;
        top: 65vw;
        transform: rotate(0deg);
        @media screen and (min-width: 500px) {
          left: 80px;
          top: 430px;
        }
      }
    }
  }

  .imgbox_1,
  .imgbox_2,
  .imgbox_3 {
    position: absolute;
  }

  .imgbox_1 img {
    position: relative;
    z-index: 0;
    width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    @media screen and (min-width: 500px) {
      left: 0px;
      top: 60px;
    }
  }
  .imgbox_2 img {
    position: relative;
    z-index: 0;
    width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (min-width: 500px) {
      left: 0px;
      top: 150px;
    }
  }
  .imgbox_3 img {
    position: relative;
    z-index: 0;
    width: 90%;
    left: 0vw;
    top: 10vw;
    @media screen and (min-width: 500px) {
      left: 0px;
      top: 150px;
    }
  }

  .imgbox_front_1 img {
    z-index: 12;
    position: relative;
    width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (min-width: 500px) {
      left: 0px;
      top: 60px;
    }
  }
  .imgbox_front_2 img {
    z-index: 12;
    position: relative;
    width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (min-width: 500px) {
      left: 0px;
      top: 150px;
    }
  }
  .imgbox_front_3 img {
    z-index: 12;
    position: relative;
    width: 90%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (min-width: 500px) {
      left: 0px;
      top: 150px;
    }
  }
`;

const Dot = css`
  position: absolute;
  z-index: 20;
  width: 100%;
  margin-top: 0vh;
  bottom: 0%;
  .speed-dial-zone {
    padding-bottom: 50px;
    .MuiButtonBase-root {
      width: 10vw;
      height: 10vw;
      @media screen and (min-width: 500px) {
        width: 50px;
        height: 50px;
      }
    }
  }
`;

// const BottomBar = css`
//   position: absolute;
//   width: 100%;
//   bottom: 0;
//   .share-btn {
//     float: left;
//     margin-left: 1em;
//   }
//   .write-btn {
//     float: right;
//     margin-right: 1em;
//   }
// `;

const Loading = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const BookmarkImg = css`
  cursor: pointer;
  position: absolute;
  left: 85%;
  width: 10vw;
  z-index: 1;
  @media screen and (min-width: 500px) {
    width: 45px;
  }
`;

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#16453E',
    },
    neutral: {
      main: '#B1BDBB',
    },
  },
});

const Font = css`
  font-family: 'SeoulNamsanM';
  word-break: keep-all;
`;

const ActionCss = css`
  width: 90%;
  float: right;
  justify-content: center;
  * {
    margin-left: 30px;
    margin-right: 30px;
  }
`;

const DialogCustom: any = styled(Dialog)((props: any) => ({
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    boxShadow: 'none',
    width: '100%',
    left: `${props.left}`,
  },
  '& .css-ypiqx9-MuiDialogContent-root': {
    margin: 'auto',
    width: '70%',
    left: `${props.left}`,
  },

  '& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
    backgroundColor: 'rgb(0 0 0 / 80%)',
    left: `${props.left}`,
  },
}));

const CapturePage = css`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -2;
`;
