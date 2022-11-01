package app.bada.flower.api.repository.querydsl.message;

import app.bada.flower.api.dto.message.MessageResDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


import java.util.List;

import static app.bada.flower.api.entity.QMessage.message;

@RequiredArgsConstructor
public class MessageRepositoryImpl implements MessageRepositoryCustom{

    private final JPAQueryFactory queryFactory;


    @Override
    public List<MessageResDto.MessageDto> searchContent(String searchName) {
        return queryFactory
                // DTO 매핑하는 부분 -> DTO 생성자의 매개변수 순서대로 매핑됨
                .select(Projections.constructor(MessageResDto.MessageDto.class,
                        message.id, message.flowerItem.id, message.flowerItem.imgUrl, message.content, message.writer, message.fontId
                ))
                .from(message)
                .where(message.content.contains(searchName))
                .fetch();
    }
}
