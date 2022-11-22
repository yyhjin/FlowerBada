import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';
import rollingImgItem from '@assets/fixed-size/rolling/rollingImgItem';
import { css } from '@emotion/react';
import storeAPI from '@src/api/storeAPI';
import MySwal from '@components/SweetAlert';
import '@components/SweetAlert.css';
import updateTokens from '@src/utils/updateTokens';
import Modal from '@src/components/store/BuyModal';
import Receipt from '@src/components/store/Receipt';
import { Grid } from '@mui/material';
import itemLocked from '@assets/itemLocked.png';
import coin from '@assets/coin.png';
import { Tooltip, Button, ClickAwayListener } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface RollingItem {
  rollingId: number;
  name: string;
  capacity: number;
  point: number;
  price: number;
  imgUrl: string;
  imgFront: string;
  imgBack: string;
  isOwned: boolean;
}

interface IItem {
  rollingId: number;
  imgUrl: string;
  point: number;
  isOwned: boolean;
}

export default function SelectItem() {
  const navigate = useNavigate();
  const [items, setItems] = useState<IItem[]>([]);
  const [userState] = useRecoilState<IuserRecoil>(userReCoil);
  const [createRollingState, setCreateRollingState] =
    useRecoilState<IcreateRollingRecoil>(createRollingRecoil);
  const [selectIdx, setSelectIdx] = useState<number>(0);
  const [buying, setBuying] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const [rollingItemList, setRollingItemList] = useState<RollingItem[]>();
  const [imgList, setImgList] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>();
  const [flowerName, setFlowerName] = useState<string>();
  const [flowerLanguage, setFlowerLanguage] = useState<string>();
  const [point, setPoint] = useState<number>(0);
  const [itemId, setItemId] = useState<number>(0);
  const [owned, setOwned] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const toggleImg = (index: number) => {
    if (rollingItemList && rollingItemList[index]) {
      setSelectedImg(rollingImgItem[index].img);
      setFlowerName(rollingItemList[index].name);
      setFlowerLanguage('');
      setPoint(rollingItemList[index].point);
      setItemId(rollingItemList[index].rollingId);
      setOwned(rollingItemList[index].isOwned);
    }
  };
  const isOwned = (index: number): boolean => {
    if (rollingItemList && rollingItemList[index].isOwned) return true;
    return false;
  };

  function updateImgList() {
    let tmp: string[] = [];
    if (rollingItemList) {
      rollingItemList.map((item: RollingItem, index): void => {
        tmp.push(rollingImgItem[index].img);
      });
    }
    setImgList(tmp);
  }

  const getRollingList = () => {
    storeAPI
      .getRollings(loginUser.jwt, loginUser.refresh)
      .then((res: any) => {
        setRollingItemList(res.data.response);
      })
      .catch((err: any) => {
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
            storeAPI
              .getRollings(accessToken, refreshToken)
              .then((res: any) => {
                setRollingItemList(res.data.response);
              })
              .catch((err: any) => {
                console.log(err);
              });
          } else {
            console.log('No access or refresh token');
            navigate('/');
          }
        }
      });
  };

  useEffect(() => {
    getRollingList();
  }, [loginUser.points]);

  useEffect(() => {
    setBuying(false);
    updateImgList();
  }, [rollingItemList]);

  const select = (e: any): void => {
    setCreateRollingState((prev: IcreateRollingRecoil): any => {
      const variable = { ...prev };
      variable.itemId = items[e.target.id].rollingId;
      variable.itemIndex = e.target.id;
      variable.url = rollingImgItem[e.target.id].img;
      return variable;
    });
    setSelectIdx(e.target.id);
    toggleImg(e.target.id);
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
    toggleImg(e.target.id);
  };

  async function getItems(): Promise<void> {
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

  const handleBuying = () => {
    setBuying(true);
  };

  useEffect(() => {
    setBuying(false);
    getItems();
  }, [userState.points]);

  return (
    <div css={StoreDiv}>
      <div css={points}>
        <span className="points">
          <img src={coin} className="coinImg" />
          {loginUser.points}
        </span>
      </div>
      <div css={SelectedImgDiv}>
        {selectedImg ? (
          <div>
            <img src={createRollingState.url} />
            <div css={flowerInfo}>
              <div>{flowerName}</div>
              <div>{flowerLanguage}</div>
            </div>
          </div>
        ) : (
          <div>
            <img src={createRollingState.url} />
            <div css={flowerInfo}>
              <div>
                {rollingItemList && createRollingState.itemId > 0
                  ? rollingItemList[createRollingState.itemId - 1].name
                  : null}
              </div>
              <div>{flowerLanguage}</div>
            </div>
          </div>
        )}
      </div>
      <div css={empty}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div className="tooltip">
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="일반: 꽃 7개 / 고급: 꽃 8개 / 바구니: 꽃 10개"
            >
              <Button onClick={handleTooltipOpen}>
                <HelpOutlineIcon color="action"></HelpOutlineIcon>
              </Button>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </div>
      <div css={selectBox}>
        <Grid container columns={12} css={GridContainer}>
          {imgList.map((image: string, index: number) => (
            <Grid xs={4} item key={index}>
              {isOwned(index) ? (
                <div css={GridStyle}>
                  <img
                    className="item_image"
                    src={image}
                    onClick={select}
                    id={String(index)}
                  />
                </div>
              ) : (
                <div css={GridStyle}>
                  <img className="item_image" src={image} />
                  <img
                    className="locked_image"
                    src={itemLocked}
                    onClick={changeRolling}
                    id={String(index)}
                  />
                </div>
              )}
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="button-div">
        {isOwned(selectIdx) ? (
          <button
            css={BuyButton(selectedImg === '')}
            type="button"
            onClick={handleSetTitle}
          >
            <span css={BuyText}>다음{isOwned(selectIdx)}</span>
          </button>
        ) : (
          <button
            css={BuyButton(selectedImg === '')}
            type="button"
            onClick={handleBuying}
          >
            <span css={BuyText}>구매하기{isOwned(selectIdx)}</span>
          </button>
        )}
      </div>
      {buying && (
        <Modal
          closeModal={() => setBuying(!buying)}
          itemId={items[selectIdx].rollingId}
          price={items[selectIdx].point}
          location={'rolling'}
        >
          <Receipt points={userState.points} price={items[selectIdx].point} />
        </Modal>
      )}
    </div>
  );
}

const modal = css`
  z-index: 800;
`;

const StoreDiv = css`
  position: relative;
  width: 100vw;
  height: 100%;
  min-height: -webkit-fill-available;
  max-height: -webkit-fill-available;

  .button-div {
    height: 100px;
  }
`;

const points = css`
  height: 30px;
  position: relative;
  float: right;
  text-align: auto;
  margin: auto;
  padding-top: 10px;

  .coinImg {
    height: 20px;
    display: flex;
    text-align: auto;
    justify-content: center;
    padding-bottom: 2px;
    padding-right: 5px;
  }
  .points {
    display: flex;
    position: relative;
    float: right;
    right: 20px;
    text-align: left;
    font-size: 20px;
  }
`;

const SelectedImgDiv = css`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  div img {
    width: 160px;
    height: 160px;
  }
  padding-top: 3vh;
`;

const flowerInfo = css`
  margin-top: 3vh;
  @media screen and (min-width: 500px) {
    padding: 0vh;
  }
`;
const empty = css`
  position: relative;
  .tooltip {
    display: flex;
    justify-content: end;
  }
  @media screen and (min-width: 500px) {
    padding: 0vh;
  }
`;

const selectBox = css`
  position: relative;
  top: 50px;
`;

const GridContainer = css`
  width: 90%;
  aspect-ratio: 1/1;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const GridStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vw;

  .item_image {
    cursor: pointer;
    width: 20vw;
    position: absolute;
    margin-top: 3vw;
    margin-left: 3vw;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .locked_image {
    cursor: pointer;
    z-index: 2;
    width: 25vw;
    opacity: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  @media screen and (min-width: 500px) {
    height: 155px;
    .item_image {
      margin-top: 5px;
      margin-left: 0px;
      z-index: 1;
      width: 80%;
      cursor: pointer;
    }
    .locked_image {
      z-index: 2;
      width: 85%;
      opacity: 100%;
      display: grid;
      left: 25px;
      cursor: pointer;
    }
  }
`;

const BuyButton = (isOwned: boolean) => css`
  position: relative;
  margin-top: 70px;
  margin-bottom: 20px;
  top: 10px;
  left: 0;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  /* transition: border-color 0.25s; */
  background-color: ${!isOwned ? '#16453e' : '#9c9c9c'};
  width: 90%;
  height: 50px;
  @media screen and (min-width: 500px) {
    margin-top: 70px;
    margin-bottom: 45px;
    width: 450px;
    height: 60px;
  }
`;

const BuyText = css`
  color: white;
  font-size: 16px;
`;
