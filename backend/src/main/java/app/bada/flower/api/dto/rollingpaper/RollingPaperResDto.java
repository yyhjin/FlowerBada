package app.bada.flower.api.dto.rollingpaper;

import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.entity.Message;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RollingPaperResDto {
    private int rollingId;
    private String title;
    private String imgUrl;
    private LocalDateTime date;
    private List<MessageResDto.rollingMsgDto> messages = new ArrayList<>();
}
