import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '../recoil/userRecoil';
export default function MyDeliveryList() {
  const [pages, setPages] = useState<number>(0);
  const [myList, setMyList] = useState([]);
  const [sortNumber, setSortNumber] = useState(1);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const handleChange = (event) => {
    setSortNumber(event.target.value);
    setPages(0);
    setMyList([]);
    deliveryListFunc(event.target.value);
  };

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      deliveryListFunc(sortNumber);
    }
  }, [pages, myList]);

  useEffect(() => {
    deliveryListFunc(sortNumber);
  }, [sortNumber]);

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  async function deliveryListFunc(sortNumber) {
    try {
      setSortNumber(sortNumber);
      const params = { sort: sortNumber, paginationId: pages };
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/mypage/delivery',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + userState.jwt,
          },
          params,
        },
      );
      if (res.data.response.length !== 0) {
        console.log(res.data.response);
        setMyList(myList.concat(res.data.response));
        setPages(pages + 1);
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div>
      <div css={selectBtn}>
        <DropDown value={sortNumber} onChange={handleChange}>
          <option value={1}>최신순</option>
          <option value={2}>오래된순</option>
        </DropDown>
      </div>
      <div css={myListCSS}>
        {myList.map((deliver, index) => {
          return (
            <DevlieryBox key={index}>
              <ImagBox>
                <a href={deliver.pageUrl}>
                  <img
                    src={deliver.imgUrl}
                    alt="배송꽃다발이미지"
                    height="100%"
                  ></img>
                </a>
              </ImagBox>
              <InfoBox className="infobox">
                {deliver.date}
                <br />
                <b> {deliver.title}</b>
                <br />
                <br />
                <div css={ChipCss}>
                  {'결제완료' == deliver.status ? (
                    <div className="cash">{deliver.status}</div>
                  ) : (
                    <span></span>
                  )}
                  {'배송중' == deliver.status ? (
                    <div className="Ing">{deliver.status}</div>
                  ) : (
                    <span></span>
                  )}
                  {'배송완료' == deliver.status ? (
                    <div className="Finished">{deliver.status}</div>
                  ) : (
                    <span></span>
                  )}
                </div>
                <SmallInfoBox>
                  <FontBox>
                    <b>{deliver.flowerCount}</b> 개의 꽃송이
                  </FontBox>{' '}
                  <FontBox>가격: {deliver.price}원</FontBox>
                </SmallInfoBox>
              </InfoBox>
              <FromBox>
                <b>FROM &nbsp; </b>
                {deliver.sender}
                <br />
                <b>TO &nbsp; </b>
                {deliver.receiver} <br />
              </FromBox>
            </DevlieryBox>
          );
        })}
      </div>
    </div>
  );
}

const selectBtn = css`
  display: flex;
  justify-content: end;
  padding: 0.5rem 1.5rem;
  margin-top: 0;
  select {
    margin-top: 0;
    border: 1px solid black;
  }
`;

const myListCSS = css``;

const DevlieryBox = styled.div`
  background-color: white;
  width: 100%;

  &:first-child > .infobox {
    margin-top: 0px;
  }
`;

const ImagBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  float: left;
`;

const InfoBox = styled.div`
  padding-top: 30px;
  margin: 20px;
  margin-left: 200px;
  text-align: left;
`;

const SmallInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const FontBox = styled.div``;

const FromBox = styled.div`
  margin-top: -10px;
  margin-left: 50px;
  width: 130px;
  text-align: left;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropDown = styled.select`
  background-color: transparent;
  outline: 0 none;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  padding: 5px;
`;

const ChipCss = css`
  width: 60px;
  height: 24px;
  padding: 1px;
  margin: 4px 0px 4px;
  text-align: center;
  font-size: 12px;
  .cash {
    color: red;
    border: 1px solid red;
    border-radius: 0.5rem;
  }
  .Ing {
    border: 1px solid orange;
    color: orange;
    border-radius: 0.5rem;
  }
  .Finished {
    border: 1px solid green;
    color: green;
    border-radius: 0.5rem;
  }
`;

const DropDownCss = css`
  display: flex;
  justify-content: flex-;
`;
