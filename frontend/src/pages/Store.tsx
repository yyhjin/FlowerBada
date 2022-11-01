import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import Modal from '@src/components/store/BuyModal';
import Receipt from '@src/components/store/Receipt';

const Store = () => {
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const [buying, setBuying] = useState(false); // 구매하기 버튼 눌렀는지 여부
  const [isFlower, SetIsFlower] = useState(false); // 꽃다발이면 false, 꽃이면 true

  const handleBuying = () => {
    setBuying(true);
  };

  // 탭 바뀔 때마다 해당하는 품목 리스트 가져오기
  useEffect(() => {
    if (isFlower) {
      axios
        .get('http://localhost:8080/api/v1/store/flower', {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        })
        .then((res: any) => {
          console.log(res.response);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      axios
        .get('http://localhost:8080/api/v1/store/rolling', {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        })
        .then((res: any) => {
          console.log(res.response);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [isFlower]);

  return (
    <div css={StoreDiv}>
      Store
      <div>
        <button css={BuyButton} type="button" onClick={handleBuying}>
          <span css={BuyText}>구매하기</span>
        </button>
        {buying && (
          <Modal closeModal={() => setBuying(!buying)} isFlower={isFlower}>
            <Receipt />
          </Modal>
        )}
      </div>
    </div>
  );
};

const StoreDiv = css`
  // margin-top: 70px;
`;

const BuyButton = css`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  background-color: #16453e;
`;

const BuyText = css`
  color: white;
  margin-left: 30px;
  margin-right: 30px;
`;

export default Store;
