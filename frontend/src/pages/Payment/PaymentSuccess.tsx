import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dateFormatter from '@utils/dateFormatter';
import paymentAPI from '@src/api/paymentAPI';
import { useResetRecoilState } from 'recoil';
import { paymentRecoil } from '@recoil/paymentRecoil';
import { createTheme, ThemeProvider } from '@mui/material';
import { Button } from '@mui/material';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);

  // url 분리
  const urlParams = new URLSearchParams(location.search);
  const reqData = {
    pgToken: urlParams.get('pg_token'),
    orderId: urlParams.get('order_id'),
  };

  // 결제 정보 상태값으로 저장
  const [paymentInfo, setPaymentInfo] = useState<any>({
    approved_at: '',
    partner_order_id: '',
    item_name: '',
    quantity: '',
    amount: { total: 0 },
    payment_method_type: '',
  });

  // 잘못된 접근시 메인 페이지로 돌아가는 함수
  const goMain = () => {
    navigate('/');
  };

  // 결제 완료 정보 가져오기
  useEffect(() => {
    const getPaymentInfo = async () => {
      const res = await paymentAPI.successPayment(reqData);
      setPaymentInfo(res.data.response);
      console.log(res.data.response);
    };
    getPaymentInfo();
  }, []);

  useEffect(() => {
    resetPaymentRecoil();
  }, []);

  return (
    <div>
      {paymentInfo && paymentInfo.item_name ? (
        <div>
          <h3>결제가 정상적으로 완료되었습니다!</h3>
          <p>구매한 아이템 : {paymentInfo.item_name}</p>
          <p>가격 : {paymentInfo.amount.total.toLocaleString()}원</p>
          <p>결제 시간 : {dateFormatter(paymentInfo.approved_at)}</p>
        </div>
      ) : (
        <div>
          <p>잘못된 접근입니다.</p>
        </div>
      )}
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

export default PaymentSuccess;
