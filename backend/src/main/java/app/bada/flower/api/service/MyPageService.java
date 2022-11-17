package app.bada.flower.api.service;

import app.bada.flower.api.dto.mypage.MyPointResDto;
import org.springframework.data.domain.Pageable;

public interface MyPageService {
    MyPointResDto selectAllMyPoint(int userId, Pageable pageable);
}
