import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';
import MainGreenHouse from '@assets/main_menu/main_greenhouse.png';
import MainMyPage from '@assets/main_menu/main_mypage.png';
import MainNewRoll from '@assets/main_menu/main_newroll.png';
import MainStore from '@assets/main_menu/main_store.png';
import LogoutBtn from '@assets/logout_btn.png';
import { useEffect } from 'react';
import userAPI from '@src/api/userAPI';

const Mainpage = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const [createRollingState, setCreateRollingState] =
    useRecoilState<IcreateRollingRecoil>(createRollingRecoil);

  // 로그아웃
  const signOut = async () => {
    try {
      await userAPI.signOut(loginUser.jwt, loginUser.refresh);
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
      window.location.href = '/';
    } catch (err: any) {
      console.log(err);
    }
  };

  const resetCreateData = () => {
    setCreateRollingState((prev: IcreateRollingRecoil): any => {
      const variable = { ...prev };
      variable.itemId = 0;
      variable.itemIndex = 0;
      variable.url = '';
      variable.title = '';
      return variable;
    });
  };
  useEffect(() => {
    resetCreateData();
  }, []);

  // 페이지 이동 핸들러
  const moveGreenHouse = () => {
    navigate('/greenhouse');
  };
  const moveStore = () => {
    navigate('/store');
  };
  const moveNewRoll = () => {
    navigate('/newroll/item');
  };
  const moveMyPage = () => {
    navigate('/mypage');
  };

  return (
    <div css={TestCSS}>
      <h2 className="main_title">꽃바다</h2>
      <img src={LogoutBtn} className="logout_btn" onClick={signOut} />
      <div className="only_web">꽃바다는 모바일 환경에 최적화되어있습니다.</div>
      <div className="main_menu">
        <div className="first_row">
          <div className="greenhouse" onClick={moveGreenHouse}>
            <img src={MainGreenHouse} alt="그린하우스 버튼" />
            <p>그린하우스</p>
          </div>
          <div className="store" onClick={moveStore}>
            <img src={MainStore} alt="상점 버튼" />
            <p>꽃가게</p>
          </div>
        </div>
        <div className="second_row">
          <div className="newroll" onClick={moveNewRoll}>
            <img src={MainNewRoll} alt="롤링페이퍼 생성버튼" />
            <p>새로만들기</p>
          </div>
          <div className="mypage" onClick={moveMyPage}>
            <img src={MainMyPage} alt="마이페이지 버튼" />
            <p>마이페이지</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestCSS = css`
  position: relative;
  color: black;
  display: flex;
  flex-direction: column;
  overflow-y: block;
  height: calc(100vh);

  &::-webkit-scrollbar {
    display: none;
  }

  .main_title {
    font-family: 'GowunDodum-Regular';
    margin-bottom: 50px;
    margin-top: 100px;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logout_btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
  }

  .logout_btn:hover,
  .logout_btn:active {
    transform: scale(1.05, 1.05);
    transition: all ease 0.2s;
    cursor: pointer;
  }

  .main_menu {
    /* overflow-y: auto; */
    height: 70vh;

    .first_row,
    .second_row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      /* height: 50%; */
      /* margin-top: 0; */
      /* padding: 1rem; */

      img {
        width: 70%;
        height: 80%;
      }

      p {
        color: black;
        font-size: 1rem;
        font-family: SeoulNamsanM;
      }

      .greenhouse,
      .store,
      .newroll,
      .mypage {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* width: 130px;
        height: 200px; */
        padding: 1rem;
      }

      .greenhouse {
        img {
          /* width: 120px;
          height: 116px; */
        }
      }

      .store {
        img {
          /* width: 125px;
          height: 116px; */
        }
      }

      .newroll {
        img {
          /* width: 90px;
          height: 120px; */
        }
      }

      .mypage {
        img {
          /* width: 77px;
          height: 120px; */
        }
      }

      .greenhouse:hover,
      .greenhouse:active,
      .store:hover,
      .store:active,
      .newroll:hover,
      .newroll:active,
      .mypage:hover,
      .mypage:active {
        transform: scale(1.05, 1.05);
        transition: all ease 0.2s;
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }

  .main_menu::-webkit-scrollbar {
    display: block;
  }

  .main_menu::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 15px;
  }

  .main_menu::-webkit-scrollbar-track {
    border-radius: 15px;
  }

  .only_web {
    display: none;
    margin-bottom: 2rem;
  }
  @media screen and (min-width: 500px) {
    .only_web {
      display: block;
      color: #16453e;
      text-shadow: 8px 8px 8px gray;
    }
  }
`;

export default Mainpage;
