package app.bada.flower.api.service;

import app.bada.flower.api.dto.mypage.DeliveryResDto;
import app.bada.flower.api.dto.mypage.MyPointResDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MyPageService {
    MyPointResDto selectAllMyPoint(int userId, Pageable pageable);
}
