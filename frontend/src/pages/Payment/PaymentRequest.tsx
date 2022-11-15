import paymentAPI from '@api/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { IPaymentRecoil, paymentRecoil } from '@recoil/paymentRecoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { createTheme, ThemeProvider } from '@mui/material';
import { Button } from '@mui/material';
import KakaoPayBtn from '@assets/kakaoPay.png';
import MySwal from '@components/SweetAlert';
import updateTokens from '@src/utils/updateTokens';

const PaymentRequest = () => {
  const navigate = useNavigate();
  const [paymentState, setPaymentState] =
    useRecoilState<IPaymentRecoil>(paymentRecoil);
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);

  const resetPaymentRecoil = useResetRecoilState(paymentRecoil);

  const onClickPayment = async () => {
    try {
      const res = await paymentAPI.requestPayment(
        userState.jwt,
        userState.refresh,
        paymentState,
      );
      window.location.href = res.data.response;
    } catch (err: any) {
      if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
        MySwal.fire({
          title: '로그인이 필요합니다!',
          icon: 'warning',
          confirmButtonColor: '#16453e',
          confirmButtonText: '확인',
        }).then(() => {
          navigate('/');
        });
        setUserState((prev: IuserRecoil) => {
          const variable = { ...prev };
          variable.id = 0;
          variable.userToken = '';
          variable.nickname = '';
          variable.points = 0;
          variable.jwt = '';
          variable.refresh = '';
          return variable;
        });
      } else {
        let accessToken: string = err.response.headers.get('x-auth-token');
        let refreshToken: string = err.response.headers.get('refresh-token');
        if (accessToken && refreshToken) {
          accessToken = accessToken.split(' ')[1];
          refreshToken = refreshToken.split(' ')[1];
          updateTokens(accessToken, refreshToken, setUserState);
          const res = await paymentAPI.requestPayment(
            accessToken,
            refreshToken,
            paymentState,
          );
          window.location.href = res.data.response;
        } else {
          MySwal.fire({
            title: '결제 요청 실패!',
            icon: 'warning',
            confirmButtonColor: '#16453e',
            confirmButtonText: '확인',
          }).then(() => {
            navigate('/');
          });
        }
      }
    }
  };

  const goBack = () => {
    resetPaymentRecoil();
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };

  return (
    <div css={PaymentRequestCSS}>
      <p>카카오페이로 결제하기</p>
      <img
        src={KakaoPayBtn}
        className="kakao-btn"
        alt="결제버튼"
        onClick={onClickPayment}
      />
      <div css={ButtonBox}>
        <div className="option-buttons">
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

const PaymentRequestCSS = () => css`
  width: 100vw;
  height: calc(100% - 20vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
  }

  .kakao-btn {
    width: 120px;
    cursor: pointer;
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

export default PaymentRequest;
