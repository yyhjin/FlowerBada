import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SelectItem() {
  sessionStorage.setItem('url', '/selectitem');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectId, setSelectId] = useState();
  const [selectIndex, setSelectIndex] = useState();
  const [selectUrl, setSelectUrl] = useState();
  async function getItems() {
    setLoading(false);
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/store/rolling',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
        },
      );
      console.log(res.data.response);
      setItems(res.data.response);
      setSelectId(res.data.response[0].rollingId);
      setSelectIndex(0);
      setSelectUrl(res.data.response[0].imgUrl);
      if (sessionStorage.getItem('selectIndex') !== null) {
        setSelectIndex(sessionStorage.getItem('selectIndex'));
        setSelectId(sessionStorage.getItem('selectId'));
        setSelectUrl(sessionStorage.getItem('selectUrl'));
      }
      setLoading(true);
    } catch (err: any) {
      console.log(err);
    }
  }
  const handleMainPage = async () => {
    sessionStorage.removeItem('selectId');
    sessionStorage.removeItem('selectIndex');
    sessionStorage.removeItem('selectUrl');
    sessionStorage.removeItem('title');
    sessionStorage.removeItem('date');
    try {
      navigate('/');
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleSetTitle = async () => {
    sessionStorage.setItem('selectId', selectId);
    sessionStorage.setItem('selectIndex', selectIndex);
    sessionStorage.setItem('selectUrl', selectUrl);
    try {
      navigate('/settitle');
    } catch (err: any) {
      console.log(err);
    }
  };
  const select = (e) => {
    setSelectId(items[e.target.id].rollingId);
    setSelectUrl(items[e.target.id].imgUrl);
    setSelectIndex(e.target.id);
    console.log(items[e.target.id].rollingId);
  };
  const cnatSelect = () => {
    alert('이건 돈 내고 사서 써야 됨!');
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div>템 선택</div>
      <div>
        {loading ? (
          <div>
            <div>{selectUrl}</div>
            <div>
              {items.map((item, index) => {
                return (
                  <ul key={item.rollingId}>
                    {item.isOwned === true ? (
                      <div>
                        <li onClick={select} id={index}>
                          {item.imgUrl}
                        </li>
                        <li> {item.name}</li>
                        <li>{item.point}</li>
                        <li>{item.price}</li>
                      </div>
                    ) : (
                      <div>
                        <li onClick={cnatSelect} id={index}>
                          {item.imgUrl}
                        </li>
                        <li> {item.name}</li>
                        <li>{item.point}</li>
                        <li>{item.price}</li>
                      </div>
                    )}
                  </ul>
                );
              })}
            </div>
          </div>
        ) : (
          '로딩중'
        )}
      </div>
      <button onClick={handleMainPage}>메인 가기</button>
      <button onClick={handleSetTitle}>제목 정하기</button>
    </>
  );
}
