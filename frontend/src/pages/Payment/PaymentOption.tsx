import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '@src/components/message/Message';
import type { IRolling, IMessage } from '@pages/RollingPaper';
import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { IPaymentRecoil, paymentRecoil } from '@recoil/paymentRecoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import html2canvas from 'html2canvas';
import messageAPI from '@api/messageAPI';
import MySwal from '@components/SweetAlert';

const PaymentOption = () => {
  const [optionType, setOptionType] = useState<string>('default');
  const [paymentState, setPaymentState] =
    useRecoilState<IPaymentRecoil>(paymentRecoil);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const navigate = useNavigate();
  const location = useLocation();
  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);

  location.state as {
    rolling: IRolling;
    type: number;
    valid: Boolean;
    stepNumber: number;
    userToken: string;
    paginationId: number;
  };
  const { rolling, type, valid, stepNumber, userToken, paginationId } =
    location.state;
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shipPrice, setShipPrice] = useState<number>(3000);
  const [imgUrl, setImgUrl] = useState<string>('');
  const rollingUrl = localStorage.getItem('url') ?? '';

  const selectOption = (e: SelectChangeEvent) => {
    setOptionType(e.target.value);
    if (e.target.value === 'default') setTotalPrice(0);
    else if (e.target.value === 'rollingPaperOnly')
      setTotalPrice(getRollingPrice());
    else if (e.target.value === 'both') setTotalPrice(getBothPrice());
  };

  const onClickNext = () => {
    // todo: 캡쳐하고 백엔드에 보내서 url 받아오는 로직 생성 필요
    if (optionType === 'default') {
      MySwal.fire({
        title: '옵션을 선택해주세요!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    } else {
      setPaymentState((prev: IPaymentRecoil) => {
        const data = { ...prev };
        data.price = totalPrice;
        data.title = rolling.title;
        data.optionType = optionType;
        data.userToken = userToken;
        data.rollingId = rolling.rollingId;
        data.paginationId = paginationId;
        data.imgUrl = imgUrl;
        if (optionType === 'both') data.flowerCnt = rolling.messages.length;
        else data.flowerCnt = 0;
        return data;
      });
      navigate(`/payment/address/receiver`);
    }
  };

  const goBack = () => {
    resetPaymentRecoil();
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };

  const getBothPrice = () => {
    let flowersPrice = 0;

    // 꽃 가격
    rolling.messages.map((message: IMessage, index: number) => {
      flowersPrice += message.price;
    });

    // 꽃다발 가격
    flowersPrice += rolling.price;

    // 메시지 가격
    flowersPrice += stepNumber * 500;

    return flowersPrice;
  };

  const getRollingPrice = () => {
    let rollingsPrice = 0;

    // 메시지 가격
    rollingsPrice += stepNumber * 500;

    return rollingsPrice;
  };

  const onSaveAs = async (uri: string): Promise<void> => {
    let link: any = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    // link.download = filename;
    // link.click();
    document.body.removeChild(link);
    const res = await messageAPI.getRollingImgUrl(
      userState.jwt,
      userState.refresh,
      rollingUrl,
      {
        imgUrl: uri,
      },
    );
    setImgUrl(res.data.response);
  };

  useEffect(() => {
    setOptionType(paymentState.optionType);
  }, []);

  useEffect(() => {
    if (optionType === 'default') setTotalPrice(0);
    else if (optionType === 'rollingPaperOnly')
      setTotalPrice(getRollingPrice());
    else if (optionType === 'both') setTotalPrice(getBothPrice());
  }, [optionType]);

  useEffect(() => {
    // 캡쳐 및 DB 저장
    const el = document.getElementById('to-save');
    if (el) {
      html2canvas(el).then((canvas: any) => {
        onSaveAs(canvas.toDataURL('image/png'));
      });
    }
  }, []);

  return (
    <div css={OptionCSS}>
      <div className="info-box">
        <div id="to-save" className="img-preview">
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
                    type={type}
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
          <div>주문 옵션 :</div>
          <ThemeProvider theme={selectTheme}>
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
                <MenuItem value={'both'} css={Font}>
                  롤링페이퍼 + 꽃
                </MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
          <div>제목 : {rolling.title}</div>
          {totalPrice ? (
            <>
              <div>제품 가격 : {totalPrice}원</div>
              <div>
                배송비 :&nbsp;<span className="ship-fee"> {shipPrice}원 </span>
                &nbsp;<span className="emphasize">무료</span>
              </div>
              <div>
                전체 가격 :&nbsp;
                <span className="ship-fee">{totalPrice + shipPrice}원</span>
                &nbsp;<span className="emphasize">{totalPrice}원</span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div css={ButtonBox}>
        <div className="option-buttons">
          <ThemeProvider theme={btnTheme}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onClickNext}
              css={Font}
            >
              받는 분 정보 입력하기
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={btnTheme}>
            <Button
              variant="contained"
              color="neutral"
              size="small"
              onClick={goBack}
              css={Font}
            >
              롤링페이퍼로 돌아가기
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

const selectTheme = createTheme({
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

const btnTheme = createTheme({
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

const OptionCSS = css`
  width: 100%;

  .info-box {
    position: relative;
    height: 80vh;
    width: 100vw;
    overflow-y: scroll;
  }

  .img-preview {
    width: 100%;
  }

  .option-buttons {
    display: flex;
    flex-direction: column;
  }
  .imgbox_1,
  .imgbox_2,
  .imgbox_3 {
    width: 100%;
    position: absolute;
  }

  .flowerlist {
    position: static;
    transform: scale(0.45);

    .flowerbox_1 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -5vw;
        top: 46vw;
        transform: rotate(0deg);
        @media screen and (min-width: 350px) {
          left: -20px;
          top: 150px;
        }
        img {
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: 18vw;
        top: 46vw;
        transform: rotate(5deg);
        @media screen and (min-width: 350px) {
          left: 60px;
          top: 150px;
        }
        img {
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -20vw;
        top: 40vw;
        transform: rotate(20deg);
        @media screen and (min-width: 350px) {
          left: -70px;
          top: 130px;
        }
        img {
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -45vw;
        top: 50vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 350px) {
          left: -170px;
          top: 160px;
        }
        img {
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 10vw;
        top: 27vw;
        transform: rotate(25deg);
        @media screen and (min-width: 350px) {
          left: 50px;
          top: 75px;
        }
        img {
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -18vw;
        top: 36vw;
        transform: rotate(-20deg);
        @media screen and (min-width: 350px) {
          left: -65px;
          top: 105px;
        }
        img {
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -33vw;
        top: 31vw;
        transform: rotate(0deg);
        @media screen and (min-width: 350px) {
          left: -135px;
          top: 90px;
        }
        img {
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
    }
    .flowerbox_2 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -15vw;
        top: 78vw;
        transform: rotate(0deg);
        @media screen and (min-width: 350px) {
          left: -50px;
          top: 240px;
        }
        img {
          width: 40vw;
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: 3vw;
        top: 75vw;
        transform: rotate(0deg);
        @media screen and (min-width: 350px) {
          left: 12px;
          top: 235px;
        }
        img {
          width: 40vw;
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -41vw;
        top: 80vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 350px) {
          left: -120px;
          top: 240px;
        }
        img {
          width: 40vw;
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: -12vw;
        top: 52vw;
        transform: rotate(10deg);
        @media screen and (min-width: 350px) {
          left: -40px;
          top: 165px;
        }
        img {
          width: 40vw;
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: 21vw;
        top: 49vw;
        transform: rotate(25deg);
        @media screen and (min-width: 350px) {
          left: 60px;
          top: 155px;
        }
        img {
          width: 40vw;
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -47vw;
        top: 62vw;
        transform: rotate(-20deg);
        @media screen and (min-width: 350px) {
          left: -140px;
          top: 190px;
        }
        img {
          width: 40vw;
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -30vw;
        top: 38vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 350px) {
          left: -90px;
          top: 120px;
        }
        img {
          width: 40vw;
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
      &:nth-of-type(8) {
        z-index: 3;
        left: 0vw;
        top: 35vw;
        transform: rotate(5deg);
        @media screen and (min-width: 350px) {
          left: -10px;
          top: 110px;
        }
        img {
          width: 40vw;
          @media screen and (min-width: 350px) {
            width: 110px;
          }
        }
      }
    }
    .flowerbox_3 {
      position: relative;
      &:first-of-type {
        z-index: 10;
        left: -15vw;
        top: 110vw;
        transform: rotate(0deg);
        @media screen and (min-width: 350px) {
          left: -45px;
          top: 370px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(2) {
        z-index: 9;
        left: 3vw;
        top: 110vw;
        transform: rotate(0deg);
        @media screen and (min-width: 350px) {
          left: 10px;
          top: 370px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(3) {
        z-index: 8;
        left: -38vw;
        top: 115vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 350px) {
          left: -120px;
          top: 390px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(4) {
        z-index: 7;
        left: 28vw;
        top: 105vw;
        transform: rotate(15deg);
        @media screen and (min-width: 350px) {
          left: 90px;
          top: 360px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(5) {
        z-index: 6;
        left: -55vw;
        top: 112vw;
        transform: rotate(-5deg);
        @media screen and (min-width: 350px) {
          left: -175px;
          top: 380px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(6) {
        z-index: 5;
        left: -15vw;
        top: 91vw;
        transform: rotate(-5deg);
        @media screen and (min-width: 350px) {
          left: -50px;
          top: 310px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(7) {
        z-index: 4;
        left: -37vw;
        top: 96vw;
        transform: rotate(-10deg);
        @media screen and (min-width: 350px) {
          left: -125px;
          top: 325px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(8) {
        z-index: 3;
        left: 10vw;
        top: 90vw;
        transform: rotate(5deg);
        @media screen and (min-width: 350px) {
          left: 35px;
          top: 310px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(9) {
        z-index: 2;
        left: -60vw;
        top: 100vw;
        transform: rotate(-20deg);
        @media screen and (min-width: 350px) {
          left: -200px;
          top: 330px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
      &:nth-of-type(10) {
        z-index: 1;
        left: 30vw;
        top: 90vw;
        transform: rotate(0deg);
        @media screen and (min-width: 350px) {
          left: 110px;
          top: 320px;
        }
        img {
          width: 32vw;
          @media screen and (min-width: 350px) {
            width: 100px;
          }
        }
      }
    }
  }

  .imgbox_1 img {
    position: relative;
    z-index: 0;
    width: 40%;
    @media screen and (min-width: 350px) {
      width: 140px;
    }
  }
  .imgbox_2 img {
    position: relative;
    z-index: 0;
    width: 50%;
    @media screen and (min-width: 350px) {
      width: 150px;
    }
  }
  .imgbox_3 img {
    position: relative;
    z-index: 0;
    width: 60%;
    @media screen and (min-width: 350px) {
      width: 200px;
    }
  }
  .imgbox_front_1 img {
    position: relative;
    z-index: 12;
    width: 40%;
    @media screen and (min-width: 350px) {
      width: 140px;
    }
  }
  .imgbox_front_2 img {
    position: relative;
    z-index: 12;
    width: 50%;
    @media screen and (min-width: 350px) {
      width: 150px;
    }
  }
  .imgbox_front_3 img {
    position: relative;
    z-index: 12;
    width: 60%;
    @media screen and (min-width: 350px) {
      width: 200px;
    }
  }

  .ship-fee {
    text-decoration: line-through red;
  }

  .emphasize {
    color: red;
  }
`;

const SelectBtn = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2rem;
  @media screen and (max-height: 700px) {
    margin-top: -10vw;
  }
  div {
    display: flex;
    justify-content: left;
    align-items: end;
  }
  select {
    border: 1px solid black;
    display: flex;
    justify-content: left;
  }
`;

const SelectCSS = css`
  font-family: 'SeoulNamsanM';
  width: 200px;
`;

const Font = css`
  font-family: 'SeoulNamsanM';
  padding: 16px;
  width: 90%;
  margin: 6px;
`;

const ButtonBox = css`
  position: fixed;
  bottom: 2vh;
  width: 100%;

  button {
    height: 5vh;
  }
`;
export default PaymentOption;
