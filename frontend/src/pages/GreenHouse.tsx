import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '../recoil/userRecoil';
import { css } from '@emotion/react';

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
  const [loading, setLoading] = useState<Boolean>(false);
  const [rollings, setRollings] = useState<IRolling[]>([]);
  const [tab, setTab] = useState<String>('내가 만든 꽃다발');
  const [tabNum, setTabNum] = useState<number>(1);
  const [sort, setSort] = useState<number>(1);
  const [paginationId, setPaginationId] = useState<number>(0);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);

  async function getRollings(sort: number): Promise<void> {
    setLoading(false);
    setTab('내가 만든 꽃다발'); //내가 만든 쿠키
    setTabNum(1);
    try {
      const params = { sort: sort, paginationId: paginationId };
      const res: any = await axios.get(
        `http://localhost:8080/api/v1/greenhouse/sent`,
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + userState.jwt,
          },
          params,
        },
      );
      console.log(res.data.response);
      setRollings(res.data.response);
      setLoading(true);
    } catch (err: any) {
      // console.log(err);
    }
  }
  async function getBookmarks(sort: number): Promise<void> {
    setLoading(false);
    setTab('즐겨찾기한 꽃다발');
    setTabNum(2);
    try {
      const params = { sort: sort, paginationId: paginationId };
      const res: any = await axios.get(
        `http://localhost:8080/api/v1/greenhouse/bookmark`,
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + userState.jwt,
          },
          params,
        },
      );
      console.log(res.data.response);
      setRollings(res.data.response);
      setLoading(true);
    } catch (err: any) {
      // console.log(err);
    }
  }

  function handleRollingPaper(url: string): void {
    navigate(`/rolling/${url}/1`);
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(+event.target.value);
    setPaginationId(1);
    if (tabNum === 1) {
      getRollings(+event.target.value);
    } else {
      getBookmarks(+event.target.value);
    }
  };

  return (
    <>
      <div>
        {tabNum === 1 ? (
          <div css={MainTab}>
            <button className="active_btn" onClick={() => getRollings(1)}>
              내가 만든 꽃다발
            </button>
            <button className="btn" onClick={() => getBookmarks(1)}>
              즐겨찾기
            </button>
          </div>
        ) : (
          <div css={MainTab}>
            <button className="btn" onClick={() => getRollings(1)}>
              내가 만든 꽃다발
            </button>
            <button className="active_btn" onClick={() => getBookmarks(1)}>
              즐겨찾기
            </button>
          </div>
        )}
      </div>
      <div css={SelectBtn}>
        <select className="dropdown" value={sort} onChange={handleChange}>
          <option value={1}>최신순</option>
          <option value={2}>오래된순</option>
        </select>
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
      <div css={BoxList}>
        {rollings.map((rolling: IRolling, index: number) => {
          return (
            <div css={Box} key={rolling.url}>
              <div css={ImageBox}>
                <a onClick={() => handleRollingPaper(rolling.url)}>
                  <img src={rolling.imgUrl} alt="롤링페이퍼 이미지" />
                </a>
              </div>
              <div css={InfoBox}>
                {rolling.title}
                {rolling.date}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const MainTab = css`
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    // margin: 0px 20px;
  }
  .active_btn {
    background-color: #16453e;
    width: 40%;
    color: white;
    margin: 30px 10px 10px 10px;

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
    margin: 30px 10px 10px 10px;

    &:hover {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
`;

const SelectBtn = css`
  display: flex;
  justify-content: end;
  padding: 0.5rem 1.5rem;
  margin-top: 0;
  select {
    margin-top: 0;
    border: 1px solid black;
  }
`;

const BoxList = css`
  display: flex;
`;

const Box = css`
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  height: 300px;
`;

const ImageBox = css`
  width: 100px;
`;

const InfoBox = css`
  width: 100px;
  text-align: center;
`;
