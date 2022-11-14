package app.bada.flower.api.converter;

import app.bada.flower.api.dto.mypage.DeliveryResDto;
import app.bada.flower.api.entity.Delivery;
import app.bada.flower.api.util.S3FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DeliveryConverter {
    @Autowired
    S3FileUpload s3FileUpload;
    public DeliveryResDto EntityToDto(Delivery delivery){
        DeliveryResDto dto = new DeliveryResDto();
        dto = DeliveryResDto.builder()
                .paperId(delivery.getRollingPaper().getId())
                .title(delivery.getRollingPaper().getTitle())
                .imgUrl(s3FileUpload.File_Server_Url+delivery.getImgUrl())
                .pageUrl(delivery.getRollingPaper().getUrl())
                .date(dto.changeDateToString(delivery.getCreatedDate()))
                .sender(delivery.getSenderName())
                .receiver(delivery.getReceiverName())
                .flowerCount(delivery.getFlowersCount())
                .price(delivery.getPrice())
                .status(delivery.getDeliveryState().getName())
                .build();
        return dto;
    }
}
