package app.bada.flower.api.repository;


import app.bada.flower.api.dto.message.MessageResDto;

import java.util.List;

public interface MessageRepositoryCustom {

    List<MessageResDto.MessageDto> searchContent(String searchName);
}
