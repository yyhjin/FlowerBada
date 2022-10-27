package app.bada.flower.api.service;

import app.bada.flower.api.dto.greenhouse.GreenhouseResDto;
import app.bada.flower.api.entity.RollingPaper;

import java.util.List;

public interface GreenhouseService {

    List<GreenhouseResDto> getMyRollingPapers(String token);

    List<GreenhouseResDto> getMyBookmarks(String token);
}
