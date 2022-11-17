package app.bada.flower.api.dto.admin;

import lombok.Getter;

public class AdminReqDto {

    @Getter
    public static class MessageReq {
        private int messageId;
    }

    @Getter
    public static class RollingReq {
        private int rollingId;
    }
}
