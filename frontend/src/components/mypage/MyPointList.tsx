import { useEffect, useState, useCallback } from 'react';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import CoinImg from '@assets/coin.png';
import mypageAPI from '@src/api/mypageAPI';
import MySwal from '@components/SweetAlert';
import { useNavigate } from 'react-router-dom';
import updateTokens from '@utils/updateTokens';
import { Tooltip, Button, ClickAwayListener } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
interface IPoint {
  name: string;
  point: number;
  createdDate: string;
}

export default function MyPointList() {
  const navigate = useNavigate();
  const [pages, setPages] = useState(0);
  const [myPoint, setMyPoint] = useState(0);
  const [myPointList, setMyPointList] = useState([]);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const scrollHeight = document.querySelector('.mylist')?.scrollHeight;
    const scrollTop = document.querySelector('.mylist')?.scrollTop;

    if (
      !isFetching &&
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
      const res: any = await mypageAPI.getPointList(
        userState.jwt,
        userState.refresh,
        params,
      );
      setMyPoint(res.data.response.myPoint);
      setMyPointList(myPointList.concat(res.data.response.myPointList));
      if (res.data.response.myPointList.length == 0) {
        setIsFetching(true);
      }
      setPages(pages + 1);
    } catch (err: any) {
      if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
        MySwal.fire({
          title: '로그인이 필요합니다!',
          icon: 'warning',
          confirmButtonColor: '#16453e',
          confirmButtonText: '확인',
        }).then(() => {
          navigate('/');
        });
        setUserState((prev: IuserRecoil) => {
          const variable = { ...prev };
          variable.id = 0;
          variable.userToken = '';
          variable.nickname = '';
          variable.points = 0;
          variable.jwt = '';
          variable.refresh = '';
          return variable;
        });
      } else {
        let accessToken: string = err.response.headers.get('x-auth-token');
        let refreshToken: string = err.response.headers.get('refresh-token');
        if (accessToken && refreshToken) {
          accessToken = accessToken.split(' ')[1];
          refreshToken = refreshToken.split(' ')[1];
          updateTokens(accessToken, refreshToken, setUserState);
          const params = { paginationId: pages };
          const res: any = await mypageAPI.getPointList(
            accessToken,
            refreshToken,
            params,
          );
          setMyPoint(res.data.response.myPoint);
          setMyPointList(myPointList.concat(res.data.response.myPointList));
          if (res.data.response.myPointList.length == 0) {
            setIsFetching(true);
          }
          setPages(pages + 1);
        }
      }
    }
  }
  return (
    <div css={totalCSS}>
      <div className="infobox">
        <div className="pointTitle">현재 포인트</div>
        <img src={CoinImg} width="25px" className="imgcss"></img>
        <span> {myPoint}</span>
      </div>
      <div className="tooltipBox">
        <div className="tooltip">
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="매일 로그인 시 10P 적립"
            >
              <Button onClick={handleTooltipOpen}>
                <HelpOutlineIcon color="action"></HelpOutlineIcon>
              </Button>
            </Tooltip>
          </ClickAwayListener>
        </div>
      </div>
      <div className="titlebox">사용 내역</div>
      <div className="innerbox">
        <div className="datebox">날짜</div>
        <div className="contentbox">내용</div>
        <div className="pointbox">포인트</div>
      </div>
      <div className="mylist">
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
  .tooltipBox {
    display: flex;
    justify-content: end;
    .tooltip {
      width: 10%;
      margin-top: -15vw;
      margin-right: 28vw;
    }
    @media screen and (min-width: 500px) {
      .tooltip {
        margin-top: -67px;
        margin-right: 150px;
      }
    }
  }

  .mylist {
    height: calc(100vh - 300px);
    background-color: white;
    overflow-y: auto;
  }

  .mylist::-webkit-scrollbar {
    width: 3px;
    background-color: #b1bdbb;
  }

  .mylist::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: #16453e;
  }

  .infobox {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
    .pointTitle {
      font-size: 12px;
    }
  }

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
    padding: 6px;
    background-color: white;
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
    width: 20%;
    min-width: 60px;
  }
  .contentbox {
    width: 65%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pointbox {
    width: 15%;
    min-width: 30px;
  }
`;
