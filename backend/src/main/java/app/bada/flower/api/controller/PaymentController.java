package app.bada.flower.api.controller;

import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.user.SignInReqDto;
import app.bada.flower.api.dto.user.SignInResDto;
import app.bada.flower.api.service.PaymentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "결제 API", tags = {"결제"})
@CrossOrigin("*")
@RequestMapping("/payment")
@RestController
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/{rollingId}")
    @ApiOperation(value="결제요청", notes="결제 요청을 보냄")
    public ResponseEntity<ResponseDto> signIn(@PathVariable Integer rollingId) {
        return new ResponseEntity<>(new ResponseDto(rollingId + "결제 실패"), HttpStatus.FORBIDDEN);
    }
}
