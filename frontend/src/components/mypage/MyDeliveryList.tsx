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
      if (res.data.response.length !== 0) {
        // console.log(res.data.response.length);

        setMyList(myList.concat(res.data.response));
        setPages(pages + 1);
      }
    } catch (err: any) {
      // console.log(err);
    }
  }

  return (
    <div css={outerBox}>
      <div css={selectBtn}>
        <select className="dropdown" value={sortNumber} onChange={handleChange}>
          <option value={1} className="dropdownOp">
            최신순
          </option>
          <option value={2} className="dropdownOp">
            오래된순
          </option>
        </select>
      </div>
      <div css={innerBox} className="mylist">
        {myList.map((deliver: IDeliver, index: number) => {
          return (
            <div className="deliverybox" key={index}>
              <div className="imgbox" css={imgBox}>
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

// const totalCSS = css`
//   .mylist {
//     height: 80vh;
//     overflow-y: scroll;
//   }
//   .mylist::-webkit-scrollbar {
//     display: none;
//   }
//   .deliverybox {
//     background-color: white;
//     width: 100vh;

//     &:first-of-type > .infobox {
//       margin-top: 0px;
//     }
//   }
//   .imgbox {
//     width: 100px;
//     height: 100px;
//     padding: 20px;
//     margin-left: 20px;
//     margin-top: 20px;
//     float: left;
//   }
//   .infobox {
//     padding-top: 30px;
//     margin: 20px;
//     margin-left: 200px;
//     text-align: left;
//   }
//   .smallinfobox {
//     display: flex;
//     justify-content: space-between;
//     font-size: 14px;
//   }
//   .frombox {
//     margin-top: -10px;
//     margin-left: 50px;
//     width: 130px;
//     text-align: left;
//     font-size: 10px;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
//   .dropdown {
//     background-color: transparent;
//     outline: 0 none;
//     border: none;
//     border-radius: 4px;
//     margin-top: 10px;
//     padding: 5px;
//   }
// `;

const outerBox = css`
  background-color: red;
  position: relative;
  width: 100vw;
`;

const selectBtn = css`
  background-color: pink; // TO BE DELETED
  /* position: absolute; */
  width: 100px;
  height: 25px;
  position: relative;
  display: flex;
  justify-content: right;
  /* right: 0; */
  /* padding: 10px; */ /* margin-top: 0; */
  /* select {
    height: 25px;
    margin-right: 10px;
    border: none;
    background-color: transparent;
    position: absolute;
    width: 100px;
  } */

  select {
    display: none;
  }

  select-selected {
    background-color: dodgerblue;
  }

  /* .dropdownOp {
    background-color: green;
    /* position: absolute; */
    left: 0;
    margin-left: 0;
    height: 50px;
    font-size: 10px;
    border: none;
  } */
`;

const innerBox = css`
  background-color: lightblue;
  position: absolute;
  width: 100%;
  top: 25px;
`;

const imgBox = css`
  background-color: yellow;

  img {
    width: 30%;
  }
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
