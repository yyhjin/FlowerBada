import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { IRolling } from '@pages/RollingPaper';
import { useEffect, useRef } from 'react';
import Loading from './Loading';

const Print = () => {
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  location.state as {
    rollingUrl: string;
    mainImg: string;
    type: number;
    rolling: IRolling;
  };
  const { rollingUrl, mainImg, type, rolling } = location.state;

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
      onClickPrint();
    }, 3000);
  }, []);

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
      // console.log(printContent, originalContent);
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      history.go(0);
    }
  };

  return (
    <>
      {/* <Button onClick={onClickPrint} style={{ zIndex: '998' }}>
        Print
      </Button> */}
      <div css={Cover}>
        <Loading />
      </div>
      <div ref={printRef}>
        <div css={A4CSS}>
          <div className="page">
            <img className="main-flower" src={mainImg} />
            <div className="title-box">{rolling.title}</div>

            <div className="messagelist">
              {rolling.messages.map((message: any, index: number) => {
                return (
                  <div key={index} className="messagebox">
                    <img src={'/src/assets/' + message.imgUrl}></img>
                    <span className="content-box">
                      <div css={MsgCSS(message.font)}>
                        {message.content}
                        <br />
                        <br />
                        <span className="writer-box">
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
    width: 270px;
    height: 500px;
    object-fit: contain;
    margin: auto;
    transform: translate(0%, 20%);
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

  .messagelist {
    /* width: 100%; */
    height: 10px;
    /* position: static; */

    .messagebox {
      position: relative;
      /* border: solid 1px; */
      width: 180px;
      height: 180px;

      img {
        /* position: relative; */
        width: 180px;
        height: 180px;
      }
      &:first-of-type {
        /* position: relative; */
        /* z-index: 10; */
        left: 480px;
        top: -400px;
        /* width: 180px;
        height: 180px; */
        transform: rotate(0deg);
      }
      &:nth-of-type(2) {
        /* z-index: 9; */
        left: -165px;
        top: -740px;
        transform: rotate(0deg);
      }
      &:nth-of-type(3) {
        /* z-index: 8; */
        left: -370px;
        top: -810px;
        transform: rotate(-10deg);
      }
      &:nth-of-type(4) {
        /* z-index: 7; */
        left: -210px;
        top: -830px;
        transform: rotate(13deg);
      }
      &:nth-of-type(5) {
        /* z-index: 6; */
        left: -380px;
        top: -840px;
        transform: rotate(-5deg);
      }
      &:nth-of-type(6) {
        /* z-index: 5; */
        left: -150px;
        top: -1020px;
        transform: rotate(-5deg);
      }
      &:nth-of-type(7) {
        /* z-index: 5; */
        left: 280px;
        top: -1700px;
        transform: rotate(10deg);
      }
      &:nth-of-type(8) {
        /* z-index: 5; */
        left: 300px;
        top: -1620px;
        transform: rotate(5deg);
      }
      &:nth-of-type(9) {
        /* z-index: 2; */
        left: 470px;
        top: -1670px;
        transform: rotate(-13deg);
      }
      &:nth-of-type(10) {
        /* z-index: 1; */
        left: 250px;
        top: -1810px;
        transform: rotate(0deg);
      }
    }
    .content-box {
      width: 200px;
      height: 200px;
      position: absolute;
      left: -10px;
      top: -10px;
      background-color: rgb(255, 255, 255, 0.5);
    }
  }
  .title-box {
    position: absolute;
    margin-top: -450px;
    margin-left: 67px;
    width: 150px;
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    font-family: 'SeoulNamsanM';
    word-break: keep-all;
    line-height: 1.5;
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
  line-height: 1.2;
  font-size: 13px;
  /* background-color: white; */

  .writer-box {
    float: right;
    margin-top: -5px;
  }
`;

const Cover = css`
  width: 100vh;
  height: 150vh;
  background-color: #f2f0ef;
  z-index: 999;
`;

export default Print;
