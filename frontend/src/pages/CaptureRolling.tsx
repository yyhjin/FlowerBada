import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import Message from '@src/components/message/Message';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import MySwal from '@components/SweetAlert';
import html2canvas from 'html2canvas';
import updateTokens from '@utils/updateTokens';
import messageAPI from '@api/messageAPI';
import type { IMessage, IRolling } from './RollingPaper';

export default function CaptureRolling(props: {
  type: number;
  rolling: IRolling;
  nowDate: Date;
  rollingDate: Date;
  url: string;
  color: Boolean;
}) {
  const navigate = useNavigate();
  const [imgHeight, setImgHeight] = useState<number>(0);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);

  const location = useLocation();
  // location.state as {
  //   type: number;
  //   valid: Boolean;
  //   rolling: IRolling;
  //   nowDate: Date;
  //   rollingDate: Date;
  // };
  // const { type, valid, rolling, nowDate, rollingDate } = location.state;

  // window.addEventListener('resize', function () {
  //   get();
  // });

  const type = props.type;
  const rolling = props.rolling;
  const nowDate = props.nowDate;
  const rollingDate = props.rollingDate;
  const url = props.url;
  const color = props.color;

  const get = () => {
    let img = document.getElementById('base-img');
    setTimeout(() => {
      if (img) {
        console.log(+img?.clientWidth, +img?.clientHeight);
        setImgHeight(+img?.clientHeight);
      }
    }, 50);
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    console.log(imgHeight);

    if (imgHeight != 0) {
      if (rollingDate <= nowDate && rolling.imgUrl?.startsWith('fixed')) {
        // 캡쳐 및 DB 저장
        const el = document.getElementById('capture-box');
        if (el) {
          html2canvas(el).then((canvas: any) => {
            onSaveAs(
              canvas.toDataURL('image/png'),
              `final-image-` + url + `.png`,
            );
          });
        }
      }
    }
  }, [imgHeight]);

  const onSaveAs = (uri: string, filename: string): void => {
    let link: any = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    // link.download = filename;
    // link.click();
    document.body.removeChild(link);

    messageAPI.updateRollingImg(userState.jwt, userState.refresh, url, {
      imgUrl: uri,
    });
  };

  return (
    <>
      <div
        css={DetailCss({
          height: imgHeight,
          color: color,
        })}
      >
        <div id="capture-box" className={`DetailBox_${type}`}>
          <div className={`imgbox_${type}`}>
            <img id="base-img" src={'/src/assets/' + rolling.imgBack} />
          </div>
          <div className="flowerlist">
            {rolling.messages?.map((message: IMessage, index: number) => {
              return (
                <div key={index} className={`flowerbox_${type}`}>
                  <Message
                    imgUrl={message.imgUrl}
                    messageId={message.messageId}
                    writer={message.writer}
                    valid={true}
                    writerDisplay={false}
                    type={type}
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
    </>
  );
}

const DetailCss = (props: any) => css`
  /* height: 100%; */
  .DetailBox_1 {
    margin-top: 200px;
    background-color: ${props.color ? '#ffffff' : '#f2f0ef'};
    height: ${props.height == 0 ? '100%' : props.height + 110 + 'px'};
    position: relative;
    transform: translate(0%, -15%);
  }
  .DetailBox_2 {
    margin-top: 200px;
    background-color: ${props.color ? '#ffffff' : '#f2f0ef'};
    height: ${props.height == 0 ? '100%' : props.height + 120 + 'px'};
    position: relative;
    transform: translate(0%, -15%);
    @media screen and (min-width: 500px) {
      height: 980px;
      margin-top: 200px;
    }
  }
  .DetailBox_3 {
    margin-top: 200px;
    background-color: ${props.color ? '#ffffff' : '#f2f0ef'};
    height: ${props.height == 0 ? '100%' : props.height + 50 + 'px'};
    position: relative;
    transform: translate(0%, -15%);
    @media screen and (min-width: 500px) {
      height: 1030px;
      margin-top: 200px;
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
