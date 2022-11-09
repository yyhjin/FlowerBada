import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const PaymentSenderAddress = () => {
  const navigate = useNavigate();
  const onClickNext = () => {
    navigate(`/payment/request`);
  };

  const goBack = () => {
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };
  return (
    <>
      <div>보내는 사람</div>
      <div>연락처</div>
      <div>익명으로 보내기 체크박스</div>
      <div className="sender-buttons">
        <button onClick={onClickNext}>결제 선택창으로 이동하기</button>
        <button onClick={goBack}>롤링페이퍼로 돌아가기</button>
      </div>
    </>
  );
};

export default PaymentSenderAddress;
