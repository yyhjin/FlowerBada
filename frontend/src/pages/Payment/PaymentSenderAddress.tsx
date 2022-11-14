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
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const navigate = useNavigate();
  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);

  const onChangeSenderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderName(e.target.value);
  };

  const onChangeSenderPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderPhone(e.target.value);
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
    setIsAnonymous(paymentState.isAnonymous);
  }, []);

  return (
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
  );
};

const InputCSS = css`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  .sender-name,
  .sender-phone {
    width: calc(100vw - 4rem);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .sender-checkbox {
    width: calc(100vw - 4rem);
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
  bottom: 5vh;
  width: 100%;
  /* height: 20%; */
`;

export default PaymentSenderAddress;
