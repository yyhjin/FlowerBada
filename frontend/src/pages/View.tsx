import { Button, css } from '@mui/material';
import { useRef, useEffect } from 'react';

const View = () => {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // onClickPrint();
  }, []);

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
  const onClickDownload = () => {};
  return (
    <>
      <Button onClick={onClickPrint}>Print</Button>
      <div ref={printRef} css={newA4}>
        <div style={{ width: '100%', height: '100%', margin: 'auto' }}>
          <img
            className="main-img"
            style={{ width: '250px', transform: 'translate(0%, 50%)' }}
            src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/rollingpaper/Q9c2mT.png"
          />
        </div>
      </div>
    </>
  );
};

const newA4 = css`
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm;
  margin: 1cm auto;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  .main-img {
    width: 100px;
    transform: translate(100%, 50%);
  }
`;
const A4CSS = css`
  /* transform: translate(0%, 30%); */
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: white;
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

  .img-box {
    transform: translate(0%, 35%);
    /* width: 21cm; */
    /* min-height: 29.7cm; */
    /* padding: 1.5cm 1.5cm 2cm 1.5cm; */
    height: 100%;
    margin: 0 auto;
    /* transform: translate(0%, 30%); */
  }
`;

export default View;
