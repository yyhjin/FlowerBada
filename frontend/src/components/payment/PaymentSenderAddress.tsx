import { css } from '@emotion/react';
import type { IPaymentProps } from '@pages/Payment/Payment';

const PaymentSenderAddress = ({ setTap }: IPaymentProps) => {
  return (
    <>
      <div>보내는 사람</div>
      <div>연락처</div>
      <div>익명으로 보내기 체크박스</div>
      <div>다음 / 취소 버튼</div>
    </>
  );
};

export default PaymentSenderAddress;
