import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';
import rollingImgItem from '@assets/fixed-size/rolling/rollingImgItem';
import ItemLocked from '@assets/itemLocked.png';
import { css } from '@emotion/react';
import Coin from '@assets/coin.png';
import MySwal from '@components/SweetAlert';
import '@components/SweetAlert.css';

interface IItem {
  rollingId: number;
  imgUrl: string;
  isOwned: boolean;
}

export default function SelectItem() {
  const navigate = useNavigate();
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [createRollingState, setCreateRollingState] =
    useRecoilState<IcreateRollingRecoil>(createRollingRecoil);
  const [rollingImg, setRollingImg] = useState<string>(createRollingState.url);
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
      // console.log(res.data.response);
      setItems(res.data.response);
      if (createRollingState.url === '') {
        setRollingImg(rollingImgItem[0].img);
        setCreateRollingState((prev: IcreateRollingRecoil) => {
          const variable = { ...prev };
          variable.itemId = res.data.response[0].rollingId;
          variable.itemIndex = 0;
          variable.url = rollingImgItem[0].img;
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
      variable.url = rollingImgItem[e.target.id].img;
      return variable;
    });
    setRollingImg(rollingImgItem[e.target.id].img);
  };
  const cantSelect = (): void => {
    MySwal.fire({
      title: '상점에서 구매 후<br/>사용 가능합니다!',
      icon: 'warning',
      confirmButtonColor: '#16453e',
      confirmButtonText: '확인',
    });
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div css={Background}>
        {loading ? (
          <>
            <div css={Point}>
              <img src={Coin} css={PointImg} /> {userState.points}P
            </div>
            <div>
              <img src={rollingImg} alt="선택한 꽃 사진" css={SelectImage} />
              <div css={ItemZone}>
                {items.map((item: IItem, index) => {
                  return (
                    <div key={item.rollingId}>
                      {item.isOwned === true ? (
                        <div>
                          <img
                            src={rollingImgItem[index].img}
                            onClick={select}
                            id={String(index)}
                            css={OwnedItem}
                          />
                        </div>
                      ) : (
                        <div css={NotOwnedItem}>
                          <img
                            src={ItemLocked}
                            css={Locked}
                            onClick={cantSelect}
                          ></img>
                          <img
                            src={rollingImgItem[index].img}
                            onClick={cantSelect}
                            id={String(index)}
                            css={NotOwnedItemImg}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          '로딩중'
        )}
        <button onClick={handleSetTitle} css={NextButton}>
          다음
        </button>
      </div>
    </>
  );
}

const Background = css`
  width: 100vw;
`;

const Point = css`
  text-align: right;
  margin-top: 6vh;
  margin-right: 6vw;
`;

const PointImg = css`
  width: 3vw;
`;

const SelectImage = css`
  margin-top: 2vh;
  margin-bottom: 3vh;
  width: 150px;
  @media screen and (min-width: 400px) {
    width: 125px;
  }
  @media screen and (min-width: 500px) {
    width: 100px;
  }
`;

const ItemZone = css`
  background-color: white;
  width: 90%;
  height: 40vh;
  margin: 3vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: scroll;
`;

const OwnedItem = css`
  background-color: white;
  width: 90px;
  padding: 2vw;
  @media screen and (min-width: 400px) {
    width: 125px;
  }
  @media screen and (min-width: 500px) {
    width: 100px;
  }
`;

const NotOwnedItem = css`
  padding: 2vw;
  position: relative;
`;

const NotOwnedItemImg = css`
  width: 90px;
  background-color: white;
  @media screen and (min-width: 400px) {
    width: 125px;
  }
  @media screen and (min-width: 500px) {
    width: 100px;
  }
`;

const NextButton = css`
  margin-top: 3vh;
  height: 7vh;
  width: 94%;
  border-radius: 3vw;
  color: white;
  font-size: 4vw;
  background-color: #16453e;
  @media screen and (min-width: 1000px) {
    font-size: 20pt;
  }
`;

const Locked = css`
  position: absolute;
  width: 90px;
  @media screen and (min-width: 400px) {
    width: 125px;
  }
  @media screen and (min-width: 500px) {
    width: 100px;
  }
`;
