import axios from 'axios';
import React from 'react';
import { IuserRecoil, userReCoil } from '../recoil/userRecoil';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import WbTwilight from '@mui/icons-material/WbTwilight';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

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

interface IMsg {
  messageId?: number;
  flowerId?: number;
  content?: string;
  writer?: string;
  fontId?: number;
  imgUrl?: string;
}

export default function MessageRead() {
  let [messageId, setMessageId] = useState<number>(0);
  let [msg, setMsg] = useState<IMsg>({});
  let [openModal, setOpenModal] = useState<boolean>(false);
  let [openReportModal, setOpenReportModal] = useState<boolean>(false);
  let [reportContent, setReportContent] = useState<string>('');
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);

  const getMessage = async (): Promise<void> => {
    const url = `http://localhost:8080/api/v1/message/${messageId}`;
    axios
      .get(url)
      .then((res) => {
        setMsg(res.data.response);
        console.log(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
    changeModal(true);

    // try {
    //   const res: any = await axios.get(
    //     `http://localhost:8080/api/v1/message/${messageId}`,
    //   );
    //   console.log(res);
    // } catch (err: any) {
    //   console.log(err);
    // }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageId(+e.target.value);
  };

  const changeModal = (params: any) => {
    setOpenModal(params);
  };

  const changeReportModal = (params: any) => {
    setOpenReportModal(params);
    setReportContent('');
  };

  const sendReport = () => {
    if (reportContent == '') {
      alert('내용을 입력해주세요');
    } else {
      const url = `http://localhost:8080/api/v1/message/report`;
      axios
        .post(url, {
          messageId: msg.messageId,
          userId: loginUser.id,
          content: reportContent,
        })
        .then((res) => {
          setMsg(res.data.response);
          console.log(res.data.response);
          alert('신고가 접수되었습니다');
        })
        .catch((err) => {
          console.log(err);
        });
      changeReportModal(false);
      changeModal(false);
    }
  };

  return (
    <>
      <div>메시지 조회</div>
      <input type={'number'} onChange={change}></input>
      <button type="button" onClick={getMessage}>
        조회하기
      </button>
      {messageId}
      <br />
      {openModal ? (
        <>
          <div>
            {/* 메시지 조회 Modal */}
            <DialogCustom open={openModal}>
              {/* 신고 Modal */}
              <Dialog open={openReportModal}>
                <DialogTitle>신고하기</DialogTitle>
                <DialogContent>
                  <br />
                  <DialogContentText color={'black'}>
                    신고자 : {loginUser.nickname}
                  </DialogContentText>
                  <br />
                  내용
                  <br />
                  <textarea
                    style={{ resize: 'none' }}
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions style={{ margin: '10px' }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      // endIcon={<SendIcon />}
                      onClick={sendReport}
                    >
                      신고
                    </Button>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="neutral"
                      size="small"
                      onClick={(e) => changeReportModal(false)}
                    >
                      취소
                    </Button>
                  </ThemeProvider>
                </DialogActions>
              </Dialog>

              <div>
                <DialogContent>
                  <div style={{ textAlign: 'center' }}>
                    <img src={msg.imgUrl} width="200px"></img>
                  </div>
                  <DialogContentTextCustom>
                    <IconButton
                      color="error"
                      aria-aria-label="report"
                      style={{ float: 'right' }}
                      onClick={(e) => changeReportModal(true)}
                    >
                      <WbTwilight />
                    </IconButton>
                    <br />
                    {/* 개행문자 적용 */}
                    {String(msg.content)
                      .split('\n')
                      .map((line, index) => {
                        return (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        );
                      })}
                    <br />
                    FROM. {msg.writer}
                  </DialogContentTextCustom>
                  <div style={{ float: 'right' }}>
                    <IconButton onClick={(e) => changeModal(false)}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                </DialogContent>
              </div>
            </DialogCustom>
          </div>
        </>
      ) : null}
    </>
  );
}

const DialogCustom = styled(Dialog)(() => ({
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '100%',
  },
  '& .css-ypiqx9-MuiDialogContent-root': {
    margin: 'auto',
    width: '70%',
  },
}));

const DialogContentTextCustom = styled(DialogContentText)(() => ({
  backgroundColor: '#FFFFFF',
  color: '#000000',
  padding: '15px',
  width: '70%',
  margin: 'auto',
}));
