package app.bada.flower.api.service;

import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.entity.Message;
import java.util.List;

public interface MessageService {
    Message createMessage(MessageReqDto.MessageReq messageReq);

    Message getMessage(int msgId);

    Message deleteMessage(int msgId);

    List<MessageResDto.MessageDto> search(String content);
}