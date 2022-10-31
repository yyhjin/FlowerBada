import { css } from '@emotion/react';
import MainGreenHouse from '@assets/main_greenhouse.png';
import MainMyPage from '@assets/main_mypage.png';
import MainNewRoll from '@assets/main_newroll.png';
import MainStore from '@assets/main_store.png';

const Mainpage = () => {
  return (
    <div css={TestCSS}>
      <h2 className="main_title">꽃바다</h2>
      <div className="main_menu">
        <div className="first_row">
          <div className="greenhouse">
            <img src={MainGreenHouse} alt="그린하우스 버튼" />
            <p>그린하우스</p>
          </div>
          <div className="store">
            <img src={MainStore} alt="상점 버튼" />
            <p>꽃가게</p>
          </div>
        </div>
        <div className="second_row">
          <div className="newroll">
            <img src={MainNewRoll} alt="롤링페이퍼 생성버튼" />
            <p>새로만들기</p>
          </div>
          <div className="mypage">
            <img src={MainMyPage} alt="마이페이지 버튼" />
            <p>마이페이지</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestCSS = css`
  color: red;
  display: flex;
  flex-direction: column;
  .main_title {
    font-family: 'GowunDodum-Regular';
    margin: 4rem;
    font-size: 2rem;
  }

  .main_menu {
    overflow-y: auto;
    height: 70vw;

    .first_row,
    .second_row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 200px;

      img {
        width: 100px;
      }

      p {
        color: black;
        font-family: SeoulNamsanM;
      }

      .greenhouse,
      .mypage,
      .newroll,
      .store {
        display: flex;
        flex-direction: column;
        height: 20px;
        margin: 1rem;
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
`;

export default Mainpage;
