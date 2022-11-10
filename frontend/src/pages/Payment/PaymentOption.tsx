import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '@components/mypage/Message';
import type { IRolling, IMessage } from '@pages/RollingPaper';
import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

const PaymentOption = () => {
  const [optionType, setOptionType] = useState<string>('default');
  const navigate = useNavigate();
  const location = useLocation();

  location.state as { rolling: IRolling; type: number; valid: Boolean };
  const { rolling, type, valid } = location.state;

  const selectOption = (e: SelectChangeEvent) => {
    setOptionType(e.target.value);
  };

  const onClickNext = () => {
    navigate(`/payment/address/receiver`);
  };

  const goBack = () => {
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };

  return (
    <div css={OptionCSS}>
      <div className="img-preview">
        <div className={`imgbox_${type}`}>
          <img src={'/src/assets/' + rolling.imgBack}></img>
        </div>
        <div className="flowerlist">
          {rolling.messages.map((message: IMessage, index: number) => {
            return (
              <div key={index} className={`flowerbox_${type}`}>
                <Message
                  imgUrl={message.imgUrl}
                  messageId={message.messageId}
                  writer={message.writer}
                  valid={valid}
                  writerDisplay={false}
                ></Message>
              </div>
            );
          })}
        </div>
        <div className={`imgbox_front_${type}`}>
          <img src={'/src/assets/' + rolling.imgFront}></img>
        </div>
      </div>
      <div css={SelectBtn}>
        <p>주문 옵션 :</p>
        <ThemeProvider theme={theme}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={optionType}
              onChange={selectOption}
              css={SelectCSS}
            >
              <MenuItem value={'default'} css={Font}>
                선택해주세요
              </MenuItem>
              <MenuItem value={'rollingPaperOnly'} css={Font}>
                롤링페이퍼
              </MenuItem>
              <MenuItem value={'flowerOnly'} css={Font}>
                꽃
              </MenuItem>
              <MenuItem value={'both'} css={Font}>
                롤링페이퍼 + 꽃
              </MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      </div>
      <div>가격</div>
      <div className="option-buttons">
        <button onClick={onClickNext}>받는 분 정보 입력하러 가기</button>
        <button onClick={goBack}>롤링페이퍼로 돌아가기</button>
      </div>
    </div>
  );
};

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#848484',
    },
    neutral: {
      main: '#B1BDBB',
    },
  },
});

