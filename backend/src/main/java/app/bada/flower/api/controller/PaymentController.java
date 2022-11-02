package app.bada.flower.api.controller;

import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.payment.PaymentSuccessReqDto;
import app.bada.flower.api.dto.payment.PaymentSuccessResDto;
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
    public ResponseEntity<ResponseDto> requestPayment(@PathVariable Integer rollingId) {
        String res = paymentService.paymentReady(rollingId);
        return new ResponseEntity<>(new ResponseDto(res), HttpStatus.OK);
    }

    @PostMapping("/success")
    @ApiOperation(value="결제완료", notes="결제 완료 결과를 보냄")
    public ResponseEntity<ResponseDto> successPayment(@RequestBody PaymentSuccessReqDto paymentSuccessReqDto) {
        PaymentSuccessResDto res = paymentService.paymentApproval(paymentSuccessReqDto.getPgToken(), paymentSuccessReqDto.getOrderId());
        return new ResponseEntity<>(new ResponseDto(res), HttpStatus.OK);
    }
}
