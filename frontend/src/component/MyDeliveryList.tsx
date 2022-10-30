import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
export default function MyDeliveryList() {
  const [pages, setPages] = useState(0);
  const [myList, setMyList] = useState([]);
  const [sortNumber, setSortNumber] = useState(1);

  const handleChange = (event: SelectChangeEvent) => {
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
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={sortNumber}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{ float: 'right' }}
        >
          <MenuItem value={1}>
            <em>최신순</em>
          </MenuItem>
          <MenuItem value={2}>오래된순</MenuItem>
        </Select>
      </FormControl>
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
            <Stack direction="row" spacing={1}>
              <Chip label={deliver.status} variant="outlined" color="success" />
            </Stack>
            <InfoBox>
              {deliver.date}
              <br />
              <b> {deliver.title}</b>
              <br />
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
    </>
  );
}

const DevlieryBox = styled.div`
  background-color: white;
`;

const ImagBox = styled.div`
  border-radius: 30px;
  border: 4px solid #ffecec;
  width: 100px;
  height: 100px;
  padding: 20px;
  float: left;
`;

const InfoBox = styled.div`
  margin: 20px;
  text-align: left;
`;

const FromBox = styled.div`
  margin-left: 50px;
  width: 100px;
  text-align: left;
`;
