import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import greenhouseAPI from '@api/greenhouseAPI';
import { css } from '@emotion/react';
import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MySwal from '@components/SweetAlert';
import updateTokens from '@utils/updateTokens';

interface IRolling {
  url: string;
  imgUrl: string;
  title: string;
  date: string;
}

export default function GreenHouse() {
  sessionStorage.setItem('url', '/greenhouse');
  useEffect(() => {
    getRollings(1);
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(true);
  const [rollings, setRollings] = useState<IRolling[]>([]);
  const [bookmarks, setBookmarks] = useState<IRolling[]>([]);
  const [tab, setTab] = useState<String>('내가 만든 꽃다발');
  const [tabNum, setTabNum] = useState<number>(1);
  const [sort, setSort] = useState<string>('1');
  const [rPaginationId, setRPaginationId] = useState<number>(0);
  const [bPaginationId, setBPaginationId] = useState<number>(0);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [isFetching, setIsFetching] = useState(false);
  const timer = useRef<number | null>(null);

  function initRollings() {
    setTab('내가 만든 꽃다발');
    setRPaginationId(0);
    setRollings([]);
    setTabNum(1);
    setIsFetching(false);
  }

  function initBookmarks() {
    setTab('즐겨찾기한 꽃다발');
    setBPaginationId(0);
    setBookmarks([]);
    setTabNum(2);
    setIsFetching(false);
  }

  async function getRollings(sort: number): Promise<void> {
    // setLoading(false);
    if (!isFetching) {
      try {
        const params = { sort: sort, paginationId: rPaginationId };
        const res: any = await greenhouseAPI.sentRolling(
          userState.jwt,
          userState.refresh,
          params,
        );
        // console.log(res.data.response.length);
        if (res.data.response.length == 0) {
          setIsFetching(true);
        }
        setLoading(true);
        setRollings(rollings.concat(res.data.response));
        setRPaginationId(rPaginationId + 1);
      } catch (err: any) {
        if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
          MySwal.fire({
            title: '로그인이 필요합니다!',
            icon: 'warning',
            confirmButtonColor: '#16453e',
            confirmButtonText: '확인',
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
          navigate('/');
        } else {
          let accessToken: string = err.response.headers.get('x-auth-token');
          let refreshToken: string = err.response.headers.get('refresh-token');
          if (accessToken && refreshToken) {
            accessToken = accessToken.split(' ')[1];
            refreshToken = refreshToken.split(' ')[1];
            updateTokens(accessToken, refreshToken, setUserState);
            MySwal.fire({
              title: '액세스 토큰이 만료되었습니다!',
              icon: 'warning',
              confirmButtonColor: '#16453e',
              confirmButtonText: '갱신',
            });
            navigate('/');
          }
        }
      }
    }
  }
  async function getBookmarks(sort: number): Promise<void> {
    // setLoading(false);
    setTab('즐겨찾기한 꽃다발');
    if (!isFetching) {
      try {
        const params = { sort: sort, paginationId: bPaginationId };
        const res: any = await greenhouseAPI.bookmark(
          userState.jwt,
          userState.refresh,
          params,
        );
        // console.log(res.data.response.length);
        if (res.data.response.length === 0) {
          setIsFetching(true);
        }
        setLoading(true);
        setBookmarks(bookmarks.concat(res.data.response));
        setBPaginationId(bPaginationId + 1);
      } catch (err: any) {
        if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
          MySwal.fire({
            title: '로그인이 필요합니다!',
            icon: 'warning',
            confirmButtonColor: '#16453e',
            confirmButtonText: '확인',
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
          navigate('/');
        } else {
          let accessToken: string = err.response.headers.get('x-auth-token');
          let refreshToken: string = err.response.headers.get('refresh-token');
          if (accessToken && refreshToken) {
            accessToken = accessToken.split(' ')[1];
            refreshToken = refreshToken.split(' ')[1];
            updateTokens(accessToken, refreshToken, setUserState);
            MySwal.fire({
              title: '액세스 토큰이 만료되었습니다!',
              icon: 'warning',
              confirmButtonColor: '#16453e',
              confirmButtonText: '갱신',
            });
            navigate('/');
          }
        }
      }
    }
  }

  function handleRollingPaper(url: string): void {
    navigate(`/rolling/${url}`);
  }

  // 드랍다운 필터 관련
  const handleChange = (event: SelectChangeEvent) => {
    setBPaginationId(0);
    setRPaginationId(0);
    setRollings([]);
    setBookmarks([]);
    setSort(event.target.value);
    setIsFetching(false);
  };

  const handleScroll = useCallback((): void => {
    // console.log('핸들스크롤');

    const { innerHeight } = window;
    const scrollHeight = document.querySelector('.gridlist')?.scrollHeight;
    const scrollTop = document.querySelector('.gridlist')?.scrollTop;

    if (
      scrollTop &&
      scrollHeight &&
      Math.round(scrollTop + innerHeight) >= scrollHeight
    ) {
      if (tabNum === 1) {
        getRollings(+sort);
      } else {
        getBookmarks(+sort);
      }
    }
  }, [bPaginationId, rPaginationId, rollings, bookmarks]);

  const throttleScroll = () => {
    if (timer.current === null) {
      timer.current = window.setTimeout(() => {
        handleScroll();
        timer.current = null;
      }, 300);
    }
  };

  useEffect(() => {
    // console.log('유즈이펙트');
    // scroll event listener 등록
    const event = document.querySelector('.gridlist');
    if (event) {
      event.addEventListener('scroll', throttleScroll);
      return () => {
        // scroll event listener 해제
        event.removeEventListener('scroll', throttleScroll);
      };
    }
  }, [handleScroll]);

  useEffect(() => {
    if (tabNum === 1) {
      getRollings(+sort);
    } else {
      getBookmarks(+sort);
    }
  }, [sort, tabNum]);

  return (
    <>
      <div css={totalCSS}>
        <div>
          {tabNum === 1 ? (
            <div css={MainTab}>
              <button className="active_btn">내가 만든 꽃다발</button>
              <button className="btn" onClick={initBookmarks}>
                즐겨찾기
              </button>
            </div>
          ) : (
            <div css={MainTab}>
              <button className="btn" onClick={initRollings}>
                내가 만든 꽃다발
              </button>
              <button className="active_btn">즐겨찾기</button>
            </div>
          )}
        </div>
        <div css={SelectBtn}>
          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={sort}
                onChange={handleChange}
                css={Font}
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
        <div className="item-box">
          {loading ? (
            <div>
              {rollings && rollings.length && rollings.length === 0
                ? `${tab}이 없습니다`
                : ''}
            </div>
          ) : (
            <div> 로딩중 </div>
          )}
          {tabNum === 1 ? (
            <Grid container columns={8} css={GridList} className="gridlist">
              {rollings.map((rolling: IRolling, index: number) => (
                <Grid xs={4} item key={index}>
                  <div
                    css={GridItem}
                    onClick={() => handleRollingPaper(rolling.url)}
                  >
                    {rolling.imgUrl.charAt(67) === 'r' ? (
                      <div className="rolling-items">
                        <div className="rolling_img_zone">
                          <img
                            className="rolling_img_after"
                            src={rolling.imgUrl}
                          />
                        </div>
                        <div className="rolling-text">
                          <div className="rolling_title">{rolling.title}</div>
                          <div className="rolling_date">({rolling.date})</div>
                        </div>
                      </div>
                    ) : (
                      <div className="rolling-items">
                        <div className="rolling_img_zone">
                          <img
                            className="rolling_img_before"
                            src={rolling.imgUrl}
                          />
                        </div>
                        <div className="rolling-text">
                          <div className="rolling_title">{rolling.title}</div>
                          <div className="rolling_date">({rolling.date})</div>
                        </div>
                      </div>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container columns={8} css={GridList} className="gridlist">
              {bookmarks.map((rolling: IRolling, index: number) => (
                <Grid xs={4} item key={index}>
                  <div
                    css={GridItem}
                    onClick={() => handleRollingPaper(rolling.url)}
                  >
                    {rolling.imgUrl.charAt(67) === 'r' ? (
                      <div className="rolling-items">
                        <div className="rolling_img_zone">
                          <img
                            className="rolling_img_after"
                            src={rolling.imgUrl}
                          />
                        </div>
                        <div className="rolling-text">
                          <div className="rolling_title">{rolling.title}</div>
                          <div className="rolling_date">({rolling.date})</div>
                        </div>
                      </div>
                    ) : (
                      <div className="rolling-items">
                        <div className="rolling_img_zone">
                          <img
                            className="rolling_img_before"
                            src={rolling.imgUrl}
                          />
                        </div>
                        <div className="rolling-text">
                          <div className="rolling_title">{rolling.title}</div>
                          <div className="rolling_date">({rolling.date})</div>
                        </div>
                      </div>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </>
  );
}

const totalCSS = css`
  .item-box {
    height: 70vh;

    .gridlist {
      overflow-y: auto;
      overflow-x: none;

      &::-webkit-scrollbar {
        width: 3px;
        background-color: #ffffff;
      }

      &::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

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

const MainTab = css`
  width: 100vw;
  margin-top: 4rem;

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em;
    font-size: 1em;
    font-weight: 500;
    font-family: 'SeoulNamsanM';
    cursor: pointer;
    transition: border-color 0.25s;
    margin: 20px 10px 10px 10px;
    word-break: keep-all;
    line-height: 1.3;
    vertical-align: middle;
    height: 4em;
  }
  .active_btn {
    background-color: #16453e;
    width: 40%;
    /* height: 4em; */
    color: white;
    /* margin: 30px 10px 10px 10px; */

    &:hover {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
  .btn {
    background-color: #b1bdbb;
    width: 40%;

    &:hover {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
`;

const GridList = css`
  width: 80%;
  height: 90%;
  margin: auto;
  border-radius: 15px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 2vh;

  @media screen and (min-height: 800px) {
    height: 90%;
  }
  @media screen and (min-height: 1000px) {
    height: 90%;
  }
`;

const GridItem = css`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  height: 40vw;
  @media screen and (min-width: 500px) {
    height: 200px;
  }

  .rolling-items {
    /* height: 300px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .rolling_img_zone {
    display: flex;
    justify-content: center;
    width: 80%;
    height: auto;
    overflow: hidden;
  }
  .rolling_img_before {
    margin-top: 5%;
    left: 0;
    width: 90%;
  }
  .rolling_img_after {
    margin-top: -35%;
    /* position: absolute; */
    left: 0;
    width: 85%;
  }

  &:hover,
  &:active {
    transform: scale(1.05, 1.05);
    transition: all ease 0.2s;
    cursor: pointer;
  }

  .rolling-text {
    position: absolute;
    bottom: 0;
    align-items: center;
    z-index: 500;
  }

  .rolling_title {
    font-size: 15px;
    float: center;
    font-family: 'SeoulNamsanM';
  }
  .rolling_date {
    font-size: 12px;
    font-family: 'SeoulNamsanM';
  }
`;

const SelectBtn = css`
  text-align: right;
  justify-content: end;
  margin-right: 1em;
  select {
    margin-top: 0;
    border: 1px solid black;
  }
`;

const Font = css`
  font-family: 'SeoulNamsanM';
`;
