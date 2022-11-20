import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { IPaymentRecoil, paymentRecoil } from '@recoil/paymentRecoil';
import { createTheme, ThemeProvider } from '@mui/material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';

const PaymentSenderAddress = () => {
  const [paymentState, setPaymentState] =
    useRecoilState<IPaymentRecoil>(paymentRecoil);
  const [senderName, setSenderName] = useState<string>('');
  const [senderPhone, setSenderPhone] = useState<string>('');
  const [senderMsg, setSenderMsg] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const navigate = useNavigate();
  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);

  const onChangeSenderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderName(e.target.value);
  };

  const onChangeSenderPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderPhone(e.target.value);
  };

  const onChangeSenderMsg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSenderMsg(e.target.value);
  };

  const onChangeIsAnonymous = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAnonymous) {
      setSenderName('');
      setSenderPhone('');
    }
    setIsAnonymous(!isAnonymous);
  };

  const onClickNext = () => {
    setPaymentState((prev: IPaymentRecoil) => {
      const data = { ...prev };
      data.senderName = senderName;
      data.senderPhone = senderPhone;
      data.senderMsg = senderMsg;
      data.isAnonymous = isAnonymous;
      return data;
    });
    navigate(`/payment/request`);
  };

  const goBack = () => {
    resetPaymentRecoil();
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };

  useEffect(() => {
    setSenderName(paymentState.senderName);
    setSenderPhone(paymentState.senderPhone);
    setSenderMsg(paymentState.senderMsg);
    setIsAnonymous(paymentState.isAnonymous);
  }, []);

  return (
    <>
      <div css={InputCSS}>
        <div className="sender-name">
          <p>보내는 사람</p>
          <input
            onChange={onChangeSenderName}
            value={senderName}
            disabled={isAnonymous}
          />
        </div>
        <div className="sender-phone">
          <p>연락처</p>
          <input
            onChange={onChangeSenderPhone}
            value={senderPhone}
            disabled={isAnonymous}
          />
        </div>
        <div className="sender-checkbox">
          <p>익명으로 보내기</p>
          <input
            type="checkbox"
            onChange={onChangeIsAnonymous}
            checked={isAnonymous}
          />
        </div>
        <div className="sender-msg">
          <p>요청 사항</p>
          <textarea onChange={onChangeSenderMsg} />
        </div>
      </div>
      <div>
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
                결제 선택창으로 이동하기
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
    </>
  );
};

const InputCSS = css`
  display: flex;
  flex-direction: column;
  width: 100vw;

  .sender-name,
  .sender-phone,
  .sender-msg {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    input {
      width: 50%;
    }

    textarea {
      width: 50%;
      height: 3rem;
      resize: none;

      &::-webkit-scrollbar {
        width: 3px;
        background-color: #ffffff;
      }

      &::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: rgba(0, 0, 0, 0.25);
      }
    }
  }

  .sender-checkbox {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    & > * {
      margin-right: 1rem;
    }
  }
`;

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

export default PaymentSenderAddress;
