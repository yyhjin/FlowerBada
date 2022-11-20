import { useState } from 'react';
import { css } from '@emotion/react';
import MyDeliveryList from '@components/mypage/MyDeliveryList';
import MyPointList from '@components/mypage/MyPointList';

export default function MyPage() {
  sessionStorage.setItem('url', '/mypage');
  const [number, setNumber] = useState(0);
  function handleChange(number: number) {
    setNumber(number);
  }
  return (
    <div css={totalCSS}>
      <div className="main-tab">
        <div className="button-tab">
          {number === 0 ? (
            <button className="btn" onClick={() => handleChange(0)}>
              배송 목록
            </button>
          ) : (
            <button className="active_btn" onClick={() => handleChange(0)}>
              배송 목록
            </button>
          )}
        </div>
        <div className="button-tab">
          {number === 1 ? (
            <button className="btn" onClick={() => handleChange(1)}>
              포인트
            </button>
          ) : (
            <button className="active_btn" onClick={() => handleChange(1)}>
              포인트
            </button>
          )}
        </div>
      </div>
      <div className="delivery_list">
        {number === 0 ? (
          <MyDeliveryList></MyDeliveryList>
        ) : (
          <MyPointList></MyPointList>
        )}
      </div>
    </div>
  );
}

const totalCSS = css`
  width: 100vw;
  position: relative;

  .maintab {
    position: absolute;
  }

  button {
    border: 1px solid transparent;
    width: 50%;
    height: 37px;
  }
  .btn {
    float: left;
    background-color: #16453e;
    color: white;
    cursor: pointer;
  }
  .active_btn {
    float: left;
    background-color: white;
    cursor: pointer;
  }

  .delivery_list {
    position: relative;
    top: 37px;
  }
`;
