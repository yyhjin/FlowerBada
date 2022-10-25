package app.bada.flower.api.service;

import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.repository.FlowerItemRepository;
import app.bada.flower.api.repository.MessageRepository;
import app.bada.flower.api.repository.RollingPaperRepository;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
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
                .rollingPaper(rollingPaperRepository.findById(messageReq.getRollingId())
                        .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)))
                .flowerItem(flowerItemRepository.findById(messageReq.getFlowerId())
                        .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)))
                .content(messageReq.getContent())
                .writer(messageReq.getWriter())
                .fontId(messageReq.getFontId())
                .build();

        return messageRepository.save(message);
    }

    @Override
    public Message getMessage(int msgId) {
        return messageRepository.findById(msgId)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
    }

    @Transactional
    @Override
    public Message deleteMessage(int msgId) {
        Message message = messageRepository.findById(msgId)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        message.idDeleteUpdate(true);
        return messageRepository.save(message);
    }
}