import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import Modal from '@src/components/store/BuyModal';
import Receipt from '@src/components/store/Receipt';
import { Grid } from '@mui/material';
import itemLocked from '@assets/itemLocked.png';
import coin from '@assets/coin.png';
import rollingImgItem from '@assets/fixed-size/rolling/rollingImgItem';
import flowerImgItem from '@assets/fixed-size/flower/flowerImgItem';
import storeAPI from '@src/api/storeAPI';
import updateTokens from '@src/utils/updateTokens';
import { useNavigate } from 'react-router-dom';
import MySwal from '@components/SweetAlert';
import { Tooltip, Button, ClickAwayListener } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
interface FlowerItem {
  flowerId: number;
  name: string;
  point: number;
  flowerLanguage: string;
  season: string;
  price: number;
  imgUrl: string;
  imgBud: string;
  isOwned: boolean;
}

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

const Store = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const [buying, setBuying] = useState(false); // 구매하기 버튼 눌렀는지 여부
  const [flowerItemList, setFlowerItemList] = useState<FlowerItem[]>();
  const [rollingItemList, setRollingItemList] = useState<RollingItem[]>();
  const [isFlower, setIsFlower] = useState(false); // 탭이 꽃다발이면 false, 꽃이면 true
  const [isFlowerSelected, setIsFlowerSelected] = useState<boolean>(false);
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
  const handleBuying = () => {
    setBuying(true);
  };
  const setRolling = () => {
    setIsFlower(false);
  };
  const setFlower = () => {
    setIsFlower(true);
  };
  const toggleImg = (index: number) => {
    if (isFlower && flowerItemList) {
      setIsFlowerSelected(true);
      setSelectedImg(flowerImgItem[index].img);
      setFlowerName(flowerItemList[index].name);
      setFlowerLanguage(flowerItemList[index].flowerLanguage);
      setPoint(flowerItemList[index].point);
      setItemId(flowerItemList[index].flowerId);
      setOwned(flowerItemList[index].isOwned);
    } else if (!isFlower && rollingItemList) {
      setIsFlowerSelected(false);
      setSelectedImg(rollingImgItem[index].img);
      setFlowerName(rollingItemList[index].name);
      setFlowerLanguage('');
      setPoint(rollingItemList[index].point);
      setItemId(rollingItemList[index].rollingId);
      setOwned(rollingItemList[index].isOwned);
    }
  };
  const isOwned = (index: number): boolean => {
    if (isFlower && flowerItemList && flowerItemList[index]) {
      if (flowerItemList[index].isOwned) return true;
    } else if (!isFlower && rollingItemList && rollingItemList[index]) {
      if (rollingItemList[index].isOwned) return true;
    }
    return false;
  };

  function updateImgList() {
    let tmp: string[] = [];
    if (isFlower && flowerItemList) {
      flowerItemList.map((item: FlowerItem, index): void => {
        tmp.push(flowerImgItem[index].img);
      });
    } else if (rollingItemList) {
      rollingItemList.map((item: RollingItem, index): void => {
        tmp.push(rollingImgItem[index].img);
      });
    }
    setImgList(tmp);
  }

  const getFlowerList = () => {
    storeAPI
      .getFlowers(loginUser.jwt, loginUser.refresh)
      .then((res: any) => {
        setFlowerItemList(res.data.response);
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
              .getFlowers(accessToken, refreshToken)
              .then((res: any) => {
                setFlowerItemList(res.data.response);
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

  // 탭 바뀔 때마다 해당하는 품목 리스트 가져오기
  useEffect(() => {
    if (isFlower) {
      getFlowerList();
    } else {
      getRollingList();
    }
  }, [isFlower, loginUser.points]);

  // 품목 리스트 가져오면 이미지 배열 갱신
  useEffect(() => {
    setBuying(false);
    updateImgList();
  }, [flowerItemList, rollingItemList]);

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
            <img src={selectedImg} />
            <div css={flowerInfo}>
              <div>{flowerName}</div>
              <div>{flowerLanguage}</div>
            </div>
          </div>
        ) : null}
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
      <div css={tabs}>
        {isFlower ? (
          <div className="m_tabs">
            <button css={tabActive(false)} className="btn" onClick={setRolling}>
              꽃다발
            </button>
            <button
              css={tabActive(true)}
              className="active_btn"
              onClick={setFlower}
            >
              꽃
            </button>
          </div>
        ) : (
          <div className="m_tabs">
            <button
              css={tabActive(true)}
              className="active_btn"
              onClick={setRolling}
            >
              꽃다발
            </button>
            <button css={tabActive(false)} className="btn" onClick={setFlower}>
              꽃
            </button>
          </div>
        )}
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
                    onClick={() => toggleImg(index)}
                  />
                </div>
              ) : (
                <div css={GridStyle}>
                  <img className="item_image" src={image} />
                  <img
                    className="locked_image"
                    src={itemLocked}
                    onClick={() => toggleImg(index)}
                  />
                </div>
              )}
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="button-div">
        {selectedImg && !owned ? (
          <button css={BuyButton(owned)} type="button" onClick={handleBuying}>
            <span css={BuyText}>구매하기</span>
          </button>
        ) : (
          <button
            disabled
            css={BuyButton(owned)}
            type="button"
            onClick={handleBuying}
          >
            <span css={BuyText}>구매하기</span>
          </button>
        )}
        {buying && (
          <Modal
            closeModal={() => setBuying(!buying)}
            isFlower={isFlowerSelected}
            itemId={itemId}
            price={point}
            location={'store'}
            css={modal}
          >
            <Receipt points={loginUser.points} price={point} />
          </Modal>
        )}
      </div>
    </div>
  );
};

const modal = css`
  z-index: 800;
`;

const StoreDiv = css`
  width: 100vw;

  .button-div {
    height: 0px;
  }

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const points = css`
  /* width: 30%; */
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
    /* padding-top: 5px; */
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
  /* display: flex; */
  margin-top: 3vh;
  @media screen and (min-width: 500px) {
    padding: 0vh;
  }
`;
const empty = css`
  position: relative;
  /* padding: 10vw; */
  .tooltip {
    display: flex;
    justify-content: end;
    margin-bottom: 20px;
  }
  @media screen and (min-width: 500px) {
    padding: 0vh;
  }
`;

const selectBox = css`
  position: relative;
  margin-top: 60px;
`;
const GridContainer = css`
  width: 90%;
  aspect-ratio: 1/1;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  background-color: white;
  border-radius: 0 0 15px 15px;

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
      /* left: 0vw; */
      width: 80%;
    }
    .locked_image {
      z-index: 2;
      width: 85%;
      opacity: 100%;
      display: grid;
      left: 25px;
    }
  }
`;

const tabs = css`
  /* position: absolute; */
  height: 0px;
  .btn {
    cursor: pointer;
  }
  .active_btn {
    cursor: pointer;
  }
`;

const tabActive = (isActive: boolean) => css`
  position: relative;
  width: 45vw;
  height: 60px;
  border-radius: 15px 15px 0 0;
  border: none;
  background-color: ${isActive
    ? 'rgba(255,255,255,1)'
    : 'rgba(255,255,255,0.5)'};
  @media screen and (min-width: 500px) {
    width: 225px;
    height: 60px;
  }
`;

const BuyButton = (isOwned: boolean) => css`
  position: relative;
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
    margin-top: 30px;
    width: 450px;
    height: 60px;
  }
`;

const BuyText = css`
  color: white;
  font-size: 16px;
  /* margin-left: 30px;
  margin-right: 30px; */
`;

export default Store;
