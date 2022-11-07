package app.bada.flower.api.service;

import app.bada.flower.api.dto.rollingpaper.BookmarkResDto;
import app.bada.flower.api.dto.rollingpaper.RollingPaperReqDto;
import app.bada.flower.api.dto.rollingpaper.RollingPaperResDto;
import app.bada.flower.api.entity.RollingPaper;

public interface RollingPaperService {

    RollingPaper createRollingPaper(String token, RollingPaperReqDto rollingPaperReqDto);

    RollingPaperResDto getRollingPaper(String token, String url, int paginationId);


    BookmarkResDto bookmarkRollingPaper(String token, String url);

    RollingPaper deleteRolling(int rollingId);
}
