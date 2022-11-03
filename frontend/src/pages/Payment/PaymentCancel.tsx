import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  // 잘못된 접근시 메인 페이지로 돌아가는 함수
  const goMain = () => {
    navigate('/');
  };

  return (
    <div>
      <p>결제를 취소하셨습니다.</p>
      <button onClick={goMain}>메인으로</button>
    </div>
  );
};

export default PaymentCancel;
