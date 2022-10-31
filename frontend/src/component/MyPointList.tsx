import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '../recoil/userRecoil';
import CoinImg from '@assets/coin.png';
export default function MyPointList() {
  const [pages, setPages] = useState(0);
  const [myPoint, setMyPoint] = useState(0);
  const [myPointList, setMyPointList] = useState([]);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const scrollHeight = document.querySelector('.mylist')?.scrollHeight;
    const scrollTop = document.querySelector('.mylist')?.scrollTop;

    if (
      scrollTop &&
      scrollHeight &&
      Math.round(scrollTop + innerHeight) >= scrollHeight
    ) {
      myPointListFunc();
    }
  }, [pages, myPointList]);
  useEffect(() => {
    myPointListFunc();
  }, []);
  useEffect(() => {
    // scroll event listener 등록
    const event = document.querySelector('.mylist');
    if (event) {
      event.addEventListener('scroll', handleScroll);
      return () => {
        // scroll event listener 해제
        event.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);
  async function myPointListFunc() {
    try {
      const params = { paginationId: pages };
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/mypage/mypoint',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + userState.jwt,
          },
          params,
        },
      );
      // console.log(res.data.response);
      setMyPoint(res.data.response.myPoint);
      if (res.data.response.myPointList.length !== 0) {
        console.log(res.data.response.myPointList);
        setMyPointList(myPointList.concat(res.data.response.myPointList));
        setPages(pages + 1);
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div css={totalCSS}>
      <InfoBox>
        <img src={CoinImg} width="25px" css={ImgCss}></img>
        <b>&nbsp;{myPoint}</b>
        <ChargeBox>
          <ButtonBox>적립</ButtonBox>
          <ButtonBox>충전</ButtonBox>
        </ChargeBox>
      </InfoBox>
      <TitleBox>
        <b>사용내역</b>
      </TitleBox>
      <div className="mylist">
        <PointBox>
          <ListBox>
            <b>내용</b>
          </ListBox>
          <ListBox>
            <b>포인트</b>
          </ListBox>
          <ListBox>
            <b>날짜</b>
          </ListBox>
        </PointBox>
        {myPointList.map((point, index) => {
          return (
            <PointBox key={index}>
              <ListBox>{point.name} 구매</ListBox>
              <ListBox> -{point.point}P</ListBox>
              <ListBox>{point.createdDate}</ListBox>
            </PointBox>
          );
        })}
      </div>
    </div>
  );
}

const totalCSS = css`
  width: 100%;
  .mylist {
    height: 80vh;
    overflow-y: scroll;
    background-color: white;
  }
  .mylist::-webkit-scrollbar {
    display: none;
  }
`;
const InfoBox = styled.div`
  padding: 20px;
  padding-top: 100px;
  font-size: 30px;
  text-align: left;
`;

const PointBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const ListBox = styled.div`
  text-align: center;
  margin: 10px;
  width: 200px;
  word-break: keep-all;
`;

const TitleBox = styled.div`
  padding: 20px;
  text-align: left;
`;

const ButtonBox = styled.button`
  background-color: #b1bdbb;
  margin: 3px;
  width: 60px;
  height: 30px;
  font-size: 12px !important;
`;

const ChargeBox = styled.div`
  border: 1px solid
  display: flex;
  justify-content: flex-end;
  float: right;
`;

const ImgCss = css`
  transform: rotate(30deg);
`;
