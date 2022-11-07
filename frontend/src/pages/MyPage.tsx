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
  display: flex;
  flex-direction: column;
  width: 100vw;

  .main_tab {
    display: flex;
    flex-direction: row;
  }
  .button_tab {
    width: 100%;
  }
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  .btn,
  .active_btn {
    height: 40px;
    width: 50%;
  }
  .btn {
    float: left;
    background-color: #16453e;
    width: 50%;
    color: white;
    border-radius: 0%;

    &:hover {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
  .active_btn {
    float: left;
    background-color: white;
    width: 50%;
    border-radius: 0%;

    &:hover {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
`;
