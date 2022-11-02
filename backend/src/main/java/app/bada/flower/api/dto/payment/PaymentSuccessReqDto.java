package app.bada.flower.api.dto.payment;

import lombok.Data;

@Data
public class PaymentSuccessReqDto {
    private String pgToken;
    private String orderId;
}
