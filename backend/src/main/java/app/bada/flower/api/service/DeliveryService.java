package app.bada.flower.api.service;

import app.bada.flower.api.dto.mypage.DeliveryResDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DeliveryService {
    List<DeliveryResDto> selectAllDelivery(int userId,int sortNumber, Pageable pageable);
}
