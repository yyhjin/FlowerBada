import { css } from '@emotion/react';
import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import axios from 'axios';
import { useRecoilState } from 'recoil';

export default function Modal(props: any) {
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);

  function closeModal() {
    props.closeModal();
  }

  const buyFunction = async () => {
    try {
      if (props.isFlower) {
        const data: any = {
          flowerId: props.itemId,
        };
        await axios.put('http://localhost:8080/api/v1/store/buy/flower', data, {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        });
      } else {
        const data: any = {
          rollingId: props.itemId,
        };
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

      const res = await axios.get('http://localhost:8080/api/v1/user/points', {
        headers: {
          'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
        },
      });
      const points: number = res.data.response.points;
      setLoginUser((prev: IuserRecoil) => {
        const variable = { ...prev };
        variable.points = points;
        return variable;
      });
      alert('구매 완료!');

      switch (props.location) {
        case 'message':
          window.location.href = '/rolling/message/create';
          break;
        case 'store':
          window.location.href = '/store';
          break;
        case 'rolling':
          break;
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div css={ModalCss}>
      <div className="Modal" onClick={closeModal}>
        <div className="modalBody" onClick={(e) => e.stopPropagation()}>
          <button id="modalCloseBtn" onClick={closeModal}>
            ✖
          </button>
          {props.children}
          {loginUser.points >= props.price ? (
            <button css={buyBtn} onClick={buyFunction}>
              구매
            </button>
          ) : (
            <div>
              <strong>포인트가 부족합니다!</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ModalCss = css`
  /* modal창 외부화면 */
  .Modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
  }

  /* modal창 */
  .modalBody {
    position: absolute;
    width: 70%;
    height: 25vh;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  }

  #modalCloseBtn {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    color: rgba(0, 0, 0, 0.7);
    background-color: transparent;
    font-size: 20px;
  }

  #modalCloseBtn:hover {
    cursor: pointer;
  }
`;

const buyBtn = css`
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: white;
  cursor: pointer;
  /* transition: border-color 0.25s; */
  background-color: #16453e;
  width: 30%;
  height: 40px;
  bottom: 10%;
  left: 35%;
  position: absolute;
`;
