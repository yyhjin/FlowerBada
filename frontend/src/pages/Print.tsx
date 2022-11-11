import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '@components/mypage/Message';
import type { IRolling, IMessage } from '@pages/RollingPaper';
import {
  Button,
  createTheme,
  Grid,
  MenuItem,
  ThemeProvider,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';

const Print = () => {
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  // const componentRef = props.printRef;
  // const rolling = props.rolling;
  // const type = props.type;
  // const valid = props.valid;

  location.state as {
    rolling: IRolling;
    type: number;
    valid: Boolean;
    mainImg: string;
  };
  const { rolling, mainImg } = location.state;
  // const imgUrl = '/src/assets/' + rolling.messages[0].imgUrl;

  useEffect(() => {
    console.log(rolling.messages[0]);
    console.log(mainImg);
    onClickPrint();
  }, [rolling]);
  const onClickPrint = () => {
    if (printRef.current) {
      let printContents = printRef.current.innerHTML;
      let windowObject = window.open(
        '',
        'PrintWindow',
        'width=1000, height=800, top=100, left=300, toolbars=no, scrollbars=no, status=no, resizale=no',
      );
      if (windowObject) {
        windowObject.document.writeln(printContents);
        windowObject.document.close();
        windowObject.focus();
        windowObject.print();
        windowObject.close();
      }
    }
  };

  return (
    <div css={A4CSS}>
      <Button onClick={onClickPrint}>Print</Button>
      {/* <h1>{rolling.messages[0].content}</h1> */}
      <div ref={printRef} className="page">
        <img
          // className="main-img"
          style={{
            width: '250px',
            transform: 'translate(150%, 40%)',
          }}
          src={
            'https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/' +
            mainImg
          }
        />
        {/* <div style={{ position: 'relative' }}> */}
        <div
          style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            backgroundColor: 'rgb(242, 240, 239, 10)',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              color: '#000000',
              fontSize: '50px',
            }}
          >
            {rolling.messages[0].writer}
          </div>
          <img
            src={
              'https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/' +
              rolling.messages[0].imgUrl
            }
            style={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              transform: 'translate(10%, -120%)',
            }}
          />
        </div>
        <img
          src={
            'https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/' +
            rolling.messages[1].imgUrl
          }
          style={{
            width: '150px',
            transform: 'translate(50%, 70%)',
          }}
        />

        {rolling.messages[0].content}
      </div>
      {/* </div> */}
    </div>
  );
};

const A4CSS = css`
  /* transform: translate(0%, 30%); */
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: white;
  z-index: -1;
  /* margin: 100px; */
  /* padding: 0; */

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

    .flowerlist {
      /* width: 100%; */
      position: static;

      .flowerbox {
        position: relative;
        &:first-of-type {
          /* z-index: 10; */
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
    }
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

  .flowerlist {
    /* width: 100%; */
    position: static;

    .flowerbox {
      position: relative;
      &:first-of-type {
        /* z-index: 10; */
        left: 100px;
        top: -200px;
        width: 50px;
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

export default Print;
