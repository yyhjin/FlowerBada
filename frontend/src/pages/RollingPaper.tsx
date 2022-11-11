import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import Message from '@src/components/message/Message';
import DotSlice from '@components/paging/DotSlice';
import messageAPI from '@api/messageAPI';
import IosShareIcon from '@mui/icons-material/IosShare';
import CreateIcon from '@mui/icons-material/Create';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import rollingAPI from '@api/rollingAPI';
import Star from '@assets/Star.png';
import EmptyStar from '@assets/EmptyStar.png';
import Delivery from '@assets/Delivery.png';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { IPaymentRecoil, paymentRecoil } from '@recoil/paymentRecoil';
import MySwal from '@components/SweetAlert';
import html2canvas from 'html2canvas';

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

export default function RollingPaper() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [rolling, setRolling] = useState<IRolling>({});
  const [paginationId, setPaginationId] = useState<number>(1);
  const [valid, setValid] = useState<Boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [type, setType] = useState<number>(1);
  const [bookmark, setBookmark] = useState<Boolean>(false);
  const [userState] = useRecoilState<IuserRecoil>(userReCoil);
  let paramCopy: any = {};
  paramCopy = useParams();
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [rollingDate, setRollingDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const [deliveryModal, setDeliveryModal] = useState<boolean>(false);
  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);

  async function getRolling() {
    setLoading(false);
    setDeliveryModal(false);
    let url = paramCopy.url;
    try {
      const res: any = await messageAPI.getRolling(
        userState.jwt,
        url,
        paginationId,
      );

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
        MySwal.fire({
          title: `${res.data.response.date} 일 이후 개봉 가능`,
          icon: 'info',
          confirmButtonColor: '#16453e',
          confirmButtonText: '확인',
        });
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
    } catch (err: any) {
      MySwal.fire({
        title: '불러오기 실패...',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
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
      try {
        let url = paramCopy.url;
        const res: any = await rollingAPI.bookmarkRolling(userState.jwt, url);
        setBookmark(!bookmark);
        // console.log('북마크 스위치 성공!');
      } catch (err: any) {
        MySwal.fire({
          title: '북마크 실패...',
          icon: 'warning',
          confirmButtonColor: '#16453e',
          confirmButtonText: '확인',
        });
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

  const changeDelivery = (param: boolean) => {
    setDeliveryModal(param);
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
      },
    });
  };

  const shareRolling = () => {
    navigate('/newroll/link', { state: paramCopy.url });
  };

  useEffect(() => {
    const paginationCheck = localStorage.getItem('paginationId');
    if (paginationCheck) setPaginationId(+paginationCheck);
    localStorage.removeItem('url');
    localStorage.removeItem('paginationId');
  }, []);

  useEffect(() => {
    getRolling();
    if (rollingDate <= nowDate && rolling.imgUrl?.startsWith('fixed')) {
      // 캡쳐 및 DB 저장
      const el = document.getElementById('to-save');
      if (el) {
        html2canvas(el).then((canvas: any) => {
          onSaveAs(
            canvas.toDataURL('image/png'),
            `final-image-` + paramCopy.url + `.png`,
          );
        });
      }
    }
  }, [paginationId]);

  const onSaveAs = (uri: string, filename: string): void => {
    console.log(uri);
    let link: any = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    // link.download = filename;
    // link.click();
    document.body.removeChild(link);
    axios.put(
      `http://localhost:8080/api/v1/message/updateimg/${paramCopy.url}`,
      {
        imgUrl: uri,
      },
    );
  };

  return (
    <>
      {loading && rolling && rolling.messages && type ? (
        <>
          <div css={DetailCss}>
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
            {!valid ? (
              <div className="valid">
                {rolling.date} 이후로 개봉 가능합니다.
              </div>
            ) : (
              <div className="valid">꽃을 눌러보세요!</div>
            )}

            <div css={SaveParent}>
              <div>
                <div className={`imgbox_${type}`}>
                  <img src={'/src/assets/' + rolling.imgBack}></img>
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
                        ></Message>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={`imgbox_front_${type}`}>
                <img src={'/src/assets/' + rolling.imgFront}></img>
              </div>
              <div id="to-save" className="save-child">
                <div className={`imgbox_${type}`}>
                  <img src={'/src/assets/' + rolling.imgBack}></img>
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
                          writerDisplay={false}
                        ></Message>
                      </div>
                    );
                  })}
                </div>
                <div className={`imgbox_front_${type}`}>
                  <img src={'/src/assets/' + rolling.imgFront}></img>
                </div>
              </div>
            </div>
            <div className={`dot_${type}`}>
              <DotSlice
                paginationId={paginationId}
                setPaginationId={setPaginationId}
                stepNumber={stepNumber}
              ></DotSlice>
            </div>
            {rollingDate <= nowDate ? (
              <>
                <div className="bottom-bar">
                  <ThemeProvider theme={theme}>
                    <IconButton
                      size="large"
                      color="primary"
                      className="share-btn"
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
              <div className="bottom-bar">
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
            )}
          </div>
        </>
      ) : (
        <div css={Loading}>로딩중</div>
      )}
    </>
  );
}

