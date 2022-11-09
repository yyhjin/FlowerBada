import paymentAPI from '@src/api/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

const PaymentRequest = () => {
  const navigate = useNavigate();
  const onClickPayment = async () => {
    const res = await paymentAPI.requestPayment();
    window.location.href = res.data.response;
  };

  const onClickCancel = () => {
    // 롤링페이지로 돌아가야함
    // 해당하는 rollingUrl/paginationId로 이동할 수 있도록 만들어야함
  };

  return (
    <>
      <p>카카오페이로 결제하기</p>
      <button onClick={onClickPayment}>결제하기</button>
      <button onClick={onClickCancel}>취소하기</button>
    </>
  );
};

export default PaymentRequest;
