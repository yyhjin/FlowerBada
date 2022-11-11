import { css } from '@emotion/react';
import storeAPI from '@api/storeAPI';
import userAPI from '@api/userAPI';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import MySwal from '@components/SweetAlert';
import updateTokens from '@src/utils/updateTokens';
import { useState } from 'react';
export default function Modal(props: any) {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const [doubleCheck, setDoubleCheck] = useState<boolean>(false);
  function closeModal() {
    props.closeModal();
  }

  const buyFunction = async () => {
    try {
      try {
        if (props.isFlower && !doubleCheck) {
          setDoubleCheck(true);
          const data: any = {
            flowerId: props.itemId,
          };
          await storeAPI
            .putFlower(loginUser.jwt, loginUser.refresh, data)
            .then(() => {
              setDoubleCheck(true);
            });
        } else if (!props.isFlower && !doubleCheck) {
          setDoubleCheck(true);
          const data: any = {
            rollingId: props.itemId,
          };
          await storeAPI
            .putRolling(loginUser.jwt, loginUser.refresh, data)
            .then(() => {
              setDoubleCheck(false);
            });
        }
        const res = await userAPI.getPoint(loginUser.jwt, loginUser.refresh);
        const points: number = res.data.response.points;
        setLoginUser((prev: IuserRecoil) => {
          const variable = { ...prev };
          variable.points = points;
          return variable;
        });

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
        if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
          MySwal.fire({
            title: '로그인이 필요합니다!',
            icon: 'warning',
            confirmButtonColor: '#16453e',
            confirmButtonText: '확인',
          });
          setLoginUser((prev: IuserRecoil) => {
            const variable = { ...prev };
            variable.id = 0;
            variable.userToken = '';
            variable.nickname = '';
            variable.points = 0;
            variable.jwt = '';
            variable.refresh = '';
            return variable;
          });
          navigate('/');
        } else {
          let accessToken: string = err.response.headers.get('x-auth-token');
          let refreshToken: string = err.response.headers.get('refresh-token');
          if (accessToken && refreshToken) {
            accessToken = accessToken.split(' ')[1];
            refreshToken = refreshToken.split(' ')[1];
            updateTokens(accessToken, refreshToken, setLoginUser);
            if (props.isFlower && !doubleCheck) {
              setDoubleCheck(true);
              const data: any = {
                flowerId: props.itemId,
              };
              await storeAPI
                .putFlower(loginUser.jwt, loginUser.refresh, data)
                .then(() => {
                  setDoubleCheck(true);
                  MySwal.fire({
                    title: '구매 완료!',
                    icon: 'success',
                    confirmButtonColor: '#16453e',
                    confirmButtonText: '확인',
                  });
                });
            } else if (!props.isFlower && !doubleCheck) {
              setDoubleCheck(true);
              const data: any = {
                rollingId: props.itemId,
              };
              await storeAPI
                .putRolling(loginUser.jwt, loginUser.refresh, data)
                .then(() => {
                  setDoubleCheck(false);
                  MySwal.fire({
                    title: '구매 완료!',
                    icon: 'success',
                    confirmButtonColor: '#16453e',
                    confirmButtonText: '확인',
                  });
                });
            }
            const res = await userAPI.getPoint(accessToken, refreshToken);
            const points: number = res.data.response.points;
            setLoginUser((prev: IuserRecoil) => {
              const variable = { ...prev };
              variable.points = points;
              return variable;
            });

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
          } else {
            console.log('No access or refresh token');
            navigate('/');
          }
        }
      }
    } catch (err: any) {
      MySwal.fire({
        title: '구매 실패...',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
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
    @media screen and (min-width: 500px) {
      position: relative;
      top: -300px;
      left: 0px;
    }
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
    @media screen and (min-width: 500px) {
      background-color: rgb(224, 224, 224);
    }
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
