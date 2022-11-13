import { css } from '@emotion/react';

export default function Receipt(props: any) {
  return (
    <div>
      <div css={context}>보유 포인트 : {props.points}</div>
      <div css={context}>결제 금액 : {props.price}</div>
      <hr />
      <div css={context}>결제 후 포인트 : {props.points - props.price}</div>
    </div>
  );
}

const context = css`
  margin-bottom: 10px;
`;
