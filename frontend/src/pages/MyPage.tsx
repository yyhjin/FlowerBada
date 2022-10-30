import { useState } from 'react';
import styled from '@emotion/styled';
import MyDeliveryList from '../component/MyDeliveryList';
import MyPointList from '../component/MyPointList';

export default function MyPage() {
  sessionStorage.setItem('url', '/mypage');
  const [number, setNumber] = useState(0);
  function handleChange(number) {
    setNumber(number);
  }
  return (
    <>
      <FixBox>
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
        {number === 0 ? (
          <MyDeliveryList></MyDeliveryList>
        ) : (
          <MyPointList></MyPointList>
        )}
      </FixBox>
    </>
  );
}

const FixBox = styled.div`
  width: 500px;
  margin-left: -56px;
  margin-right: -56px;
  height: 850px;
  margin: 0 auto;
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
