import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { paymentRecoil } from '@recoil/paymentRecoil';

const PaymentCancel = () => {
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
    <div>
      <p>결제를 취소하셨습니다.</p>
      <button onClick={goMain}>메인으로</button>
    </div>
  );
};

export default PaymentCancel;
