package app.bada.flower.api.dto.message;

import app.bada.flower.api.entity.Message;
import lombok.Getter;

public class MessageResDto {

    @Getter
    public static class MessageDto {
        private int messageId;
        private int flowerId;
        private String content;
        private String writer;
        private int fontId;

        // Entity -> DTO
        public MessageDto(Message message) {
            this.messageId = message.getId();
            this.flowerId = message.getFlowerItem().getId();
            this.content = message.getContent();
            this.writer = message.getWriter();
            this.fontId = message.getFontId();
        }
    }


    @Getter
    public static class rollingMsgDto {
        private int messageId;
        private int flowerId;
        private String writer;
        private String imgUrl;
    }

}
