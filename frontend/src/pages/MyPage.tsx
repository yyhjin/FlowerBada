import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import MyDeliveryList from '../component/MyDeliveryList';
import MyPointList from '../component/MyPointList';

export default function MyPage() {
  sessionStorage.setItem('url', '/mypage');
  const [number, setNumber] = useState(0);
  function handleChange(number) {
    setNumber(number);
  }
  return (
    <div css={totalCSS}>
      <div className="main-tab">
        <div>
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
        <div>
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

  .main_tab {
    display: flex;
    flex-direction: row;
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
