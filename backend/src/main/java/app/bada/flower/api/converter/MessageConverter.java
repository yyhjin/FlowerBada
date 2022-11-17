package app.bada.flower.api.converter;

import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.entity.Message;
import org.springframework.stereotype.Component;

@Component

public class MessageConverter {

    public MessageResDto.rollingMsgDto toRollingMsgDto(Message message){
        MessageResDto.rollingMsgDto response = new MessageResDto.rollingMsgDto();
        response.setMessageId(message.getId());
        response.setFlowerId(message.getFlowerItem().getId());
        response.setWriter(message.getWriter());
        response.setImgUrl(message.getFlowerItem().getImgUrl());
        response.setPrice(message.getFlowerItem().getPrice());
        response.setContent(message.getContent());
        response.setFont(message.getFont());
        return response;
    }
}
