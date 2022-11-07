import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import Message from '@src/components/mypage/Message';
import DotSlice from '@components/paging/DotSlice';
import messageAPI from '@api/messageAPI';
import { IconButton } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import CreateIcon from '@mui/icons-material/Create';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IRolling {
  rollingId?: number;
  imgUrl?: string;
  imgFront?: string;
  imgBack?: string;
  title?: string;
  date?: string;
  messages?: IMessage[];
}

interface IMessage {
  imgUrl: string;
  writer: string;
  flowerId: number;
  messageId: number;
}

export default function RollingPaper() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [rolling, setRolling] = useState<IRolling>({});
  const [paginationId, setPaginationId] = useState<number>(1);
  const [valid, setValid] = useState<Boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [type, setType] = useState<number>(1);
  let paramCopy: any = {};
  paramCopy = useParams();
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [rollingDate, setRollingDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  async function getRolling() {
    setLoading(false);
    let url = paramCopy.url;
    try {
      const res: any = await messageAPI.getRolling(url, '' + paginationId);

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
        // console.log(res.data.response);
        setValid(true);
      } else {
        alert(res.data.response.date + '일 이후 개봉 가능');
        setValid(false);
      }

      setRolling(res.data.response);
      setLoading(true);
      setStepNumber(
        Math.floor(
          Number(res.data.response.totalMessages) /
            Number(res.data.response.capacity) ===
            0
            ? Number(res.data.response.totalMessages) /
                Number(res.data.response.capacity)
            : Number(res.data.response.totalMessages) /
                Number(res.data.response.capacity) +
                1,
        ),
      );

      const tmpType = res.data.response.imgFront.split('_')[2];
      if (Number(tmpType) >= 1 && Number(tmpType) <= 4) {
        setType(1);
      } else if (Number(tmpType) >= 5 && Number(tmpType) <= 7) {
        setType(2);
      } else {
        setType(3);
      }
    } catch (err: any) {
      // console.log(err);
    }
  }

  const moveMessageWrite = () => {
    navigate('/rolling/message/create', {
      state: {
        rollingId: rolling.rollingId,
        rollingUrl: paramCopy.url,
      },
    });
  };

  useEffect(() => {
    getRolling();
  }, [paginationId]);

  return (
    <>
      {loading && rolling && rolling.messages && type ? (
        <>
          <div css={DetailCss}>
            <div className="fixbox">
              <div className={`imgbox_${type}`}>
                <img src={'/src/assets/' + rolling.imgBack}></img>
              </div>
              <div className="flowerlist">
                {rolling.messages.map((message, index) => {
                  return (
                    <div key={index} className={`flowerbox_${type}`}>
                      <Message
                        imgUrl={message.imgUrl}
                        flowerId={message.messageId}
                        writer={message.writer}
                        valid={valid}
                      ></Message>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={`imgbox_front_${type}`}>
              <img src={'/src/assets/' + rolling.imgFront}></img>
            </div>
            <div className="dot">
              <DotSlice
                paginationId={paginationId}
                setPaginationId={setPaginationId}
                stepNumber={stepNumber}
              ></DotSlice>
            </div>
            {rollingDate <= nowDate ? null : (
              <div className="bottom-bar">
                <ThemeProvider theme={theme}>
                  <IconButton
                    size="large"
                    color="primary"
                    className="share-btn"
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
        <div>로딩중</div>
      )}
    </>
  );
}

const DetailCss = css`
  width: 100%;
  height: 110%;
  position: relative;
  transform: translate(0%, -15%);

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
    top: 10vw;
  }
  .imgbox_2 img {
    position: relative;
    z-index: 0;
    width: 75%;
    left: 0vw;
    top: 10vw;
  }
  .imgbox_3 img {
    position: relative;
    z-index: 0;
    width: 90%;
    left: 0vw;
    top: 10vw;
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
        /* @media screen and (min-width: 500px) {
          left: 0px;
          top: 0;
        } */

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
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: -2vw;
        top: 54vw;
        transform: rotate(0deg);
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -32vw;
        top: 57vw;
        transform: rotate(-10deg);
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -12vw;
        top: 40vw;
        transform: rotate(10deg);
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 16vw;
        top: 37vw;
        transform: rotate(25deg);
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -40vw;
        top: 45vw;
        transform: rotate(-20deg);
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -24vw;
        top: 32vw;
        transform: rotate(-10deg);
      }
      &:nth-of-type(8) {
        z-index: 3;
        left: -4vw;
        top: 29vw;
        transform: rotate(5deg);
      }
    }
    .flowerbox_3 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -15vw;
        top: 80vw;
        transform: rotate(0deg);
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: -2vw;
        top: 80vw;
        transform: rotate(0deg);
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -32vw;
        top: 85vw;
        transform: rotate(-10deg);
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: 15vw;
        top: 75vw;
        transform: rotate(15deg);
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: -45vw;
        top: 80vw;
        transform: rotate(-5deg);
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -15vw;
        top: 65vw;
        transform: rotate(-5deg);
      }
      &:nth-of-type(7) {
        z-index: 5;
        left: -30vw;
        top: 70vw;
        transform: rotate(-10deg);
      }
      &:nth-of-type(8) {
        z-index: 5;
        left: 2vw;
        top: 65vw;
        transform: rotate(5deg);
      }
      &:nth-of-type(9) {
        z-index: 2;
        left: -45vw;
        top: 70vw;
        transform: rotate(-20deg);
      }
      &:nth-of-type(10) {
        z-index: 1;
        left: 13vw;
        top: 65vw;
        transform: rotate(0deg);
      }
    }
  }
  .dot {
    margin-bottom: 0;
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
  .imgbox_front_2 img {
    z-index: 12;
    position: relative;
    width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
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
