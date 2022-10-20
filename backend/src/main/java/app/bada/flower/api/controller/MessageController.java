package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.service.MessageService;
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

    @PostMapping
    @ApiOperation(value="메시지 등록", notes="롤링페이퍼에 새로운 메시지를 생성한다.")
    public ResponseEntity<ResponseDto> signIn(@RequestBody MessageReqDto messageReqDto) {

        Message message = messageService.createMessage(messageReqDto);
        
        if (message.getId() != null) {
            return new ResponseEntity<ResponseDto>(new ResponseDto(message.getId()), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<ResponseDto>(new ResponseDto("메시지 등록 실패"), HttpStatus.FORBIDDEN);
        }
    }
}
