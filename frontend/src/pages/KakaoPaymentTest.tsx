import React from 'react';
import axios from 'axios';

const KakaoPaymentTest = () => {
  const payment = async () => {
    const res = await axios.post(
      'http://localhost:8080/api/v1/payment/1',
      null,
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
    window.location.href = res.data.response;
  };

  return (
    <div onClick={payment}>
      <button>결제하기</button>
    </div>
  );
};

export default KakaoPaymentTest;
