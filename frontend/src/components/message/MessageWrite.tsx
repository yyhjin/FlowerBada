import axios from 'axios';
import React from 'react';
import { IuserRecoil, userReCoil } from '../../recoil/userRecoil';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '@src/index.css';

export default function MessageWrite(props: { flower: number }) {
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);
  let [msgContent, setMsgContent] = useState<string>('');
  let [msgLength, setMsgLength] = useState<number>(0);
  let [msgWriter, setMsgWriter] = useState<string>('');
  let [font, setFont] = useState<string>('');

  useEffect(() => {
    setMsgContent('');
    setMsgLength(0);
    setFont('SeoulNamsanM');
    document.getElementById('content')!.style.fontFamily = 'SeoulNamsanM';
    document.getElementById('writer')!.style.fontFamily = 'SeoulNamsanM';
    console.log(props.flower);
  }, []);

  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      alert('메시지를 입력해주세요');
      document.getElementById('content')?.focus();
    } else if (msgWriter == '') {
      alert('작성자를 입력해주세요');
      document.getElementById('writer')?.focus();
    }
    // else if (fontId == 0) {
    //   alert('폰트를 선택해주세요');
    // }
    else {
      const url = `http://localhost:8080/api/v1/message`;
      axios
        .post(url, {
          content: msgContent,
          writer: msgWriter,
          flowerId: props.flower,
          font: font,
          rollingId: 2,
        })
        .then((res) => {
          console.log(res.data.response);
          alert('메시지가 등록되었습니다');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div css={WriteBox}>
        <div className="content-css">
          <textarea
            id="content"
            className="input-css"
            placeholder="메시지를 작성해주세요"
            maxLength={200}
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
              onChange={changeWriter}
            ></input>
          </span>
          <span style={{ float: 'right', fontSize: '11px' }}>
            {msgLength}/200
          </span>
        </div>
      </div>
      <span style={{ fontSize: '2vh' }}>마음에 드는 글씨체를 선택하세요!</span>
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
    </>
  );
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#ffffff',
  height: '5vh',
  color: '#000000',
  margin: '1vh',
  flex: '0 0 auto',
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

const ButtonBox = css`
  height: 20%;
  position: relative;
`;

const MainButton = css`
  width: 90%;
  /* margin-top: 0.5vh; */
  margin-bottom: 1vh;
  padding: 1vh;
  border-radius: 10px;
  font-size: 2vh;
  transform: translate(0, 50%);
`;

// const MainButton = css`
//   width: 90%;
//   margin-top: 15px;
//   margin-bottom: 15px;
//   border-radius: 10px;
// `;

const WriteBox = css`
  margin: 0 10vw 2vh 10vw;
  height: 30%;
  font-size: 1.5vh;

  .content-css {
    background-color: white;
    height: 65%;
    overflow-y: scroll;
  }

  .input-css {
    font-size: 1.5vh;
    width: 85%;
    height: 70%;
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

    .writer-input {
      border: 0px;
      width: 50%;
      font-size: 1vh;
    }
  }
`;

const FontBox = css`
  height: 7%;
  margin: 1vh 2.5vh 0 2.5vh;
  overflow-x: scroll;
  display: flex;
  flex-flow: nowrap;
`;
