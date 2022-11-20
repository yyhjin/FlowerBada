package app.bada.flower.api.dto.rollingpaper;

import app.bada.flower.api.dto.message.MessageResDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RollingPaperResDto {
    private int rollingId;
    private int itemId;
    private int capacity;
    private int totalMessages;
    private String title;
    private int price;
    private String imgFront;
    private String imgBack;
    private String imgUrl;
    private String date;
    private boolean bookmark;
    private List<MessageResDto.rollingMsgDto> messages = new ArrayList<>();

    public String changeDateToString(LocalDateTime date){
        String formatDate = date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        StringBuilder sb = new StringBuilder();
        sb.append(formatDate.substring(0,4)).append(".").append(formatDate.substring(4,6)).append(".").append(formatDate.substring(6,8));
        return sb.toString();
}
}
