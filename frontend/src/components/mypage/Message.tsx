import messageAPI from '@src/api/messageAPI';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import WbTwilight from '@mui/icons-material/WbTwilight';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { css } from '@emotion/react';
import MySwal from '@components/SweetAlert';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';

interface IMsg {
  messageId?: number;
  flowerId?: number;
  content?: string;
  writer?: string;
  font?: string;
  imgUrl?: string;
}

export default function Message(props: {
  imgUrl: string;
  messageId: number;
  writer: string;
  valid: Boolean;
  writerDisplay: Boolean;
}) {
  const [msg, setMsg] = useState<IMsg>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const [reportContent, setReportContent] = useState<string>('');
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);

  async function getMessage() {
    messageAPI
      .messageCreate(props.messageId)
      .then((res) => {
        setMsg(res.data.response);

        document.getElementById('content')!.style.fontFamily =
          res.data.response.font;
      })
      .catch((err) => {
        console.log(err);
      });
    changeModal(true);
  }

  const changeModal = (params: any) => {
    setOpenModal(params);
  };

  const changeReportModal = (params: any) => {
    setOpenReportModal(params);
    setReportContent('');
  };

  const sendReport = () => {
    if (reportContent == '') {
      MySwal.fire({
        title: '내용을 입력해주세요',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
    } else {
      if (msg.messageId) {
        messageAPI
          .report({
            messageId: msg.messageId,
            userId: loginUser.id,
            content: reportContent,
          })
          .then((res) => {
            setMsg(res.data.response);
            console.log(res.data.response);
            MySwal.fire({
              title: '신고가 접수되었습니다',
              icon: 'success',
              confirmButtonColor: '#16453e',
              confirmButtonText: '확인',
            });
          })
          .catch((err) => {
            console.log(err);
          });
        changeReportModal(false);
        changeModal(false);
      }
    }
  };

  useEffect(() => {
    let writerEls = document.getElementsByClassName('f-inner');
    for (let el of writerEls) {
      if (el.textContent && el.textContent.length >= 5) {
        el.textContent = el.textContent?.substring(0, 4) + '...';
      }
    }
  }, []);

  return (
    <>
      {props.valid ? (
        <>
          {props.writerDisplay ? (
            <>
              <div css={FlowerCss} className="f-wrap">
                <div className="f-imgbox" onClick={getMessage}>
                  <img src={'/src/assets/' + props.imgUrl}></img>
                </div>
                <div className="f-inner">{props.writer}</div>
              </div>
              <div>
                {/* 메시지 조회 Modal */}
                <DialogCustom open={openModal}>
                  {/* 신고 Modal */}
                  <DialogReport open={openReportModal} css={ReportDialog}>
                    <DialogTitle className="title">
                      <WbTwilight color="error" />
                      &nbsp; 메시지 신고하기
                    </DialogTitle>
                    <DialogContent>
                      {/* <br /> */}
                      <DialogContentText className="content">
                        신고자 : {loginUser.nickname}
                        <br />
                        신고 사유
                      </DialogContentText>
                      {/* <br /> */}
                      <textarea
                        className="input-content"
                        value={reportContent}
                        placeholder="신고 사유를 입력하세요"
                        onChange={(e) => setReportContent(e.target.value)}
                      ></textarea>
                    </DialogContent>
                    <DialogActions className="action">
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={sendReport}
                          css={Font}
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
                          css={Font}
                        >
                          취소
                        </Button>
                      </ThemeProvider>
                    </DialogActions>
                  </DialogReport>

                  <div>
                    <DialogContent>
                      <div style={{ textAlign: 'center' }}>
                        <img
                          src={'/src/assets/' + msg.imgUrl}
                          width="70%"
                        ></img>
                      </div>
                      <DialogContentTextCustom>
                        <IconButton
                          css={ReportIcon}
                          color="error"
                          aria-aria-label="report"
                          onClick={(e) => changeReportModal(true)}
                        >
                          <WbTwilight />
                        </IconButton>
                        <br />
                        {/* 개행문자 적용 */}
                        <div id="content">
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
                        </div>
                      </DialogContentTextCustom>
                      <div css={ReportIcon}>
                        <ThemeProvider theme={theme}>
                          <IconButton onClick={(e) => changeModal(false)}>
                            <CloseIcon color="secondary" />
                          </IconButton>
                        </ThemeProvider>
                      </div>
                    </DialogContent>
                  </div>
                </DialogCustom>
              </div>
            </>
          ) : (
            <>
              <div css={FlowerCss} className="f-wrap">
                <div className="f-imgbox">
                  <img src={'/src/assets/' + props.imgUrl}></img>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div css={FlowerCss} className="f-wrap">
          <div className="f-imgbox">
            <img
              src={
                '/src/assets/' + props.imgUrl.replaceAll('flower', 'flowerbud')
              }
            ></img>
          </div>
          <div className="f-inner">{props.writer}</div>
        </div>
      )}
    </>
  );
}
const FlowerCss = css`
  .f-wrap {
    width: 100%;
    position: relative;
  }
  .f-imgbox img {
    position: absolute;
    width: 30vw;
    vertical-align: middle;
    @media screen and (max-height: 700px) {
      width: 25vw;
    }
  }
  .f-inner {
    position: absolute;
    left: 60%;
    top: 7vw;
    color: white;
    text-shadow: 2px 2px 2px gray;
    font-size: 4.5vw;
    @media screen and (max-height: 700px) {
      left: 60vw;
      font-size: 4vw;
    }
  }
`;

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

  '& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
    backgroundColor: 'rgb(0 0 0 / 80%)',
  },
}));

const DialogReport = styled(Dialog)(() => ({
  '& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
    backgroundColor: '#2F2F2F',
  },

  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    width: '65%',
    // height: '22em',
  },
}));

const DialogContentTextCustom = styled(DialogContentText)(() => ({
  backgroundColor: '#FFFFFF',
  color: '#000000',
  padding: '15px',
  margin: 'auto',
  fontSize: '18px',
}));

const DialogConent = styled(DialogContent)(() => ({
  '& .MuiDialogTitle-root+.css-ypiqx9-MuiDialogContent-root': {
    padding: '0px',
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
    secondary: {
      main: '#ffffff',
    },
  },
});

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    secondary: true;
  }
}

const ReportDialog = css`
  font-family: 'SeoulNamsanM';

  .title {
    font-family: 'SeoulNamsanM';
    /* float: left; */
    padding: 20px;
  }

  .content {
    font-family: 'SeoulNamsanM';
    color: rgba(0, 0, 0, 0.7);
    line-height: 2em;
  }

  .input-content {
    font-family: 'SeoulNamsanM';
    resize: none;
    padding: 15px;
    border-color: #b9b9b9;
    border-radius: 4px;
    font-size: 15px;
  }

  .action {
    /* margin-bottom: 20px; */
    float: right;
    width: 90%;
    font-family: 'SeoulNamsanM';
    /* padding: 20px; */
  }
`;

const ReportIcon = css`
  float: right;
`;

const Font = css`
  font-family: 'SeoulNamsanM';
`;
