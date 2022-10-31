package app.bada.flower.api.service;

import app.bada.flower.api.dto.greenhouse.GreenhouseResDto;
import app.bada.flower.api.entity.RollingPaper;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GreenhouseService {

    List<GreenhouseResDto> getMyRollingPapers(String token,int sortNumber, Pageable pageable);

    List<GreenhouseResDto> getMyBookmarks(String token,int sortNumber, Pageable pageable);
}
