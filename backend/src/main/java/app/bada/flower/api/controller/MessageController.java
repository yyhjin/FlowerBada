package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.dto.rolling.RollingImgDto;
import app.bada.flower.api.dto.rollingpaper.RollingPaperResDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.entity.Report;
import app.bada.flower.api.service.MessageService;
import app.bada.flower.api.service.ReportService;
import app.bada.flower.api.service.RollingPaperService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Base64;

@Api(value = "메시지 API", tags = {"메시지"})
@CrossOrigin("*")
@RequestMapping("/message")
@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final ReportService reportService;
    private final RollingPaperService rollingPaperService;

    @PostMapping
    @ApiOperation(value = "메시지 등록", notes = "롤링페이퍼에 새로운 메시지를 생성한다.")
    public ResponseEntity<ResponseDto> createMsg(@RequestBody MessageReqDto.MessageReq messageReq) {

        Message message = messageService.createMessage(messageReq);
        
        if (message != null) {
            return new ResponseEntity<>(new ResponseDto(message.getId()), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("message create fail"), HttpStatus.FORBIDDEN);
        }
    }


    @GetMapping("/{msgId}")
    @ApiOperation(value = "메시지 조회", notes = "선택한 메시지를 조회한다.")
    public ResponseEntity<ResponseDto> getMsg(@PathVariable Integer msgId) {

        Message message = messageService.getMessage(msgId);
        MessageResDto.MessageDto messageResDto = new MessageResDto.MessageDto(message);

        if(messageResDto.getMessageId() != 0) {
            return new ResponseEntity<>(new ResponseDto(messageResDto), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("message get fail"), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/report")
    @ApiOperation(value = "메시지 신고", notes = "메시지를 신고한다.")
    public ResponseEntity<ResponseDto> reportMsg(@RequestBody MessageReqDto.ReportReq reportReq) {

        Report report = reportService.createReport(reportReq);

        if (report != null) {
            return new ResponseEntity<>(new ResponseDto("message reported success"), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("message reported fail"), HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "*QueryDSL SAMPLE*내용으로 검색", notes="메시지에 포함되는 내용 검색", httpMethod = "GET")
    @GetMapping("/search/{content}")
    public ResponseEntity<ResponseDto> searchMsgByContent(@PathVariable String content) {
        return new ResponseEntity<>(new ResponseDto(messageService.search(content)), HttpStatus.OK);
    }

    @GetMapping("/{url}/{paginationId}")
    @ApiOperation(value="롤링페이퍼 조회", notes="롤링페이퍼를 조회한다.")
    public ResponseEntity<ResponseDto> getRollingPaper(@PathVariable("url") String url,
                                                       @PathVariable("paginationId") int paginationId) {
        RollingPaperResDto rollingPaperResDto = rollingPaperService.getRollingPaper(url, paginationId);

        if (rollingPaperResDto!=null) {
            return new ResponseEntity<ResponseDto>(new ResponseDto(rollingPaperResDto), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<ResponseDto>(new ResponseDto("롤링페이퍼 조회 실패"), HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/updateimg/{rollingUrl}")
    @ApiOperation(value="롤링페이퍼 이미지 갱신", notes="롤링페이퍼의 현재 s3 버킷에 저장된 이미지를 갱신한다.")
    public ResponseEntity updateRollingImg(@PathVariable("rollingUrl") String url, @RequestBody RollingImgDto dto) {
        String img = dto.getImg();
        try {
            messageService.updateRollingImage(url, img);
        } catch(IOException e){
            return new ResponseEntity("파일 입출력 오류", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch(IllegalArgumentException e){
            return new ResponseEntity("해당 롤링페이퍼가 존재하징 않습니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
