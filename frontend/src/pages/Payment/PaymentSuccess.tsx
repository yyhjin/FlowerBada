import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dateFormatter from '@utils/dateFormatter';
import paymentAPI from '@src/api/paymentAPI';

const PaymentSuccess = () => {
  const navigate = useNavigate();

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

  // 결제 완료 정보 가져오기
  useEffect(() => {
    const getPaymentInfo = async () => {
      const res = await paymentAPI.successPayment(reqData);
      setPaymentInfo(res.data.response);
      console.log(res.data.response);
    };
    getPaymentInfo();
  }, []);

  // 잘못된 접근시 메인 페이지로 돌아가는 함수
  const goMain = () => {
    navigate('/');
  };

  return (
    <div>
      {paymentInfo && paymentInfo.item_name ? (
        <div>
          <h3>결제가 정상적으로 완료되었습니다!</h3>
          <p>구매한 아이템 : {paymentInfo.item_name}</p>
          <p>가격 : {paymentInfo.amount.total.toLocaleString()}원</p>
          <p>결제 시간 : {dateFormatter(paymentInfo.approved_at)}</p>
          <button onClick={goMain}>메인으로</button>
        </div>
      ) : (
        <div>
          <p>잘못된 접근입니다.</p>
          <button onClick={goMain}>메인으로</button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
