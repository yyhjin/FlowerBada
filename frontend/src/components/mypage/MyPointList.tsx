import { useEffect, useState, useCallback } from 'react';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import CoinImg from '@assets/coin.png';
import mypageAPI from '@src/api/mypageAPI';

interface IPoint {
  name: string;
  point: number;
  createdDate: string;
}

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
      const res: any = await mypageAPI.getPointList(userState.jwt, params);
      setMyPoint(res.data.response.myPoint);
      if (res.data.response.myPointList.length !== 0) {
        setMyPointList(myPointList.concat(res.data.response.myPointList));
        setPages(pages + 1);
      }
    } catch (err: any) {
      // console.log(err);
    }
  }

  return (
    <div css={totalCSS}>
      <div className="infobox">
        <img
          src={CoinImg}
          width="25px"
          className="
        imgcss"
        ></img>
        <b>&nbsp;{myPoint}</b>
        <div className="chargebox">
          <button className="buttonbox">적립</button>
          <button className="buttonbox">충전</button>
        </div>
      </div>
      <div className="titlebox">
        <b>사용내역</b>
      </div>
      <div className="mylist">
        <div className="pointbox">
          <div className="listbox">
            <b>내용</b>
          </div>
          <div className="listbox">
            <b>포인트</b>
          </div>
          <div className="listbox">
            <b>날짜</b>
          </div>
        </div>
        {myPointList.map((point: IPoint, index: number) => {
          return (
            <div className="pointbox" key={index}>
              <div className="listbox">{point.name} 구매</div>
              <div className="listbox"> -{point.point}P</div>
              <div className="listbox">{point.createdDate}</div>
            </div>
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
  .infobox {
    padding: 20px;
    padding-top: 100px;
    font-size: 30px;
    text-align: left;
  }
  .pointbox {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  .listbox {
    text-align: center;
    margin: 10px;
    width: 200px;
    word-break: keep-all;
  }
  .titlebox {
    padding: 20px;
    text-align: left;
  }
  .buttonbox {
    background-color: #b1bdbb;
    margin: 3px;
    width: 60px;
    height: 30px;
    font-size: 12px !important;
  }
  .chargebox {
    display: flex;
    justify-content: flex-end;
    float: right;
  }
`;
