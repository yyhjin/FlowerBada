import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentAPI from '@api/paymentAPI';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { paymentRecoil } from '@recoil/paymentRecoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { createTheme, ThemeProvider } from '@mui/material';
import { Button } from '@mui/material';
import Congrats from '@assets/congrats2.gif';
import MySwal from '@components/SweetAlert';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);

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
      try {
        const res = await paymentAPI.successPayment(
          userState.jwt,
          userState.refresh,
          reqData,
        );
        setPaymentInfo(res.data.response);
      } catch (err: any) {
        MySwal.fire({
          title: '결제 정보 가져오기 실패',
          icon: 'warning',
          confirmButtonColor: '#16453e',
          confirmButtonText: '확인',
        }).then(() => {
          navigate('/');
        });
      }
    };
    getPaymentInfo();
  }, []);

  useEffect(() => {
    resetPaymentRecoil();
  }, []);

  return (
    <div css={PaymentSuccessCSS}>
      {paymentInfo && paymentInfo.item_name ? (
        <div className="total-info">
          <img src={Congrats} alt="폭죽" className="firecracker" />
          <h3>결제가 완료되었습니다!</h3>
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

const PaymentSuccessCSS = css`
  width: 100vw;
  height: calc(100% - 20vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .total-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .firecracker {
      width: 80vw;
    }
    h3 {
      margin-top: 20vh;
      font-weight: bold;
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

export default PaymentSuccess;
