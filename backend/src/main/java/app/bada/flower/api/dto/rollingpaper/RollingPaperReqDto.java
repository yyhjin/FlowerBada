package app.bada.flower.api.dto.rollingpaper;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RollingPaperReqDto {
    private int itemId;
    private String title;
    private LocalDateTime openDate;
}
