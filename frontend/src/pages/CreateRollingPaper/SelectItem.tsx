import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';
import rollingImgItem from '@assets/fixed-size/rolling/rollingImgItem';
import ItemLocked from '@assets/itemLocked.png';
import { css } from '@emotion/react';
import Coin from '@assets/coin.png';
import storeAPI from '@src/api/storeAPI';
import MySwal from '@components/SweetAlert';
import '@components/SweetAlert.css';
import updateTokens from '@src/utils/updateTokens';
import Modal from '@src/components/store/BuyModal';
import Receipt from '@src/components/store/Receipt';

interface IItem {
  rollingId: number;
  imgUrl: string;
  point: number;
  isOwned: boolean;
}

export default function SelectItem() {
  const navigate = useNavigate();
  const setLoginUser = useSetRecoilState<IuserRecoil>(userReCoil);
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userState] = useRecoilState<IuserRecoil>(userReCoil);
  const [createRollingState, setCreateRollingState] =
    useRecoilState<IcreateRollingRecoil>(createRollingRecoil);
  const [selectIdx, setSelectIdx] = useState<number>(0);
  const [buying, setBuying] = useState<boolean>(false);

  async function getItems(): Promise<void> {
    setLoading(false);
    try {
      const res: any = await storeAPI.getRollings(
        userState.jwt,
        userState.refresh,
      );
      setItems(res.data.response);
      if (createRollingState.url === '') {
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
      if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
        MySwal.fire({
          title: '로그인이 필요합니다!',
          icon: 'warning',
          confirmButtonColor: '#16453e',
          confirmButtonText: '확인',
        });
        setLoginUser((prev: IuserRecoil) => {
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
          updateTokens(accessToken, refreshToken, setLoginUser);
          try {
            const res: any = await storeAPI.getRollings(
              accessToken,
              refreshToken,
            );
            setItems(res.data.response);
            if (createRollingState.url === '') {
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
            console.log(err);
          }
        } else {
          console.log('No access or refresh token');
          navigate('/');
        }
      }
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
    setSelectIdx(e.target.id);
  };

  const changeRolling = (e: any): void => {
    setCreateRollingState((prev: IcreateRollingRecoil): any => {
      const variable = { ...prev };
      variable.itemId = items[e.target.id].rollingId;
      variable.itemIndex = e.target.id;
      variable.url = rollingImgItem[e.target.id].img;
      return variable;
    });
    setSelectIdx(e.target.id);
  };

  const handleBuying = () => {
    setBuying(true);
  };

  useEffect(() => {
    setBuying(false);
    getItems();
  }, [userState.points]);

  return (
    <>
      <div css={Background}>
        {loading ? (
          <>
            <div css={Point}>
              <img src={Coin} css={PointImg} /> {userState.points}P
            </div>
            <div>
              <img
                src={createRollingState.url}
                alt="선택한 꽃 사진"
                css={SelectImage}
              />
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
                            id={String(index)}
                            onClick={changeRolling}
                          ></img>
                          <img
                            src={rollingImgItem[index].img}
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
        {items.length > 0 && items[selectIdx].isOwned ? (
          <button onClick={handleSetTitle} css={NextButton}>
            다음
          </button>
        ) : (
          <button onClick={handleBuying} css={NextButton}>
            구매
          </button>
        )}
        {buying && (
          <Modal
            closeModal={() => setBuying(!buying)}
            isFlower={false}
            itemId={items[selectIdx].rollingId}
            price={items[selectIdx].point}
            location={'rolling'}
          >
            <Receipt points={userState.points} price={items[selectIdx].point} />
          </Modal>
        )}
      </div>
    </>
  );
}

const Background = css`
  width: 100vw;
  position: relative;
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
