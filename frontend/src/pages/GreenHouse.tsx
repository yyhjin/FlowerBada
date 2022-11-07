import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import greenhouseAPI from '@api/greenhouseAPI';
import { css } from '@emotion/react';
import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
  const [tab, setTab] = useState<String>('내가 만든 꽃다발');
  const [tabNum, setTabNum] = useState<number>(1);
  const [sort, setSort] = useState<string>('1');
  const [paginationId, setPaginationId] = useState<number>(0);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);

  function initRollings() {
    setPaginationId(0);
    setRollings([]);
    setTabNum(1);
  }

  function initBookmarks() {
    setPaginationId(0);
    setRollings([]);
    setTabNum(2);
  }

  async function getRollings(sort: number): Promise<void> {
    // setLoading(false);
    setTab('내가 만든 꽃다발');
    try {
      const params = { sort: sort, paginationId: paginationId };
      const res: any = await greenhouseAPI.sentRolling(userState.jwt, params);

      setLoading(true);
      setRollings(rollings.concat(res.data.response));
      setPaginationId(paginationId + 1);
    } catch (err: any) {
      // console.log(err);
    }
  }
  async function getBookmarks(sort: number): Promise<void> {
    // setLoading(false);
    setTab('즐겨찾기한 꽃다발');
    try {
      const params = { sort: sort, paginationId: paginationId };
      const res: any = await greenhouseAPI.bookmark(userState.jwt, params);
      // console.log(res.data.response);
      setRollings(res.data.response);
      setLoading(true);
      setPaginationId(paginationId + 1);
    } catch (err: any) {
      // console.log(err);
    }
  }

  function handleRollingPaper(url: string): void {
    navigate(`/rolling/${url}/1`);
  }

  // 드랍다운 필터 관련
  const handleChange = (event: SelectChangeEvent) => {
    setPaginationId(0);
    setRollings([]);
    setSort(event.target.value);
  };

  const handleScroll = useCallback((): void => {
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
  }, [paginationId, rollings]);

  useEffect(() => {
    // scroll event listener 등록
    const event = document.querySelector('.gridlist');
    if (event) {
      event.addEventListener('scroll', handleScroll);
      return () => {
        // scroll event listener 해제
        event.removeEventListener('scroll', handleScroll);
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
      <div>
        {tabNum === 1 ? (
          <div css={MainTab}>
            <button className="active_btn">내가 만든 꽃다발</button>
            <button className="btn" onClick={() => initBookmarks()}>
              즐겨찾기
            </button>
          </div>
        ) : (
          <div css={MainTab}>
            <button className="btn" onClick={() => initRollings()}>
              내가 만든 꽃다발
            </button>
            <button className="active_btn">즐겨찾기</button>
          </div>
        )}
      </div>
      <div css={SelectBtn}>
        {/* <select className="dropdown" value={sort} onChange={handleChange}>
          <option value={1}>최신순</option>
          <option value={2}>오래된순</option>
        </select> */}
        <ThemeProvider theme={theme}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={sort}
              onChange={handleChange}
              css={Font}
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
      {loading ? (
        <div>
          {rollings && rollings.length && rollings.length === 0
            ? `${tab}이 없습니다`
            : ''}
        </div>
      ) : (
        <div> 로딩중 </div>
      )}
      <Grid container columns={8} css={GridList} className="gridlist">
        {rollings.map((rolling: IRolling, index: number) => (
          <Grid xs={4} item key={index}>
            <div css={GridItem} onClick={() => handleRollingPaper(rolling.url)}>
              <img className="rolling_img" src={rolling.imgUrl} />
              <div className="rolling_title">{rolling.title}</div>
              <div className="rolling_date">({rolling.date})</div>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
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

const MainTab = css`
  width: 100vw;
  margin-top: 5em;

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
    /* height: 4em; */

    /* margin: 30px 10px 10px 10px; */

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
  height: 55%;
  overflow: scroll;
  margin: auto;
  border-radius: 15px;
  overflow-y: scroll;
  margin-top: 2vh;
`;

const GridItem = css`
  position: relative;

  .rolling_img {
    width: 80%;
    padding-top: 30px;
  }

  .rolling_title {
    font-size: 15px;
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
  /* padding: 0.5rem; */
  /* margin-top: 0; */
  select {
    margin-top: 0;
    border: 1px solid black;
  }
`;

const Font = css`
  font-family: 'SeoulNamsanM';
`;
