import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
export default function MyDeliveryList() {
  const [pages, setPages] = useState(0);
  const [myList, setMyList] = useState([]);
  const [sortNumber, setSortNumber] = useState(1);

  const handleChange = (event) => {
    setSortNumber(event.target.value);
    deliveryListFunc(event.target.value);
  };
  useEffect(() => {
    deliveryListFunc(1);
  }, []);
  async function deliveryListFunc(sortNumber) {
    try {
      setSortNumber(sortNumber);
      const params = { sort: sortNumber, paginationId: pages };
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/mypage/delivery',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
          params,
        },
      );
      // console.log(res.data.response);
      setMyList(res.data.response);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div>
      <form>
        <DropDown value={sortNumber} onChange={handleChange}>
          <option value={1}>최신순</option>
          <option value={2}>오래된순</option>
        </DropDown>
      </form>
      {myList.map((deliver, index) => {
        return (
          <DevlieryBox key={index}>
            <ImagBox>
              <img
                src={deliver.imgUrl}
                alt="배송꽃다발이미지"
                height="100%"
              ></img>
            </ImagBox>
            <InfoBox>
              {deliver.date}
              <br />
              <b> {deliver.title}</b>
              <br />
              <Stack direction="row" spacing={1}>
                <Chip
                  label={deliver.status}
                  variant="outlined"
                  color="success"
                  size="small"
                />
              </Stack>
              <b>{deliver.flowerCount}</b> 개의 꽃송이 가격: {deliver.price}원{' '}
              <br />
            </InfoBox>
            <FromBox>
              <b>FROM </b>
              {deliver.sender}
              <br />
              <b> TO </b>
              {deliver.receiver} <br />
            </FromBox>
          </DevlieryBox>
        );
      })}
    </div>
  );
}

const DevlieryBox = styled.div`
  background-color: white;
  width: 100%;
`;

const ImagBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 20px;
  float: left;
`;

const InfoBox = styled.div`
  padding-top: 30px;
  margin: 20px;
  text-align: left;
`;

const FromBox = styled.div`
  margin-left: 50px;
  width: 100px;
  text-align: left;
`;

const DropDown = styled.select`
  bacground-color: transparent;
  border: none;
  margin-right: 10px;
  margin-top: 10px;
  padding: 5px;
`;
