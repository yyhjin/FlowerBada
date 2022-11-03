import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';

interface IItem {
  rollingId: number;
  imgUrl: string;
  isOwned: boolean;
}

export default function SelectItem() {
  const navigate = useNavigate();
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [createRollingState, setCreateRollingState] =
    useRecoilState<IcreateRollingRecoil>(createRollingRecoil);
  async function getItems(): Promise<void> {
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
      // console.log(err);
    }
  }
  const handleSetTitle = (): void => {
    navigate('/newroll/title');
  };
  const select = (e: any): void => {
    setCreateRollingState((prev: IcreateRollingRecoil): any => {
      const variable = { ...prev };
      variable.itemId = items[e.target.id].rollingId;
      variable.itemIndex = e.target.id;
      variable.url = items[e.target.id].imgUrl;
      return variable;
    });
  };
  const cantSelect = (): void => {
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
            <img src={createRollingState.url} />
            <div>
              {items.map((item: IItem, index) => {
                return (
                  <ul key={item.rollingId}>
                    {item.isOwned === true ? (
                      <div>
                        <li onClick={select} id={String(index)}>
                          {item.imgUrl}
                        </li>
                      </div>
                    ) : (
                      <div>
                        <li onClick={cantSelect} id={String(index)}>
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
