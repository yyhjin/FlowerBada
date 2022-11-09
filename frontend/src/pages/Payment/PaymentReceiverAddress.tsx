import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const PaymentReceiverAddress = () => {
  const navigate = useNavigate();
  const onClickNext = () => {
    navigate(`/payment/address/sender`);
  };

  const goBack = () => {
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };
  return (
    <>
      <div>받는 사람</div>
      <div>연락처</div>
      <div>추가 연락처(선택)</div>
      <div>배송주소</div>
      <div className="option-buttons">
        <button onClick={onClickNext}>보내는 분 정보 입력하러 가기</button>
        <button onClick={goBack}>롤링페이퍼로 돌아가기</button>
      </div>
    </>
  );
};

export default PaymentReceiverAddress;
