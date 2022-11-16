import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { paymentRecoil } from '@recoil/paymentRecoil';
import { createTheme, ThemeProvider } from '@mui/material';
import { Button } from '@mui/material';

const PaymentFail = () => {
  const navigate = useNavigate();
  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);

  // 잘못된 접근시 메인 페이지로 돌아가는 함수
  const goMain = () => {
    navigate('/');
  };

  useEffect(() => {
    resetPaymentRecoil();
  }, []);

  return (
    <div css={PaymentFailCSS}>
      <p>결제에 실패했습니다.</p>
      <div css={ButtonBox}>
        <div className="option-buttons">
          <ThemeProvider theme={btnTheme}>
            <Button
              variant="contained"
              color="neutral"
              size="small"
              onClick={goMain}
              css={Font}
            >
              메인으로
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

const PaymentFailCSS = css`
  width: 100vw;
  height: calc(100% - 20vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export default PaymentFail;
