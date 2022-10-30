import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '../recoil/userRecoil';
export default function MyPointList() {
  const [pages, setPages] = useState(0);
  const [myPoint, setMyPoint] = useState(0);
  const [myPointList, setMyPointList] = useState([]);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);

  useEffect(() => {
    myPointListFunc();
  }, []);
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
      setMyPointList(res.data.response.myPointList);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <WholeBox>
      <InfoBox>
        <b>내 포인트 : {myPoint}P</b>
      </InfoBox>
      <div>
        <b>사용내역</b>
      </div>
      <ListBox>
        <b>내용</b>
      </ListBox>
      <ListBox>
        <b>포인트</b>
      </ListBox>
      <ListBox>
        <b>날짜</b>
      </ListBox>

      {myPointList.map((point, index) => {
        return (
          <PointBox key={index}>
            <ListBox>{point.name} 구매</ListBox>
            <ListBox> -{point.point}P</ListBox>
            <ListBox>{point.createdDate}</ListBox>
          </PointBox>
        );
      })}
    </WholeBox>
  );
}
const WholeBox = styled.div`
  width: 100%;
`;

const InfoBox = styled.div`
  margin-bottom: 100px;
  padding: 20px;
  text-align: left;
`;

const PointBox = styled.div`
  padding: 5px;
`;

const ListBox = styled.div`
  float: left;
  text-align: center;
  padding: 10px;
  margin: 5px;
  width: 100px;
`;
