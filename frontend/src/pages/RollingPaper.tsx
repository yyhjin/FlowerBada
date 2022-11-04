import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { css } from '@emotion/react';
import Message from '@src/components/mypage/Message';
import DotSlice from '@components/paging/DotSlice';
import messageAPI from '@api/messageAPI';

interface IRolling {
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
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [paginationId, setPaginationId] = useState<number>(1);
  const [valid, setValid] = useState<Boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [type, setType] = useState<number>(1);
  let paramCopy: any = {};
  paramCopy = useParams();

  async function getRolling() {
    setLoading(false);
    let url = paramCopy.url;
    try {

      const res: any = await messageAPI.getRolling(url, paramCopy.paginationId);

      const curr = new Date();
      const open = new Date(res.data.response.date.replaceAll('.', '-'));

      const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
      const utcOpen = open.getTime() + open.getTimezoneOffset() * 60 * 1000;
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

      const nowDate = new Date(utc + KR_TIME_DIFF);
      const rollingDate = new Date(utcOpen);

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
            Number(res.data.response.capacity) ==
            0
            ? Number(res.data.response.totalMessages) /
                Number(res.data.response.capacity) +
                1
            : Number(res.data.response.totalMessages) /
                Number(res.data.response.capacity),
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

  useEffect(() => {
    getRolling();
  }, [paginationId]);

  return (
    <>
      {loading && rolling && rolling.messages && type ? (
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
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}

const DetailCss = css`
  width: 100%;
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
`;
