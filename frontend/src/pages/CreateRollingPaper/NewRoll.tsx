import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '../../recoil/userRecoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '../../recoil/createRollingRecoil';

export default function NewRoll() {
  sessionStorage.setItem('url', '/newroll');
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [createRollingState, setCreateRollingState] =
    useRecoilState<IcreateRollingRecoil>(createRollingRecoil);
  async function getItems() {
    setLoading(false);
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/store/rolling',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + userState.jwt,
          },
        },
      );
      console.log(res.data.response);
      setItems(res.data.response);
      if (createRollingState.url === '') {
        setCreateRollingState((prev: IcreateRollingRecoil) => {
          const variable = { ...prev };
          variable.itemId = res.data.response[0].rollingId;
          variable.itemIndex = 0;
          variable.url = res.data.response[0].imgUrl;
          return variable;
        });
      }
      setLoading(true);
    } catch (err: any) {
      console.log(err);
    }
  }
  const handleSetTitle = async () => {
    console.log(createRollingState);
    try {
      navigate('/settitle');
    } catch (err: any) {
      console.log(err);
    }
  };
  const select = (e) => {
    setCreateRollingState((prev: IcreateRollingRecoil) => {
      const variable = { ...prev };
      variable.itemId = items[e.target.id].rollingId;
      variable.itemIndex = e.target.id;
      variable.url = items[e.target.id].imgUrl;
      return variable;
    });
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
            <div>{createRollingState.url}</div>
            <div>
              {items.map((item, index) => {
                return (
                  <ul key={item.rollingId}>
                    {item.isOwned === true ? (
                      <div>
                        <li onClick={select} id={index}>
                          {item.imgUrl}
                        </li>
                      </div>
                    ) : (
                      <div>
                        <li onClick={cnatSelect} id={index}>
                          {item.imgUrl}
                        </li>
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
      <button onClick={handleSetTitle}>제목 정하기</button>
    </>
  );
}
