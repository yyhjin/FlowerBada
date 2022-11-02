package app.bada.flower.api.dto.payment;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentReadyDto {
    private String tid;
    private String next_redirect_pc_url;
    private LocalDateTime created_at;
}
