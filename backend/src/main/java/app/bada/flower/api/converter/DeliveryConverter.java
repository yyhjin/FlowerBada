package app.bada.flower.api.converter;

import app.bada.flower.api.dto.mypage.DeliveryResDto;
import app.bada.flower.api.entity.Delivery;
import org.springframework.stereotype.Component;

@Component
public class DeliveryConverter {
    public DeliveryResDto EntityToDto(Delivery delivery){
        DeliveryResDto dto = new DeliveryResDto();
        dto = DeliveryResDto.builder()
                .paperId(delivery.getRollingPaper().getId())
//                .title(delivery.getRollingPaper().getContent())
                .imgUrl(delivery.getRollingPaper().getImgUrl())
                .pageUrl(delivery.getRollingPaper().getUrl())
                .date(dto.changeDateToString(delivery.getRollingPaper().getOpen_date()))
                .sender(delivery.getSenderName())
                .receiver(delivery.getReceiverName())
                .flowerCount(delivery.getFlowersCount())
                .price(delivery.getPrice())
                .status(delivery.getDeliveryState().getName())
                .build();
        return dto;
    }
}
