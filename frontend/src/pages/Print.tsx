import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '@components/message/Message';
import type { IRolling, IMessage } from '@pages/RollingPaper';
import type { IMsg } from '@components/message/Message';
import {
  Button,
  createTheme,
  Grid,
  MenuItem,
  ThemeProvider,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import messageAPI from '@src/api/messageAPI';
import { ReactDOM } from 'react';
import { WindowSharp } from '@mui/icons-material';

const Print = () => {
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMsg[]>([]);

  location.state as {
    rollingUrl: string;
    mainImg: string;
    type: number;
    rolling: IRolling;
  };
  const { rollingUrl, mainImg, type, rolling } = location.state;

  useEffect(() => {
    getMessages();
    console.log(typeof type, 'ADfadf');
  }, []);

  useEffect(() => {
    console.log(messages);
    console.log(mainImg);
    // onClickPrint();
  }, [messages]);

  const getMessages = () => {
    messageAPI
      .getAllMessage(rollingUrl)
      .then((res) => {
        console.log(res.data.response);
        setMessages(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickPrint = () => {
    if (printRef.current) {
      // let printContents = printRef.current.innerHTML;
      // let windowObject = window.open(
      //   '',
      //   'PrintWindow',
      //   'width=1000, height=800, top=100, left=300, toolbars=no, scrollbars=no, status=no, resizale=no',
      // );
      // if (windowObject) {
      //   windowObject.document.writeln(printContents);
      //   windowObject.document.close();
      //   windowObject.focus();
      //   windowObject.print();
      //   windowObject.close();
      // }
      let printContent = printRef.current.innerHTML;
      let originalContent = document.body.innerHTML;
      console.log(printContent, originalContent);
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      history.go(0);
    }
  };

  return (
    <>
      <Button onClick={onClickPrint} style={{ zIndex: '999' }}>
        Print
      </Button>
      <div ref={printRef}>
        <div css={A4CSS}>
          <div className="page">
            <img
              // className="main-img"
              style={{
                width: '250px',
                transform: 'translate(0, 40%)',
              }}
              src={
                'https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/' +
                mainImg
              }
            />
            <div className="title-box">{rolling.title}</div>
            {/* <div style={{ width: '100vh', height: '100vh' }}>
              <div className={`imgbox_${type}`}>
                <img src={'/src/assets/' + rolling.imgBack}></img>
              </div>
              <div className="flowerlist">
                {rolling.messages.map((message: any, index: number) => {
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
            </div> */}

            <div className="messagelist">
              {messages.map((message: any, index: number) => {
                return (
                  <div key={index} className="messagebox">
                    <img
                      src={'/src/assets/' + message.imgUrl}
                      className="messagebox"
                    ></img>
                    <span className="content-box">
                      <div css={MsgCSS(message.font)}>
                        {message.content}
                        <br />
                        <br />
                        <span style={{ float: 'right' }}>
                          from. {message.writer}
                        </span>
                      </div>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const A4CSS = css`
  /* transform: translate(0%, 30%); */
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: white;
  width: 100%;

  /* z-index: -1; */
  /* margin: 100px; */
  /* padding: 0; */

  /* body {
    margin: 0;
    padding: 0;
  } */

  .page {
    width: 21cm;
    min-height: 29.7cm;
    padding: 1.5cm 1.5cm 2cm 1.5cm;
  }

  @page {
    size: A4 landscape;
    margin: 0;
    position: relative;

    /* .flowerlist {
      width: 100%;
      height: 100%;
      position: static;

      .flowerbox {
        position: relative;
        &:first-of-type {
          z-index: 10;
          left: 100px;
          top: -200px;
          width: 500px;
          transform: rotate(0deg);
          @media screen and (max-height: 700px) {
            left: -12vw;
            top: 68vw;
          }
        }
      }
    } */
  }

  @media print {
    position: relative;
    html,
    body {
      -webkit-print-color-adjust: exact;
      width: 210mm;
      height: 297mm;
    }

    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }
  }

  .main-flower {
    width: 250px;
    margin: auto;
    transform: translate(0%, 30%);
  }

  .img-box {
    /* transform: translate(0%, 35%); */
    /* width: 100%; */
    /* min-height: 29.7cm; */
    /* padding: 1.5cm 1.5cm 2cm 1.5cm; */
    /* height: 100%; */
    /* margin: 0 auto; */
    /* transform: translate(0%, 30%); */
  }

  .subpage {
    border: 2px red solid;
    background: #fff;
    height: 257mm;
  }

  .option-buttons {
    display: flex;
    flex-direction: column;
  }

  .imgbox_1,
  .imgbox_2,
  .imgbox_3 {
    position: absolute;
  }

  .imgbox_1 img {
    position: relative;
    z-index: 0;
    /* width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    @media screen and (min-width: 500px) { */
    left: 0px;
    top: 60px;
    width: 200px;
    /* } */
  }
  .imgbox_2 img {
    position: relative;
    z-index: 0;
    /* width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (min-width: 500px) { */
    left: 0px;
    /* top: 150px; */
    width: 200px;
    /* } */
  }
  .imgbox_3 img {
    position: relative;
    z-index: 0;
    /* width: 90%;
    left: 0vw;
    top: 10vw;
    @media screen and (min-width: 500px) { */
    left: 0px;
    top: 150px;
    width: 200px;
    /* } */
  }

  .imgbox_front_1 img {
    z-index: 12;
    position: relative;
    /* width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (min-width: 500px) { */
    left: 0px;
    top: 60px;
    /* } */
  }
  .imgbox_front_2 img {
    z-index: 12;
    position: relative;
    /* width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (min-width: 500px) { */
    /* left: -125px; */
    /* top: 150px; */
    width: 200px;

    /* } */
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

  .flowerlist {
    width: 100%;
    position: static;

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
      width: 50px;
      /* height: 100%; */
      &:first-of-type {
        z-index: 10;
        /* left: -12vw;
        top: 60vw; */
        transform: rotate(0deg);
        /* @media screen and (min-width: 500px) { */
        left: -70px;
        top: 400px;
        /* width: 50px; */

        /* } */
      }
      &:nth-of-type(2) {
        z-index: 9;
        /* left: 3vw;
        top: 56vw; */
        transform: rotate(0deg);
        /* @media screen and (min-width: 500px) { */
        left: 0px;
        top: 390px;
        /* width: 50px; */
        /* } */
      }
      &:nth-of-type(3) {
        z-index: 8;
        /* left: -32vw;
        top: 61vw; */
        transform: rotate(-10deg);
        /* @media screen and (min-width: 500px) { */
        left: -170px;
        top: 400px;
        width: 50px;
        /* } */
      }
      &:nth-of-type(4) {
        z-index: 7;
        /* left: -11vw;
        top: 42vw; */
        transform: rotate(10deg);
        /* @media screen and (min-width: 500px) { */
        left: -60px;
        top: 305px;
        width: 50px;
        /* } */
      }
      &:nth-of-type(5) {
        z-index: 6;
        /* left: 16vw;
        top: 37vw; */
        transform: rotate(25deg);
        /* @media screen and (min-width: 500px) { */
        left: 70px;
        top: 290px;
        width: 50px;
        /* } */
      }
      &:nth-of-type(6) {
        z-index: 5;
        /* left: -38vw;
        top: 47vw; */
        transform: rotate(-20deg);
        /* @media screen and (min-width: 500px) { */
        left: -190px;
        top: 335px;
        width: 50px;
        /* } */
      }
      &:nth-of-type(7) {
        z-index: 4;
        /* left: -24vw;
        top: 32vw; */
        transform: rotate(-10deg);
        /* @media screen and (min-width: 500px) { */
        left: -120px;
        top: 255px;
        width: 50px;
        /* } */
      }
      &:nth-of-type(8) {
        z-index: 3;
        /* left: -4vw;
        top: 29vw; */
        transform: rotate(5deg);
        /* @media screen and (min-width: 500px) { */
        left: -15px;
        top: 240px;
        width: 50px;
        /* } */
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

  .messagelist {
    /* width: 100%; */
    position: static;

    .messagebox {
      position: relative;
      &:first-of-type {
        /* z-index: 10; */
        left: 230px;
        top: -150px;
        width: 180px;
        height: 180px;
        transform: rotate(0deg);
      }
      &:nth-of-type(2) {
        /* z-index: 9; */
        left: -450px;
        top: -600px;
        transform: rotate(0deg);
      }
      &:nth-of-type(3) {
        /* z-index: 8; */
        left: -600px;
        top: -600px;
        transform: rotate(-10deg);
      }
      &:nth-of-type(4) {
        /* z-index: 7; */
        left: -480px;
        top: -765px;
        transform: rotate(15deg);
      }
      &:nth-of-type(5) {
        /* z-index: 6; */
        left: -600px;
        top: -730px;
        transform: rotate(-5deg);
      }
      &:nth-of-type(6) {
        /* z-index: 5; */
        left: -425px;
        top: -850px;
        transform: rotate(-5deg);
      }
      &:nth-of-type(7) {
        /* z-index: 5; */
        left: 30px;
        top: -1600px;
        transform: rotate(10deg);
      }
      &:nth-of-type(8) {
        /* z-index: 5; */
        left: 50px;
        top: -1540px;
        transform: rotate(5deg);
      }
      &:nth-of-type(9) {
        /* z-index: 2; */
        left: 280px;
        top: -1500px;
        transform: rotate(-20deg);
      }
      &:nth-of-type(10) {
        /* z-index: 1; */
        left: 50px;
        top: -1670px;
        transform: rotate(0deg);
      }
    }
    .content-box {
      width: 200px;
      height: 200px;
      position: absolute;
      left: 220px;
      top: -150px;
      background-color: rgb(255, 255, 255, 0.5);
    }

    /* .content {
      margin-top: 30px;
      margin-left: 50px;
      width: 100px;
      height: 100px;
    } */
  }
  .title-box {
    position: absolute;
    margin-top: -350px;
    margin-left: 67px;
    width: 100px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    font-family: 'SeoulNamsanM';
  }
`;

const a4 = css`
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: white;

  body {
    margin: 0;
    padding: 0;
  }

  .page {
    width: 21cm;
    min-height: 29.7cm;
    padding: 1.5cm 1.5cm 2cm 1.5cm;
  }

  @page {
    size: A4 landscape;
    margin: 0;
  }

  @media print {
    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }
  }
`;

const MsgCSS = (font: string) => css`
  margin-top: 30px;
  margin-left: 50px;
  /* left: 100px; */
  /* top: 25px; */
  width: 100px;
  height: 100px;
  font-family: ${font};
`;

export default Print;
