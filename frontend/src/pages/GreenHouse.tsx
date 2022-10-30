import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GreenHouse() {
  sessionStorage.setItem('url', '/greenhouse');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rollings, setRollings] = useState([]);
  const [tab, setTab] = useState('내가 만든 꽃다발');

  async function getRollings() {
    setLoading(false);
    setTab('내가 만든 꽃다발');
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/greenhouse/sent',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
        },
      );
      console.log(res.data.response);
      setRollings(res.data.response);
      setLoading(true);
    } catch (err: any) {
      console.log(err);
    }
  }
  async function getBookmarks() {
    setLoading(false);
    setTab('즐겨찾기한 꽃다발');
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/greenhouse/bookmark',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
        },
      );
      console.log(res.data.response);
      setRollings(res.data.response);
      setLoading(true);
    } catch (err: any) {
      console.log(err);
    }
  }
  const handleRollingPaper = async (e) => {
    try {
      navigate(`/rollingpaper/${e.target.id}/1`);
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleMainPage = async () => {
    try {
      navigate('/');
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRollings();
  }, []);
  return (
    <>
      <div>GreenHouse</div>
      <div>
        <button onClick={handleMainPage}>뒤로 가기</button>
        <button onClick={getRollings}>내가 만든 꽃다발</button>
        <button onClick={getBookmarks}>즐겨찾기</button>
        {loading ? (
          <div>{rollings.length === 0 ? `${tab}이 없습니다` : ''}</div>
        ) : (
          <div> 로딩중 </div>
        )}
        {rollings.map((rolling) => {
          return (
            <ul key={rolling.url}>
              <li onClick={handleRollingPaper} id={rolling.url}>
                url {rolling.url}
              </li>
              <li>title {rolling.title}</li>
              <li>imgUrl {rolling.imgUrl}</li>
              <li>date {rolling.date}</li>
            </ul>
          );
        })}
      </div>
    </>
  );
}
