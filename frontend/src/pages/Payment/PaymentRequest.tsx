import paymentAPI from '@api/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useResetRecoilState } from 'recoil';
import { paymentRecoil } from '@recoil/paymentRecoil';

const PaymentRequest = () => {
  const navigate = useNavigate();
  const onClickPayment = async () => {
    const res = await paymentAPI.requestPayment();
    window.location.href = res.data.response;
  };

  const goBack = () => {
    useResetRecoilState(paymentRecoil);
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };

  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
      <button onClick={goBack}>롤링페이퍼로 돌아가기</button>
    </>
  );
};

export default PaymentRequest;
