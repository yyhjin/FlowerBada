import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
export default function Error() {
  const navigate = useNavigate();
  sessionStorage.setItem('url', '/error');
  function goToHome() {
    navigate('/');
  }
  return (
    <div css={ErrorBox}>
      <div className="imgBox">
        <img
          className="img"
          src={'/src/assets/fixed-size/flower/flower_2_fixed.png'}
        ></img>
      </div>
      <div>
        요청이 너무 많습니다.
        <br />
        잠시후 다시 시도해주세요.
      </div>
      <div className="buttonBox">
        <button type="button" onClick={goToHome} className="button">
          홈으로
        </button>
      </div>
    </div>
  );
}

const ErrorBox = css`
  width: 100vw;
  .imgBox {
    margin-top: 30%;
  }
  .img {
    width: 80vw;
    @media screen and (min-width: 500px) {
      width: 80%;
    }
  }
  .buttonBox {
    margin-top: 20px;
  }
  .button {
    width: 70%;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    background-color: #16453e;
    color: white;
  }
`;
