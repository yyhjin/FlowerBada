import { IuserRecoil, userReCoil } from '../../recoil/userRecoil';
import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '@src/index.css';
import messageAPI from '@src/api/messageAPI';
import { useNavigate } from 'react-router-dom';
import MySwal from '@components/SweetAlert';

export default function MessageWrite(props: {
  flower: number;
  rolling: number;
  rollingUrl: string;
}) {
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);
  let [msgContent, setMsgContent] = useState<string>('');
  let [msgLength, setMsgLength] = useState<number>(0);
  let [msgWriter, setMsgWriter] = useState<string>('');
  let [font, setFont] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    setMsgContent('');
    setMsgLength(0);
    setFont('SeoulNamsanM');
    document.getElementById('content')!.style.fontFamily = 'SeoulNamsanM';
    document.getElementById('writer')!.style.fontFamily = 'SeoulNamsanM';
    // console.log(props.flower);
  }, []);

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsgContent(e.target.value);
    setMsgLength(e.target.value.length);
  };

  const changeWriter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsgWriter(e.target.value);
  };

  const changeFont = (param: string) => {
    setFont(param);
    const element = document.getElementById('content');
    element!.style.fontFamily = param;

    document.getElementById('writer')!.style.fontFamily = param;
  };

  const createMsg = () => {
    if (msgContent == '') {
      MySwal.fire({
        title: '메시지를 입력해주세요',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
      document.getElementById('content')?.focus();
    } else if (msgWriter == '') {
      MySwal.fire({
        title: '작성자를 입력해주세요',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
      document.getElementById('writer')?.focus();
    } else {
      messageAPI
        .messageWrite({
          content: msgContent,
          writer: msgWriter,
          flowerId: props.flower,
          font: font,
          rollingId: props.rolling,
        })
        .then((res) => {
          // console.log(res.data.response);
          MySwal.fire({
            title: '메세지가 등록되었습니다.',
            icon: 'success',
            confirmButtonColor: '#16453e',
            confirmButtonText: '확인',
          }).then(() => {
            navigate(`/rolling/` + props.rollingUrl);
          });
        })
        .catch((err) => {
          MySwal.fire({
            title: '메세지 등록을 실패하였습니다.',
            icon: 'warning',
            confirmButtonColor: '#16453e',
            confirmButtonText: '확인',
          }).then(() => {
            navigate(`/rolling/` + props.rollingUrl);
          });
        });
    }
  };

  return (
    <div css={Background}>
      <div css={WriteBox}>
        <div className="content-css">
          <textarea
            id="content"
            className="input-css"
            placeholder="메시지를 작성해주세요"
            maxLength={120}
            onChange={changeContent}
          ></textarea>
        </div>
        <div>
          <span className="writer-css">
            FROM.&nbsp;
            <input
              id="writer"
              className="writer-input"
              type={'text'}
              placeholder="작성자"
              maxLength={10}
              onChange={changeWriter}
            ></input>
          </span>
          <div css={MsgLimit}>{msgLength}/120</div>
        </div>
      </div>
      <div style={{ fontSize: '16px' }}>마음에 드는 글씨체를 선택하세요!</div>
      <div css={FontBox}>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('Bazzi')}
          style={{ fontFamily: 'Bazzi' }}
        >
          넥슨배찌체
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('Shilla_Gothic-Bold')}
          style={{ fontFamily: 'Shilla_Gothic-Bold' }}
        >
          신라고딕체
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('EnvironmentR')}
          style={{ fontFamily: 'EnvironmentR' }}
        >
          환경체
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('yleeMortalHeartImmortalMemory')}
          style={{ fontFamily: 'yleeMortalHeartImmortalMemory' }}
        >
          ylee 추억은 잠들지 않는다
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('KyoboHandwriting2020A')}
          style={{ fontFamily: 'KyoboHandwriting2020A' }}
        >
          교보손글씨 2020 박도연
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('Galmetgol')}
          style={{ fontFamily: 'Galmetgol' }}
        >
          갈맷글
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('SlowSlow')}
          style={{ fontFamily: 'SlowSlow' }}
        >
          느릿느릿체
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('mom_to_daughter')}
          style={{ fontFamily: 'mom_to_daughter' }}
        >
          딸에게 엄마가
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('Bareun_hipi')}
          style={{ fontFamily: 'Bareun_hipi' }}
        >
          바른히피
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('NIXGONM-Vb')}
          style={{ fontFamily: 'NIXGONM-Vb' }}
        >
          닉스곤폰트
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => changeFont('UhBeemysen')}
          style={{ fontFamily: 'UhBeemysen' }}
        >
          어비 마이센체
        </ColorButton>
      </div>
      <div css={ButtonBox}>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            css={MainButton}
            onClick={createMsg}
          >
            작성하기
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#ffffff',
  height: '5vh',
  color: '#000000',
  margin: '1vh',
  flex: '0 0 auto',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#B1BDBB',
    borderColor: '#B1BDBB',
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: '#B1BDBB',
    borderColor: '#B1BDBB',
    boxShadow: 'none',
  },
  '&:focus': {
    backgroundColor: '#B1BDBB',
    // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
}));

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#16453E',
    },
    neutral: {
      main: '#B1BDBB',
    },
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}

const Background = css`
  height: 100%;
`;
const ButtonBox = css`
  height: 20%;
  position: relative;
`;

const MainButton = css`
  width: 90%;
  margin-top: -0.5vh;
  margin-bottom: 1vh;
  padding: 1.5vh;
  border-radius: 10px;
  font-size: 1em;
  transform: translate(0, 50%);
  font-family: 'SeoulNamsanM';
`;

const WriteBox = css`
  margin: 0 10vw 2vh 10vw;
  height: 18em;
  font-size: 1.5vh;

  .content-css {
    background-color: white;
    height: 10em;
    overflow-y: scroll;
    margin-top: 3vh;
  }

  .input-css {
    font-size: 18px;
    width: 85%;
    height: 3.5em;
    border: 0px;
    margin: 2vh;
    resize: none;
  }

  .writer-css {
    background-color: white;
    margin-top: 2vh;
    width: 50%;
    padding: 1vh;
    text-align: left;
    float: left;
    font-size: 18px;

    .writer-input {
      border: 0px;
      width: 50%;
      font-size: 18px;
    }
  }
  @media screen and (min-width: 500px) {
    margin: 2vw;
  }
`;

const MsgLimit = css`
  float: right;
  font-size: 13px;
`;
const FontBox = css`
  /* height: 7%; */
  /* margin: 1vh 2.5vh 0 2.5vh; */
  margin: 2% 5% 0 5%;
  /* margin-left: 5%; */
  /* margin-right: 5%; */
  overflow-x: scroll;
  display: flex;
  flex-flow: nowrap;
`;
