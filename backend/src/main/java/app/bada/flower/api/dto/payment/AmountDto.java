package app.bada.flower.api.dto.payment;

import lombok.Data;

@Data
public class AmountDto {
    private Integer total;
    private Integer tax_free;
    private Integer vat;
    private Integer point;
    private Integer discount;
}
