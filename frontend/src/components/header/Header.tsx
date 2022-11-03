import menuIcon from '@assets/Menu.png';
import backArrow from '@assets/backArrow.png';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (e: any) => {
    setOpen(!open);
  };

  const preventFocusMove = (event: any) => {
    event.preventDefault();
  };

  const logout = async () => {
    try {
      const res: any = await axios.post(
        'http://localhost:8080/api/v1/user/signout',
        {},
        {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        },
      );
      setLoginUser((prev: IuserRecoil) => {
        const variable = { ...prev };
        variable.id = 0;
        variable.userToken = '';
        variable.nickname = '';
        variable.points = 0;
        variable.jwt = '';
        return variable;
      });
      // alert('logout success!');
      window.location.href = '/';
    } catch (err: any) {
      console.log(err);
    }
  };

  const linkToNewRoll = () => {
    navigate('/newroll');
  };

  const linkToGreenHouse = () => {
    navigate('/greenhouse');
  };

  const linkToStore = () => {
    navigate('/store');
  };

  const linkToMyPage = () => {
    navigate('/mypage');
  };

  return (
    <header css={HeaderNav}>
      <nav>
        <a onClick={() => navigate(-1)} css={BackArrow}>
          <img height="20px" width="20px" id="back" src={backArrow}></img>
        </a>
        <span css={InlineBlock}>
          <h3>꽃바다</h3>
        </span>
        <a
          href="#"
          className="dropdown"
          css={Menu}
          onClick={handleOpen}
          onBlur={handleOpen}
        >
          <img height="20px" width="20px" id="menu" src={menuIcon}></img>
          {open ? (
            <ul className="menu" onMouseDown={preventFocusMove}>
              <li className="menu-item">
                <button onClick={linkToNewRoll}>
                  <span css={BlackText}>새로만들기</span>
                </button>
              </li>
              <li className="menu-item">
                <button onClick={linkToGreenHouse}>
                  <span css={BlackText}>그린하우스</span>
                </button>
              </li>
              <li className="menu-item">
                <button onClick={linkToStore}>
                  <span css={BlackText}>상점</span>
                </button>
              </li>
              <li className="menu-item">
                <button onClick={linkToMyPage}>
                  <span css={BlackText}>마이페이지</span>
                </button>
              </li>
              <li className="menu-item">
                <button onClick={logout}>
                  <span css={RedText}>로그아웃</span>
                </button>
              </li>
            </ul>
          ) : null}
        </a>
      </nav>
    </header>
  );
}

const HeaderNav = css`
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 450px;
  max-width: 1280px;
  height: 60px;
  margin: 0 auto;
  background-color: #f2f0ef;

  .dropdown {
    position: relative;
  }

  .menu {
    position: absolute;
    list-style-type: none;
    margin: 5px 0 0 0;
    padding: 0;
    border: 1px solid grey;
    width: 100px;
    right: 0px;
  }

  .menu > li {
    margin: 0;
    background-color: white;
  }

  .menu > li:hover {
    background-color: lightgray;
  }

  .menu > li > button {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    text-align: left;
    background: none;
    color: inherit;
    border: none;
    padding: 5px;
    margin: 0;
    font: inherit;
    cursor: pointer;
  }
`;

const BackArrow = css`
  text-decoration: none;
  float: left;
`;

const InlineBlock = css`
  display: inline-block;
`;

const Menu = css`
  text-decoration: none;
  float: right;
`;

const BlackText = css`
  color: black;
`;

const RedText = css`
  color: red;
`;
