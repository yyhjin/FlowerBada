import storeAPI from '@api/storeAPI';
import React from 'react';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import CoinImg from '@assets/coin.png';
import itemLocked from '@assets/itemLocked.png';
import MessageWrite from '@components/message/MessageWrite';
import Modal from '@src/components/store/BuyModal';
import Receipt from '@src/components/store/Receipt';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import updateTokens from '@utils/updateTokens';
import { useNavigate } from 'react-router-dom';
import MySwal from '@components/SweetAlert';

interface IFlower {
  flowerId?: number;
  name?: number;
  point?: string;
  flowerLanguage?: string;
  season?: number;
  price?: string;
  imgUrl?: string;
  imgBud?: string;
  isOwned?: boolean;
}

export default function MessageCreate() {
  const navigate = useNavigate();
  const [flowerId, setFlowerId] = useState<number>(0); // 클릭한 꽃 번호
  const [flowerIdx, setFlowerIdx] = useState<number>(0); // 클릭한 꽃 인덱스
  const [flowerList, setFlowerList] = useState<IFlower[]>([]);
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const [SelectedFlower, setSelectedFlower] = useState<number>(0); // 선택 완료한 꽃 번호
  const [buying, setBuying] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setFlowerId(0);
    setFlowerIdx(0);
    setSelectedFlower(0);
    setBuying(false);

    location.state as { rollingId: number; rollingUrl: string };
    storeAPI
      .getFlowers(loginUser.jwt, loginUser.refresh)
      .then((res) => {
        setFlowerList(res.data.response);
      })
      .catch((err) => {
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
              .then((res) => {
                setFlowerList(res.data.response);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log('No access or refresh token');
            navigate('/');
          }
        }
      });
  }, []);

  const changeFlower = (param: any, index: number) => {
    setFlowerId(param);
    setFlowerIdx(index);
  };

  const changeSelect = (param: any) => {
    setSelectedFlower(param);
  };

  const handleBuying = () => {
    if (loginUser.jwt === '') {
      MySwal.fire({
        title: '로그인 후<br/>구매 가능합니다!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    } else {
      setBuying(true);
    }
  };

  return (
    <div css={outerBox}>
      <div css={PointBox}>
        <span className="point-css">
          <img src={CoinImg} className="coin-img"></img>
          <b>{loginUser.points}</b>
        </span>
      </div>
      <div css={DetailBox}>
        {flowerId != 0 ? (
          <>
            <img
              src={'/src/assets/' + flowerList[flowerId - 1].imgUrl}
              height="50%"
            ></img>
            <div className="flower-name">
              <b>{flowerList[flowerId - 1].name}</b>
            </div>
            <div className="flower-language">
              {flowerList[flowerId - 1].flowerLanguage}
            </div>
          </>
        ) : (
          <>
            <div>꽃을 선택해주세요</div>
          </>
        )}
      </div>
      {SelectedFlower == 0 ? (
        <>
          <div css={selectBox}>
            <Grid container columns={12} css={GridContainer}>
              {flowerList.map((flower, i) => (
                <Grid xs={4} item key={i}>
                  {flower.isOwned ? (
                    <div css={GridStyle}>
                      <img
                        className="item-image"
                        src={'/src/assets/' + flower.imgUrl}
                        key={flower.flowerId}
                        onClick={() => changeFlower(flower.flowerId, i)}
                      ></img>
                    </div>
                  ) : (
                    <div css={GridStyle}>
                      <img
                        className="item-image"
                        src={'/src/assets/' + flower.imgUrl}
                        key={flower.flowerId}
                      ></img>
                      <img
                        className="locked-image"
                        src={itemLocked}
                        onClick={() => changeFlower(flower.flowerId, i)}
                      />
                    </div>
                  )}
                </Grid>
              ))}
            </Grid>
          </div>
          <div css={ButtonBox}>
            {flowerList.length > 0 && flowerList[flowerIdx].isOwned ? (
              <>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    css={MainButton}
                    onClick={() => changeSelect(flowerId)}
                  >
                    다음
                  </Button>
                </ThemeProvider>
              </>
            ) : (
              <>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    css={MainButton}
                    onClick={handleBuying}
                  >
                    구매
                  </Button>
                </ThemeProvider>
              </>
            )}
          </div>

          {buying && (
            <Modal
              closeModal={() => setBuying(!buying)}
              isFlower={true}
              itemId={flowerId}
              price={flowerList[flowerIdx].point}
              location={'message'}
            >
              <Receipt
                points={loginUser.points}
                price={flowerList[flowerIdx].point}
              />
            </Modal>
          )}
        </>
      ) : (
        <MessageWrite
          flower={flowerId}
          rolling={location.state.rollingId}
          rollingUrl={location.state.rollingUrl}
        ></MessageWrite>
      )}
    </div>
  );
}

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#16453E',
    },
    neutral: {
      main: '#B1BDBB',
    },
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}

const outerBox = css`
  width: 100vw;
  height: 100%;
  @media screen and (min-width: 500px) {
    height: 80%;
  }
`;

const DetailBox = css`
  height: 80vw;
  /* margin: 0 auto; */
  .flower-name {
    font-size: 1.2em;
    margin-top: 1vh;
    margin-bottom: 1vh;
    height: auto;
  }

  .flower-language {
    font-size: 0.7em;
    height: auto;
  }
  @media screen and (min-width: 500px) {
    height: 80%;
    /* margin-bottom: 0vh; */
  }
`;

const ButtonBox = css`
  height: 20vw;
  /* margin-top: 2vw; */
  /* margin-bottom: 2vw; */
  position: relative;
`;

const MainButton = css`
  width: 90%;
  /* margin-top: 0.5vh; */
  margin-bottom: 20px;
  top: 10px;
  padding: 1.5vh;
  border-radius: 10px;
  font-size: 1em;
  transform: translate(0, 25%);
  font-family: 'SeoulNamsanM';
`;

const PointBox = css`
  /* padding: 5vw 5vw 3vw 0;
  font-size: 5vw;
  margin-bottom: 1vh;
  text-align: right; */
  width: 100%;
  position: relative;
  float: right;
  text-align: auto;
  margin: auto;
  padding: 2vw;

  .coin-img {
    /* width: 4vw; */
    height: 16px;
    display: flex;
    text-align: auto;
    justify-content: center;
    padding-bottom: 2px;
    padding-right: 5px;
  }
  .point-css {
    /* margin-bottom: 20px; */
    display: flex;
    position: relative;
    float: right;
    right: 20px;
    text-align: left;
    font-size: 15px;
  }
`;

const selectBox = css`
  position: relative;
`;

const GridContainer = css`
  width: 90%;
  aspect-ratio: 1/1;
  overflow-x: hidden;
  overflow-y: auto;
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

  .item-image {
    z-index: 1;
    width: 20vw;
    position: absolute;
    margin-top: 3vw;
    margin-left: 3vw;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .locked-image {
    z-index: 2;
    cursor: pointer;
    width: 25vw;
    opacity: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 500px) {
    height: 155px;
    .item-image {
      margin-top: 5px;
      margin-left: 0px;
      z-index: 1;
      left: 1vw;
      width: 80%;
    }
    .locked-image {
      z-index: 2;
      width: 85%;
      opacity: 100%;
      display: grid;
      left: 0.8vw;
    }
  }
`;
