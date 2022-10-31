import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
export default function GreenHouse() {
  sessionStorage.setItem('url', '/greenhouse');
  useEffect(() => {
    getRollings(1);
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rollings, setRollings] = useState([]);
  const [tab, setTab] = useState('내가 만든 꽃다발');
  const [sort, setSort] = useState(1);
  const [paginationId, setPaginationId] = useState(0);

  async function getRollings(sort) {
    setLoading(false);
    setTab('내가 만든 꽃다발'); //내가 만든 쿠키
    try {
      const params = { sort: sort, paginationId: paginationId };
      const res: any = await axios.get(
        `http://localhost:8080/api/v1/greenhouse/sent`,
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
          params,
        },
      );
      console.log(res.data.response);
      setRollings(res.data.response);
      setLoading(true);
    } catch (err: any) {
      console.log(err);
    }
  }
  async function getBookmarks(sort) {
    setLoading(false);
    setTab('즐겨찾기한 꽃다발');
    try {
      const params = { sort: sort, paginationId: paginationId };
      const res: any = await axios.get(
        `http://localhost:8080/api/v1/greenhouse/bookmark`,
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
          params,
        },
      );
      console.log(res.data.response);
      setRollings(res.data.response);
      setLoading(true);
    } catch (err: any) {
      console.log(err);
    }
  }
  function handleRollingPaper(url) {
    try {
      navigate(`/rollingpaper/${url}/1`);
    } catch (err: any) {
      console.log(err);
    }
  }
  const handleMainPage = async () => {
    try {
      navigate('/');
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <button onClick={handleMainPage}>뒤로 가기</button>
        <button onClick={() => getRollings(1)}>
          내가 만든 꽃다발( 최신순)
        </button>
        <button onClick={() => getRollings(2)}>
          내가 만든 꽃다발(오래된순)
        </button>
        <button onClick={() => getBookmarks(1)}>즐겨찾기(최신순)</button>
        <button onClick={() => getBookmarks(2)}>즐겨찾기(오래된순)</button>
        {loading ? (
          <div>{rollings.length === 0 ? `${tab}이 없습니다` : ''}</div>
        ) : (
          <div> 로딩중 </div>
        )}
        <BoxList>
          {rollings.map((rolling) => {
            return (
              <Box key={rolling.url}>
                <ImageBox>
                  <a onClick={() => handleRollingPaper(rolling.url)}>
                    <img src={rolling.imgUrl} alt="롤링페이퍼 이미지" />
                  </a>
                </ImageBox>
                <InfoBox>
                  {rolling.title}
                  {rolling.date}
                </InfoBox>
              </Box>
            );
          })}
        </BoxList>
      </div>
    </>
  );
}
const BoxList = styled.div`
  display: flex;
`;
const Box = styled.div`
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  height: 300px;
`;
const ImageBox = styled.div`
  width: 100px;
`;

const InfoBox = styled.div`
  width: 100px;
  text-align: center;
`;
