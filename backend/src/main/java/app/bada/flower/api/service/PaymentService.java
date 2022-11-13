package app.bada.flower.api.service;

import app.bada.flower.api.dto.payment.PaymentSuccessResDto;

public interface PaymentService {
    public String paymentReady(int rollingId);
    public PaymentSuccessResDto paymentApproval(String pgToken, String tid);
}
