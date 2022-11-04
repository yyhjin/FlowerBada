package app.bada.flower.api.dto.message;

import lombok.Getter;


public class MessageReqDto {

    @Getter
    public static class ReportReq {
        private int userId;
        private int messageId;
        private String content;
    }

    @Getter
    public static class MessageReq {
        private int rollingId;
        private String content;
        private String writer;
        private int flowerId;
        private String font;
    }
}
