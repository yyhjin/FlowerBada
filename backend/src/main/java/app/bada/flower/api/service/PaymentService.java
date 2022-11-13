package app.bada.flower.api.service;

import app.bada.flower.api.dto.payment.PaymentReadyReqDto;
import app.bada.flower.api.dto.payment.PaymentSuccessResDto;

public interface PaymentService {
    public String paymentReady(PaymentReadyReqDto paymentReadyReqDto);
    public PaymentSuccessResDto paymentApproval(String pgToken, String tid);
}
