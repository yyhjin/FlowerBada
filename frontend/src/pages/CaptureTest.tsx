import html2canvas from 'html2canvas';
import flower from '@assets/fixed-size/flower/flower_2_fixed.png';
import { css } from '@emotion/react';
import axios from 'axios';

export default function CaptureTest() {
  const rollingUrl = 'm9b358p8';

  const onClick = () => {
    const el = document.getElementById('flower_img');
    if (el) {
      html2canvas(el).then((canvas) => {
        onSaveAs(canvas.toDataURL('image/png'), 'flower-image.png');
      });
    }
  };

  const onSaveAs = (uri: string, filename: string): void => {
    // console.log(uri);
    // let link: any = document.createElement('a');
    // document.body.appendChild(link);
    // link.href = uri;
    // link.download = filename;
    // link.click();
    // document.body.removeChild(link);
    axios.put(`http://localhost:8080/api/v1/message/updateimg/${rollingUrl}`, {
      imgUrl: uri,
    });
  };

  return (
    <>
      <div css={MainCss}>
        <img src={flower} id="flower_img" />
      </div>
      <button onClick={onClick}>capture</button>
    </>
  );
}

const MainCss = css`
  img {
    width: 100px;
    height: 100px;
  }
`;
