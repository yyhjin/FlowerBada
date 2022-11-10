import PaymentOption from '@components/payment/PaymentOption';
import PaymentReceiverAddress from '@components/payment/PaymentReceiverAddress';
import PaymentSenderAddress from '@components/payment/PaymentSenderAddress';
import PaymentRequest from '@components/payment/PaymentRequest';
import { useState } from 'react';

export interface IPaymentProps {
  setTap: Function;
}

const Payment = () => {
  const [tap, setTap] = useState('option');
  const [paymentInfo, setPaymentInfo] = useState({});
  return (
    <div>
      {tap === 'option' && <PaymentOption setTap={setTap} />}
      {tap === 'rAddress' && <PaymentReceiverAddress setTap={setTap} />}
      {tap === 'sAddress' && <PaymentSenderAddress setTap={setTap} />}
      {tap === 'request' && <PaymentRequest setTap={setTap} />}
    </div>
  );
};

export default Payment;
