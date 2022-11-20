import { css } from '@emotion/react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function Manual() {
  sessionStorage.setItem('url', '/manual');

  return (
    <div css={totalCSS}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>롤링 페이퍼 만들기</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>1. 마음에 드는 꽃다발을 선택합니다.</div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/1-1.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>2. 제목을 입력한 후 개봉할 날짜를 선택합니다.</div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/1-2.png"
              className="imgBox"
            ></img>
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/1-3.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>3. URL 및 카카오톡을 이용하여 주변에 공유합니다.</div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/1-4.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>
            4. 해당 롤링페이퍼는 개봉날짜가 지나면 메세지를 작성할 수 없으며
            꽃다발 배달을 위한 결제 시스템이 열리게됩니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/1-5.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>
            5. 결제를 완료하면 실제 꽃배달 서비스를 받아보실 수 있습니다.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>롤링 페이퍼 작성하기</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            1. 만든 롤링페이퍼 페이지 오른쪽 아래에 있는 더하기 버튼을 눌러 연필
            모양 버튼을 클릭합니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/2-7.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>2. 마음에 드는 꽃을 선택합니다.</div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/2-2.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>
            3. 메세지, 작성자를 작성한 후 마음에 드는 글씨체를 선택하여 메세지를
            작성합니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/2-3.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>
            4. 해당 메세지는 개봉 전에 봉오리로 보이며 메세지를 볼 수 없지만,
            개봉 후에는 만개한 꽃으로 변하며 메세지를 볼 수 있게됩니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/2-4.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>
            5. 한번 작성한 메세지는 수정 및 삭제가 불가하지만 신고를 통해
            관리자가 삭제할 수 있습니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/2-5.png"
              className="imgBox"
            ></img>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>롤링페이퍼 출력하기</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            1. 작성 기간이 종료된 롤링페이퍼에서 더하기 버튼을 눌러 프린트
            아이콘을 선택합니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/6-1.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>2. 안내창을 확인하고 확인 버튼을 누릅니다.</div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/6-2.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>
            3. 출력창이 뜨면 배경 그래픽 옵션을 선택하고 PDF로 저장하거나
            프린트를 선택하여 출력합니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/6-3.png"
              className="imgBoxWide"
            ></img>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>그린하우스</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            1. 내가 만들거나 즐겨찾기한 롤링페이퍼 목록을 볼 수 있는
            페이지입니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/3-1.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>
            2. 마음에 드는 롤링페이퍼를 즐겨찾기해서 나만의 목록을 만들어보세요.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>꽃가게</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            1. 모은 포인트를 이용해서 마음에 드는 꽃 또는 롤링페이퍼를 구매할 수
            있습니다.
          </div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/4-1.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>2. 회원가입과 매일 출석체크를 통해 포인트를 모아보세요!</div>
          <hr />
          <div>
            3. 일반 롤링페이퍼는 한 페이지 기준 7송이, 고급 8송이, 바구니
            10송이를 담을 수 있습니다.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>마이페이지</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>1. 내가 결제한 롤링페이퍼의 배송상태를 볼 수 있습니다.</div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/5-1.png"
              className="imgBox"
            ></img>
          </div>
          <hr />
          <div>2. 포인트로 구매한 아이템 목록을 볼 수 있습니다.</div>
          <div>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/hongjoo.flowerbada.project/manual/5-2.png"
              className="imgBox"
            ></img>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className="footer">
        <p style={{ color: 'gray', textAlign: 'right', marginRight: '1rem' }}>
          {' '}
          Copyright © 2022 꽃보다싸피
          <br />
          Email: flowerbada405@naver.com
        </p>
      </div>
    </div>
  );
}

const totalCSS = css`
  width: 100vw;
  height: 100%;
  position: relative;
  overflow-y: auto;
  text-align: left;

  .imgBox {
    /* display: none; */
    width: 50%;
    margin-top: 2vw;
    margin-left: 20vw;
    @media screen and (min-height: 500px) {
      margin-top: 10px;
      margin-left: 100px;
    }
  }
  .imgBoxWide {
    width: 90%;
    margin-top: 2vw;
    margin-left: 20vw;
    @media screen and (min-height: 500px) {
      margin-top: 10px;
      margin-left: 30px;
    }
  }

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;
