package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.entity.Report;
import app.bada.flower.api.service.MessageService;
import app.bada.flower.api.service.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "메시지 API", tags = {"메시지"})
@CrossOrigin("*")
@RequestMapping("/message")
@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final ReportService reportService;

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
}
