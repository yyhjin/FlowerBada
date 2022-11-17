import { css } from '@emotion/react';
import { useState } from 'react';

export default function Receipt(props: any) {
  const [points] = useState(props.points);
  const [price] = useState(props.price);
  return (
    <div>
      <div css={context}>보유 포인트 : {points}</div>
      <div css={context}>결제 금액 : {price}</div>
      <hr />
      <div css={context}>결제 후 포인트 : {points - price}</div>
    </div>
  );
}

const context = css`
  margin-bottom: 10px;
`;
