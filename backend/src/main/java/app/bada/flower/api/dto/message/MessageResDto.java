package app.bada.flower.api.dto.message;

import app.bada.flower.api.entity.Message;
import lombok.Getter;
import lombok.Setter;

public class MessageResDto {

    @Getter
    public static class MessageDto {
        private int messageId;
        private int flowerId;
        private String imgUrl;
        private String content;
        private String writer;
        private String font;

        // Entity -> DTO
        public MessageDto(Message message) {
            this.messageId = message.getId();
            this.flowerId = message.getFlowerItem().getId();
            this.imgUrl = message.getFlowerItem().getImgUrl();
            this.content = message.getContent();
            this.writer = message.getWriter();
            this.font = message.getFont();
        }
    }

    @Getter
    @Setter
    public static class rollingMsgDto {
        private int messageId;
        private int flowerId;
        private String writer;
        private String imgUrl;
        private int price;
    }

}
