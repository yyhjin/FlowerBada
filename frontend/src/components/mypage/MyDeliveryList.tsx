import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';

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
    const scrollHeight = document.querySelector('.mylist')?.scrollHeight;
    const scrollTop = document.querySelector('.mylist')?.scrollTop;

    if (
      scrollTop &&
      scrollHeight &&
      Math.round(scrollTop + innerHeight) >= scrollHeight
    ) {
      deliveryListFunc(sortNumber);
    }
  }, [pages, myList]);

  useEffect(() => {
    deliveryListFunc(sortNumber);
  }, [sortNumber]);

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
        setMyList(myList.concat(res.data.response));
        setPages(pages + 1);
      }
    } catch (err: any) {
      // console.log(err);
    }
  }

  return (
    <div css={totalCSS}>
      <div css={selectBtn}>
        <select className="dropdown" value={sortNumber} onChange={handleChange}>
          <option value={1}>최신순</option>
          <option value={2}>오래된순</option>
        </select>
      </div>
      <div className="mylist">
        {myList.map((deliver, index) => {
          return (
            <div className="deliverybox" key={index}>
              <div className="imgbox">
                <a href={deliver.pageUrl}>
                  <img
                    src={deliver.imgUrl}
                    alt="배송꽃다발이미지"
                    height="100%"
                  ></img>
                </a>
              </div>
              <div className="infobox">
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
                <div className="smallinfobox">
                  <div>
                    <b>{deliver.flowerCount}</b> 개의 꽃송이
                  </div>
                  <div>가격: {deliver.price}원</div>
                </div>
              </div>
              <div className="frombox">
                <b>FROM &nbsp; </b>
                {deliver.sender}
                <br />
                <b>TO &nbsp; </b>
                {deliver.receiver} <br />
              </div>
            </div>
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

const totalCSS = css`
  .mylist {
    height: 80vh;
    overflow-y: scroll;
  }
  .mylist::-webkit-scrollbar {
    display: none;
  }
  .deliverybox {
    background-color: white;
    width: 100%;

    &:first-child > .infobox {
      margin-top: 0px;
    }
  }
  .imgbox {
    width: 100px;
    height: 100px;
    padding: 20px;
    margin-left: 20px;
    margin-top: 20px;
    float: left;
  }
  .infobox {
    padding-top: 30px;
    margin: 20px;
    margin-left: 200px;
    text-align: left;
  }
  .smallinfobox {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .frombox {
    margin-top: -10px;
    margin-left: 50px;
    width: 130px;
    text-align: left;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dropdown {
    background-color: transparent;
    outline: 0 none;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    padding: 5px;
  }
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
