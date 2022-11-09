import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const PaymentOption = () => {
  const navigate = useNavigate();
  const onClickNext = () => {};

  const goBack = () => {
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };

  return (
    <div css={OptionCSS}>
      <div>Flower</div>
      <div>Option</div>
      <div>수량</div>
      <div>가격</div>
      <div className="option-buttons">
        <button onClick={onClickNext}>받는 분 정보 입력하러 가기</button>
        <button onClick={goBack}>롤링페이퍼로 돌아가기</button>
      </div>
    </div>
  );
};

const OptionCSS = css`
  .option-buttons {
    display: flex;
    flex-direction: column;
  }
`;

export default PaymentOption;
