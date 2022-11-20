package app.bada.flower.api.dto.payment;

import lombok.Data;

@Data
public class PaymentReadyReqDto {
    private String optionType;
    private int rollingId;
    private String imgUrl;
    private int flowerCnt;
    private int paginationId;
    private String title;
    private String userToken;
    private int price;
    private String receiverName;
    private String receiverPhone;
    private String receiverAddress;
    private String senderName;
    private String senderPhone;
    private String senderMsg;
    private boolean isAnonymous;
}
