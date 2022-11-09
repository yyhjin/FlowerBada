import React, { useEffect, useState, useCallback } from 'react';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import mypageAPI from '@src/api/mypageAPI';

interface IDeliver {
  pageUrl?: string;
  imgUrl?: string;
  date?: string;
  title?: string;
  status?: string;
  flowerCount?: number;
  price?: number;
  sender?: string;
  receiver?: string;
}

export default function MyDeliveryList() {
  const [pages, setPages] = useState<number>(0);
  const [myList, setMyList] = useState([]);
  const [sortNumber, setSortNumber] = useState(1);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortNumber(+event.target.value);
    setPages(0);
    setMyList([]);
    deliveryListFunc(+event.target.value);
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

  async function deliveryListFunc(sortNumber: number) {
    try {
      setSortNumber(sortNumber);
      const params = { sort: sortNumber, paginationId: pages };
      const res: any = await mypageAPI.getDelivery(userState.jwt, params);
      setMyList(myList.concat(res.data.response));
      setPages(pages + 1);
    } catch (err: any) {
      // console.log(err);
    }
  }

  return (
    <div css={outerBox}>
      <div css={selectBtn} className="dropdownBox">
        <select className="dropdown" value={sortNumber} onChange={handleChange}>
          <option value={1}>최신순</option>
          <option value={2}>오래된순</option>
        </select>
      </div>
      <div className="mylist">
        {myList.map((deliver: IDeliver, index: number) => {
          return (
            <div className="deliverybox" key={index}>
              <div className="imgbox">
                <a href={'/rolling/' + deliver.pageUrl}>
                  <img
                    src={deliver.imgUrl}
                    alt="배송꽃다발이미지"
                    height="100%"
                  ></img>
                </a>
              </div>
              <div className="infobox">
                <div className="dateAndTitle">
                  <ul>{deliver.date}</ul>
                  <ul css={title}>{deliver.title}</ul>
                  <div className="descAndPrice">
                    <div>{deliver.flowerCount}개의 꽃송이</div>
                    <div>결제 금액: {deliver.price}원</div>
                  </div>
                </div>
                <div className="deliveryState">
                  <div>{deliver.status}</div>
                </div>
                <div className="frombox">
                  <div>
                    FROM &nbsp;
                    {deliver.sender}
                  </div>
                  <div>
                    TO &nbsp;
                    {deliver.receiver}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const outerBox = css`
  position: absolute;
  .dropdownBox {
    position: relative;
  }
  .mylist {
    position: relative;
    height: calc(100vh - 132px);
    overflow-y: scroll;
  }
  .mylist::-webkit-scrollbar {
    display: none;
  }
  .deliverybox {
    position: relative;
  }
  .imgbox {
    width: 80px;
    height: 80px;
    position: relative;
    display: inline-block;
    float: left;
    padding: 10px;
  }
  .dateAndTitle {
    position: relative;
    display: inline-block;
    width: calc(100vw - 100px);
    height: 100px;
  }
  .dateAndTitle > ul {
    margin: 5px 0 0 5px;
    padding: 0px;
    font-size: 12px;
  }
  .deliveryState {
    color: #699877;
    float: right;
    font-size: 12px;
    margin-right: 10px;
    width: 100px;
    text-align: end;
  }
  .infobox {
    text-align: left;
    margin-bottom: 20px;
    background-color: white;
    padding: 10px 0px;
  }
  .descAndPrice {
    display: flex;
    justify-content: space-between;
    margin: 5px 10px 0 5px;
    font-size: 12px;
  }
  .frombox {
    margin-left: 20px;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 12px;
    width: calc(100vw - 130px);
  }
`;

const selectBtn = css`
  /* position: relative; */
  width: 100vw;
  height: 30px;
  text-align: end;
  margin-top: 5px;

  select {
    margin-right: 10px;
    border: none;
    background-color: transparent;
    width: 100px;
  }
  option {
    font-size: 12px;
  }
`;

const title = css`
  font-size: 16px !important;
`;

const ChipCss = css`
  /* width: 60px;
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
  } */
`;
