package app.bada.flower.api.dto.message;

import lombok.Getter;

@Getter
public class MessageReqDto {
    private int rollingId;
    private String content;
    private String writer;
    private int flowerId;
    private int fontId;
}
