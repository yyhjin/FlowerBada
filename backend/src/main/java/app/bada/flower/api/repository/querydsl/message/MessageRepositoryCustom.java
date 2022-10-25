package app.bada.flower.api.repository.querydsl.message;


import app.bada.flower.api.dto.message.MessageResDto;

import java.util.List;

public interface MessageRepositoryCustom {

    List<MessageResDto.MessageDto> searchContent(String searchName);
}
