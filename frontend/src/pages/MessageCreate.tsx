import axios from 'axios';
import React from 'react';
import { IuserRecoil, userReCoil } from '../recoil/userRecoil';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Button, IconButton } from '@mui/material';
import CoinImg from '@assets/coin.png';
import MessageWrite from '@components/message/MessageWrite';

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
  let [flowerId, setFlowerId] = useState<number>(0);
  let [flowerList, setFlowerList] = useState<IFlower[]>([]);
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);
  let [SelectedFlower, setSelectedFlower] = useState<number>(0);

  useEffect(() => {
    setFlowerId(0);
    setSelectedFlower(0);
    const url = `http://localhost:8080/api/v1/store/flower`;
    axios
      .get(url, {
        headers: {
          'X-AUTH-TOKEN': `Bearer ` + loginUser.jwt,
        },
      })
      .then((res) => {
        setFlowerList(res.data.response);
        console.log(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeFlower = (param: any) => {
    setFlowerId(param);
  };

  const changeSelect = (param: any) => {
    setSelectedFlower(param);
  };

  return (
    <>
      <div css={PointBox}>
        <img src={CoinImg} className="imgcss"></img>
        <b>&nbsp;{loginUser.points}</b>
      </div>
      <div css={DetailBox}>
        {flowerId != 0 ? (
          <>
            <img src={flowerList[flowerId - 1].imgUrl} height="60%"></img>
            <div className={'FlowerContent'}>
              <div className="FlowerName">
                <b>{flowerList[flowerId - 1].name}</b>
              </div>
              <div className="FlowerLanguage">
                {flowerList[flowerId - 1].flowerLanguage}
              </div>
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
          <div css={FlowerItemBox}>
            {flowerList.map((flower, i) => (
              <img
                src={flowerList[i].imgUrl}
                className="FlowerItem"
                key={flower.flowerId}
                onClick={() => changeFlower(flower.flowerId)}
              ></img>
            ))}
          </div>
          <div css={ButtonBox}>
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
          </div>
        </>
      ) : (
        <MessageWrite flower={flowerId}></MessageWrite>
      )}
    </>
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

const FlowerItemBox = css`
  background-color: white;
  margin: 1vw 5vw 5vw 5vw;
  height: 45%;
  overflow-y: scroll;

  .FlowerItem {
    margin: 3vh 1vh 0 1vh;
    width: 25%;
  }
`;

const DetailBox = css`
  height: 30%;

  .FlowerContent {
    width: 100%;
    height: 100%;
  }
  .FlowerName {
    font-size: 2.5vh;
    /* margin-top: 1vh; */
    margin-bottom: 1.5vh;
    height: auto;
  }

  .FlowerLanguage {
    font-size: 1.75vh;
    height: auto;
  }
`;

const ButtonBox = css`
  height: 15%;
  position: relative;
`;

const MainButton = css`
  width: 90%;
  /* margin-top: 0.5vh; */
  margin-bottom: 1vh;
  padding: 1vh;
  border-radius: 10px;
  font-size: 2vh;
  transform: translate(0, 25%);
`;

const PointBox = css`
  padding: 5vw 5vw 3vw 0;
  font-size: 5vw;
  margin-bottom: 1vh;
  text-align: right;

  .imgcss {
    transform: rotate(30deg);
    width: 4vw;
  }
  .pointcss {
    /* margin-bottom: 20px; */
  }
`;
