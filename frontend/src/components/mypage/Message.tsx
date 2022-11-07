import { css } from '@emotion/react';
import axios from 'axios';
export default function Message(props: any) {
  async function clickEvent(msgId: any) {
    if (props.valid) {
      try {
        const res: any = await axios.get(
          `http://localhost:8080/api/v1/message/${msgId}`,
        );
        // console.log(res.data.response);
      } catch (err: any) {
        // console.log(err);
      }
    }
  }
  return (
    <>
      {props.valid && props.valid ? (
        <div css={FlowerCss} className="f-wrap">
          <div className="f-imgbox" onClick={() => clickEvent(props.flowerId)}>
            <img src={'/src/assets/' + props.imgUrl}></img>
          </div>
          <div className="f-inner">{props.writer}</div>
        </div>
      ) : (
        <div css={FlowerCss} className="f-wrap">
          <div className="f-imgbox" onClick={() => clickEvent(props.flowerId)}>
            <img
              src={
                '/src/assets/' + props.imgUrl.replaceAll('flower', 'flowerbud')
              }
            ></img>
          </div>
          <div className="f-inner">{props.writer}</div>
        </div>
      )}
    </>
  );
}
const FlowerCss = css`
  .f-wrap {
    width: 100%;
    position: relative;
  }
  .f-imgbox img {
    position: absolute;
    width: 30vw;
    vertical-align: middle;
  }
  .f-inner {
    position: absolute;
    left: 63vw;
    top: 5vw;
    color: white;
    text-shadow: 2px 2px 2px gray;
  }
`;
