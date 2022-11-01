import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import './BuyModal.css';

export default function Modal(props: any) {
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);
  console.log(props.isFlower);

  function closeModal() {
    props.closeModal();
  }

  const buyFunction = async () => {
    try {
      if (props.isFlower) {
        const data: any = [];
        await axios.put('http://localhost:8080/api/v1/store/buy/flower', data, {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        });
      } else {
        const data: any = [];
        await axios.put(
          'http://localhost:8080/api/v1/store/buy/rolling',
          data,
          {
            headers: {
              'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
            },
          },
        );
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.children}
        <button onClick={buyFunction}>확인</button>
      </div>
    </div>
  );
}
