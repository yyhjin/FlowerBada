import React from 'react';
import axios from 'axios';

export default function MyPage() {
  const deliveryList = async (params: { sort: 1; paginationId: 0 }) => {
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/mypage/delivery',
      );
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      <div>MyPage</div>
      <button type="button" onClick={deliveryList}>
        배송 목록
      </button>
    </>
  );
}
