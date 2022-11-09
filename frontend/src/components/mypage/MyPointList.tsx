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
        <div className="pointTitle">현재 포인트</div>
        <img src={CoinImg} width="25px" className="imgcss"></img>
        <span> {myPoint}</span>
      </div>
      <div className="titlebox">사용 내역</div>
      <div className="mylist">
        <div className="innerbox">
          <div className="datebox">날짜</div>
          <div className="contentbox">내용</div>
          <div className="pointbox">포인트</div>
        </div>
        {myPointList.map((point: IPoint, index: number) => {
          return (
            <div className="valuebox" key={index}>
              <div className="datebox">
                {point.createdDate.split(' ')[0].replaceAll('-', '.')}
              </div>
              <div className="contentbox">{point.name} 구매</div>
              <div className="pointbox"> -{point.point}P</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const totalCSS = css`
  .mylist {
    background-color: white;
    overflow-y: scroll;
  }
  .mylist::-webkit-scrollbar {
    display: none;
  }
  .infobox {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
    .pointTitle {
      font-size: 12px;
    }
  }
  /* .outerbox {
    background-color: white;
    height: calc(100vh - 208px);
    overflow-y: scroll;
    .outerbox::-webkit-scrollbar {
      display: none;
    }
  } */
  .titlebox {
    padding: 10px;
    text-align: left;
    background-color: #f2f0ef;
  }
  .innerbox {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    text-align: center;
    margin: 10px;
  }
  .valuebox {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    text-align: center;
    margin: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .datebox {
    width: 20vw;
    min-width: 60px;
  }
  .contentbox {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pointbox {
    width: 15vw;
    min-width: 30px;
  }
`;
