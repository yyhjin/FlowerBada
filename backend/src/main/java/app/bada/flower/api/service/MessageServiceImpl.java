package app.bada.flower.api.service;

import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.repository.FlowerItemRepository;
import app.bada.flower.api.repository.MessageRepository;
import app.bada.flower.api.repository.RollingPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{
    private final MessageRepository messageRepository;
    private final FlowerItemRepository flowerItemRepository;
    private final RollingPaperRepository rollingPaperRepository;

    @Override
    public Message createMessage(MessageReqDto.MessageReq messageReq) {

        Message message = Message.builder()
                .rollingPaper(rollingPaperRepository.getReferenceById(messageReq.getRollingId()))
                .flowerItem(flowerItemRepository.getReferenceById(messageReq.getFlowerId()))
                .content(messageReq.getContent())
                .writer(messageReq.getWriter())
                .fontId(messageReq.getFontId())
                .build();

        return messageRepository.save(message);
    }

    @Override
    public Message getMessage(int msgId) {
        return messageRepository.getReferenceById(msgId);
    }

    @Transactional
    @Override
    public Message deleteMessage(int msgId) {
        Message message = messageRepository.getReferenceById(msgId);
        message.idDeleteUpdate(true);
        return messageRepository.save(message);
    }
}