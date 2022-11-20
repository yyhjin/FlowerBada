import { useEffect, useState, useCallback } from 'react';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import mypageAPI from '@src/api/mypageAPI';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, MenuItem, ThemeProvider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MySwal from '@components/SweetAlert';
import updateTokens from '@utils/updateTokens';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [pages, setPages] = useState<number>(0);
  const [myList, setMyList] = useState<IDeliver[]>([]);
  const [sortNumber, setSortNumber] = useState(1);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSortNumber(+event.target.value);
    setPages(0);
    setMyList([]);
    setIsFetching(false);
    deliveryListFunc(+event.target.value);
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
      const res: any = await mypageAPI.getDelivery(
        userState.jwt,
        userState.refresh,
        params,
      );
      if (res.data.response.length == 0) {
        setIsFetching(true);
      }
      setMyList(myList.concat(res.data.response));
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
          setSortNumber(sortNumber);
          const params = { sort: sortNumber, paginationId: pages };
          const res: any = await mypageAPI.getDelivery(
            accessToken,
            refreshToken,
            params,
          );
          if (res.data.response.length == 0) {
            setIsFetching(true);
          }
          setMyList(myList.concat(res.data.response));
          setPages(pages + 1);
        }
      }
    }
  }

  return (
    <div css={outerBox}>
      <div css={selectBtn} className="dropdownBox">
        <ThemeProvider theme={theme}>
          <FormControl
            sx={{
              mt: 1,
              minWidth: 100,
            }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={String(sortNumber)}
              onChange={handleChange}
              css={SelectCSS}
              variant="standard"
              disableUnderline
            >
              <MenuItem value={'1'} css={Font}>
                최신순
              </MenuItem>
              <MenuItem value={'2'} css={Font}>
                오래된순
              </MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
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

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#848484',
    },
    neutral: {
      main: '#B1BDBB',
    },
  },
});
const outerBox = css`
  position: absolute;
  .dropdownBox {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: calc(100vw - 12px);
    margin: 6px;
  }
  .mylist {
    position: relative;
    height: calc(100vh - 150px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .mylist::-webkit-scrollbar {
    width: 3px;
    background-color: #ffffff;
  }

  .mylist::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: rgba(0, 0, 0, 0.25);
  }
  .deliverybox {
    position: relative;
    width: 90%;
    margin-left: 5%;
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
    width: calc(100% - 30px);
    height: 100px;
    padding: 0 15px 0 15px;

    ul {
      margin: 0px;
    }
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
    margin-right: 20px;
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
    margin: 5px;
    font-size: 12px;
  }
  .frombox {
    margin-left: 20px;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 12px;
    width: 120px;
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
const Font = css`
  font-family: 'SeoulNamsanM';
  height: 20px;
  margin-top: 6px;
  margin-bottom: 6px;
`;

const SelectCSS = css`
  padding-bottom: 10px;
`;
