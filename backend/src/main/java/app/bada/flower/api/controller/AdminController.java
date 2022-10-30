package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.admin.AdminReqDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.service.MessageService;
import app.bada.flower.api.service.RollingPaperService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "관리자 API", tags = {"관리자"})
@CrossOrigin("*")
@RequestMapping("/admin")
@RestController
@RequiredArgsConstructor
public class AdminController {

    private final MessageService messageService;
    private final RollingPaperService rollingPaperService;

    @PatchMapping("/message/delete")
    @ApiOperation(value = "메시지 삭제", notes = "롤링페이퍼의 메시지를 삭제한다.")
    public ResponseEntity<ResponseDto> deleteMsg(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestBody AdminReqDto.MessageReq messageReq) {

        Message message = messageService.deleteMessage(messageReq.getMessageId());
        
        if (message != null) {
            return new ResponseEntity<>(new ResponseDto("message deleted success"), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("message deleted fail"), HttpStatus.FORBIDDEN);
        }
    }


    @PatchMapping("/rolling/delete")
    @ApiOperation(value = "롤링페이퍼 삭제", notes = "롤링페이퍼를 삭제한다.")
    public ResponseEntity<ResponseDto> deleteRolling(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestBody AdminReqDto.RollingReq rollingReq) {

        RollingPaper rollingPaper = rollingPaperService.deleteRolling(rollingReq.getRollingId());

        if (rollingPaper != null) {
            return new ResponseEntity<>(new ResponseDto("rolling paper deleted success"), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("rolling paper deleted fail"), HttpStatus.FORBIDDEN);
        }
    }

}
