package app.bada.flower.api.service;

import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.repository.FlowerItemRepository;
import app.bada.flower.api.repository.MessageRepository;
import app.bada.flower.api.repository.RollingPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{
    private final MessageRepository messageRepository;
    private final FlowerItemRepository flowerItemRepository;
    private final RollingPaperRepository rollingPaperRepository;

    public Message createMessage(MessageReqDto messageReqDto) {

        Message message = Message.builder()
                .rollingPaper(rollingPaperRepository.getReferenceById(messageReqDto.getRollingId()))
                .flowerItem(flowerItemRepository.getReferenceById(messageReqDto.getFlowerId()))
                .content(messageReqDto.getContent())
                .writer(messageReqDto.getWriter())
                .fontId(messageReqDto.getFontId())
                .build();

        return messageRepository.save(message);
    }
}