const DetailCss = css`
  width: 100%;
  height: 115%;
  position: relative;
  transform: translate(0%, -15%);

  .titlezone_1 {
    padding-top: 23vh;
    margin-bottom: -16vh;
    justify-content: center;
    font-size: 7.5vw;
    display: flex;
    @media screen and (min-height: 700px) {
      padding-top: 27vh;
      margin-bottom: -7vh;
    }
    @media screen and (min-height: 800px) {
      padding-top: 27vh;
      margin-bottom: -7vh;
    }
    @media screen and (min-height: 900px) {
      padding-top: 27vh;
      margin-bottom: -7vh;
    }
    @media screen and (max-height: 660px) and (max-width: 290px) {
      padding-top: 20vh;
      margin-bottom: -16vw;
    }
  }
  .titlezone_2 {
    padding-top: 20vh;
    margin-bottom: -10vw;
    justify-content: center;
    font-size: 7.5vw;
    display: flex;

    @media screen and (min-height: 700px) {
      padding-top: 22vh;
      margin-bottom: -7vh;
    }
    @media screen and (min-height: 800px) {
      padding-top: 22vh;
      padding-bottom: 2vh;
    }
    @media screen and (min-height: 900px) {
      padding-top: 22vh;
      margin-bottom: -7vh;
    }
    @media screen and (max-height: 660px) and (max-width: 290px) {
      padding-top: 22vh;
      margin-bottom: -8vw;
    }
  }
  .titlezone_3 {
    padding-top: 23vh;
    margin-bottom: -10vh;
    justify-content: center;
    font-size: 7.5vw;
    display: flex;
  }
  .imgbox_1,
  .imgbox_2 {
    /* width: 50vh; */
    /* height: 70vh; */
    position: absolute;
  }
  .imgbox_3 {
    position: absolute;
  }
  .imgbox_1 img {
    position: relative;
    z-index: 0;
    width: 75%;
    left: 0vw;
    top: 10vw;
  }
  .imgbox_2 img {
    position: relative;
    z-index: 0;
    width: 75%;
    left: 0vw;
    top: 10vw;
    @media screen and (max-height: 700px) {
      width: 62.5%;
    }
  }
  .imgbox_3 img {
    position: relative;
    z-index: 0;
    width: 90%;
    left: 0vw;
    top: 10vw;
    @media screen and (max-height: 700px) {
      width: 75%;
    }
  }
  .flowerlist {
    /* width: 100%; */
    position: static;

    .flowerbox_1 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -10vw;
        top: 46vw;
        transform: rotate(0deg);
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: 9vw;
        top: 44vw;
        transform: rotate(5deg);
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -25vw;
        top: 40vw;
        transform: rotate(20deg);
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -40vw;
        top: 50vw;
        transform: rotate(-10deg);
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 5vw;
        top: 27vw;
        transform: rotate(25deg);
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -21vw;
        top: 36vw;
        transform: rotate(-20deg);
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -36vw;
        top: 33vw;
        transform: rotate(0deg);
      }
    }
    .flowerbox_2 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -15vw;
        top: 60vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: -12vw;
          top: 52vw;
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: -2vw;
        top: 54vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: -1vw;
          top: 48vw;
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -32vw;
        top: 57vw;
        transform: rotate(-10deg);
        @media screen and (max-height: 700px) {
          left: -28vw;
          top: 50vw;
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -12vw;
        top: 40vw;
        transform: rotate(10deg);
        @media screen and (max-height: 700px) {
          left: -10vw;
          top: 35vw;
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 16vw;
        top: 37vw;
        transform: rotate(25deg);
        @media screen and (max-height: 700px) {
          left: 13vw;
          top: 32vw;
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -40vw;
        top: 45vw;
        transform: rotate(-20deg);
        @media screen and (max-height: 700px) {
          left: -35vw;
          top: 39vw;
        }
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -24vw;
        top: 32vw;
        transform: rotate(-10deg);
        @media screen and (max-height: 700px) {
          left: -20vw;
          top: 28vw;
        }
      }
      &:nth-of-type(8) {
        z-index: 3;
        left: -4vw;
        top: 29vw;
        transform: rotate(5deg);
        @media screen and (max-height: 700px) {
          left: -2vw;
          top: 25vw;
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
        @media screen and (max-height: 700px) {
          left: -12vw;
          top: 68vw;
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: -2vw;
        top: 80vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: -1.5vw;
          top: 68vw;
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -34vw;
        top: 83vw;
        transform: rotate(-10deg);
        @media screen and (max-height: 700px) {
          left: -28vw;
          top: 70vw;
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: 15vw;
        top: 75vw;
        transform: rotate(15deg);
        @media screen and (max-height: 700px) {
          left: 13.5vw;
          top: 63vw;
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: -45vw;
        top: 80vw;
        transform: rotate(-5deg);
        @media screen and (max-height: 700px) {
          left: -36vw;
          top: 68vw;
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -15vw;
        top: 65vw;
        transform: rotate(-5deg);
        @media screen and (max-height: 700px) {
          left: -12vw;
          top: 55vw;
        }
      }
      &:nth-of-type(7) {
        z-index: 5;
        left: -32vw;
        top: 68vw;
        transform: rotate(-10deg);
        @media screen and (max-height: 700px) {
          left: -27vw;
          top: 57vw;
        }
      }
      &:nth-of-type(8) {
        z-index: 5;
        left: 2vw;
        top: 65vw;
        transform: rotate(5deg);
        @media screen and (max-height: 700px) {
          left: 2vw;
          top: 55vw;
        }
      }
      &:nth-of-type(9) {
        z-index: 2;
        left: -45vw;
        top: 70vw;
        transform: rotate(-20deg);
        @media screen and (max-height: 700px) {
          left: -40vw;
          top: 60vw;
        }
      }
      &:nth-of-type(10) {
        z-index: 1;
        left: 15vw;
        top: 65vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: 13vw;
          top: 55vw;
        }
      }
    }
  }
  .dot_1,
  .dot_2 {
    margin-top: 2vh;
    bottom: 0%;
    @media screen and (min-height: 700px) {
      margin-top: 2vh;
    }
    @media screen and (min-height: 800px) {
      margin-top: 2vh;
    }
    @media screen and (min-height: 900px) {
      margin-top: 4vh;
    }
    @media screen and (max-height: 660px) and (max-width: 290px) {
      margin-top: 4vh;
    }
  }
  .dot_3 {
    margin-top: 0vh;
    bottom: 0%;
    @media screen and (min-height: 800px) {
      margin-top: 7vh;
    }
    @media screen and (min-height: 900px) {
      margin-top: 10vh;
    }
    @media screen and (max-height: 660px) and (max-width: 290px) {
      margin-top: 18vh;
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
  }
  .imgbox_front_2 {
    height: 65vh;
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
    @media screen and (max-height: 700px) {
      width: 62.5%;
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
    @media screen and (max-height: 700px) {
      width: 75%;
    }
  }

  .bottom-bar {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    .share-btn {
      float: left;
      margin-left: 1em;
    }
    .write-btn {
      float: right;
      margin-right: 1em;
    }
  }
`;

const Loading = css`
  width: 100vw;
`;

const DeliveryIcon = css`
  width: 10vw;
  margin-left: 75vw;
`;

const BookmarkImg = css`
  position: absolute;
  left: 85%;
  width: 10vw;
  z-index: 1;
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
`;

const SaveParent = css`
  position: relative;

  .save-child {
    background-color: #f2f0ef;
    height: 70vh;
    position: absolute;
    top: 0;
    z-index: -1;
  }
`;