const OptionCSS = css`
  .img-preview {
    width: 50%;
    height: 50%;
  }

  .option-buttons {
    display: flex;
    flex-direction: column;
  }
  .imgbox_1,
  .imgbox_2 {
    /* width: 50vh; */
    /* height: 70vh; */
    position: absolute;
  }
  .imgbox_3 {
    position: absolute;
  }
  .imgbox_1 img {
    position: relative;
    z-index: 0;
    width: 60%;
    left: 0vw;
    top: 10vw;
  }
  .imgbox_2 img {
    position: relative;
    z-index: 0;
    width: 75%;
    left: 0vw;
    top: 10vw;
    @media screen and (max-height: 700px) {
      width: 62.5%;
    }
  }
  .imgbox_3 img {
    position: relative;
    z-index: 0;
    width: 90%;
    left: 0vw;
    top: 10vw;
    @media screen and (max-height: 700px) {
      width: 75%;
    }
  }
  .flowerlist {
    /* width: 100%; */
    position: static;

    .flowerbox_1 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -10vw;
        top: 46vw;
        transform: rotate(0deg);
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: 9vw;
        top: 44vw;
        transform: rotate(5deg);
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -25vw;
        top: 40vw;
        transform: rotate(20deg);
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -40vw;
        top: 50vw;
        transform: rotate(-10deg);
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 5vw;
        top: 27vw;
        transform: rotate(25deg);
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -21vw;
        top: 36vw;
        transform: rotate(-20deg);
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -36vw;
        top: 33vw;
        transform: rotate(0deg);
      }
    }
    .flowerbox_2 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -15vw;
        top: 60vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: -12vw;
          top: 52vw;
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: -2vw;
        top: 54vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: -1vw;
          top: 48vw;
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -32vw;
        top: 57vw;
        transform: rotate(-10deg);
        @media screen and (max-height: 700px) {
          left: -28vw;
          top: 50vw;
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -12vw;
        top: 40vw;
        transform: rotate(10deg);
        @media screen and (max-height: 700px) {
          left: -10vw;
          top: 35vw;
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 16vw;
        top: 37vw;
        transform: rotate(25deg);
        @media screen and (max-height: 700px) {
          left: 13vw;
          top: 32vw;
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -40vw;
        top: 45vw;
        transform: rotate(-20deg);
        @media screen and (max-height: 700px) {
          left: -35vw;
          top: 39vw;
        }
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -24vw;
        top: 32vw;
        transform: rotate(-10deg);
        @media screen and (max-height: 700px) {
          left: -20vw;
          top: 28vw;
        }
      }
      &:nth-of-type(8) {
        z-index: 3;
        left: -4vw;
        top: 29vw;
        transform: rotate(5deg);
        @media screen and (max-height: 700px) {
          left: -2vw;
          top: 25vw;
        }
      }
    }
    .flowerbox_3 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -15vw;
        top: 80vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: -12vw;
          top: 68vw;
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: -2vw;
        top: 80vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: -1.5vw;
          top: 68vw;
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -34vw;
        top: 83vw;
        transform: rotate(-10deg);
        @media screen and (max-height: 700px) {
          left: -28vw;
          top: 70vw;
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: 15vw;
        top: 75vw;
        transform: rotate(15deg);
        @media screen and (max-height: 700px) {
          left: 13.5vw;
          top: 63vw;
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: -45vw;
        top: 80vw;
        transform: rotate(-5deg);
        @media screen and (max-height: 700px) {
          left: -36vw;
          top: 68vw;
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -15vw;
        top: 65vw;
        transform: rotate(-5deg);
        @media screen and (max-height: 700px) {
          left: -12vw;
          top: 55vw;
        }
      }
      &:nth-of-type(7) {
        z-index: 5;
        left: -32vw;
        top: 68vw;
        transform: rotate(-10deg);
        @media screen and (max-height: 700px) {
          left: -27vw;
          top: 57vw;
        }
      }
      &:nth-of-type(8) {
        z-index: 5;
        left: 2vw;
        top: 65vw;
        transform: rotate(5deg);
        @media screen and (max-height: 700px) {
          left: 2vw;
          top: 55vw;
        }
      }
      &:nth-of-type(9) {
        z-index: 2;
        left: -45vw;
        top: 70vw;
        transform: rotate(-20deg);
        @media screen and (max-height: 700px) {
          left: -40vw;
          top: 60vw;
        }
      }
      &:nth-of-type(10) {
        z-index: 1;
        left: 15vw;
        top: 65vw;
        transform: rotate(0deg);
        @media screen and (max-height: 700px) {
          left: 13vw;
          top: 55vw;
        }
      }
    }
  }
  .imgbox_front_1 img {
    z-index: 12;
    position: relative;
    width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
  }
  .imgbox_front_2 {
    height: 65vh;
  }
  .imgbox_front_2 img {
    z-index: 12;
    position: relative;
    width: 75%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (max-height: 700px) {
      width: 62.5%;
    }
  }
  .imgbox_front_3 img {
    z-index: 12;
    position: relative;
    width: 90%;
    left: 0vw;
    right: 0vw;
    top: 10vw;
    bottom: 10vw;
    pointer-events: none;
    @media screen and (max-height: 700px) {
      width: 75%;
    }
  }
`;

const SelectBtn = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 3rem;

  /* padding: 0.5rem; */
  /* margin-top: 0; */
  p {
    display: flex;
    justify-content: left;
    align-items: end;
  }
  select {
    margin-top: 0;
    border: 1px solid black;
    display: flex;
    justify-content: left;
  }
`;

const SelectCSS = css`
  font-family: 'SeoulNamsanM';
  width: 70vw;
`;

const Font = css`
  font-family: 'SeoulNamsanM';
`;

export default PaymentOption;
