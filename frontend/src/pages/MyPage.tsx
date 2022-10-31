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
            <Button onClick={() => handleChange(0)}>배송 목록</Button>
          ) : (
            <ActiveButton onClick={() => handleChange(0)}>
              배송 목록
            </ActiveButton>
          )}
        </div>
        <div>
          {number === 1 ? (
            <Button onClick={() => handleChange(1)}>포인트</Button>
          ) : (
            <ActiveButton onClick={() => handleChange(1)}>포인트</ActiveButton>
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
`;

const Button = styled.button`
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
`;
const ActiveButton = styled.button`
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
`;
