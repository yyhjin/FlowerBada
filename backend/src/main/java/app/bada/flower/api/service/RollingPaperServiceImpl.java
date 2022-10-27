package app.bada.flower.api.service;

import app.bada.flower.api.converter.MessageConverter;
import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.dto.rollingpaper.BookmarkResDto;
import app.bada.flower.api.dto.rollingpaper.RollingPaperReqDto;
import app.bada.flower.api.dto.rollingpaper.RollingPaperResDto;
import app.bada.flower.api.entity.Bookmark;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.*;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RollingPaperServiceImpl implements RollingPaperService {

    private final RollingPaperRepository rollingPaperRepository;
    private final RollingItemRepository rollingItemRepository;

    private final MessageRepository messageRepository;

    private final MessageConverter messageConverter;

    private final BookmarkRepository bookmarkRepository;

    private final UserRepository userRepository;


    @Override
    public RollingPaper createRollingPaper(String token, RollingPaperReqDto rollingPaperReqDto) {

        RollingPaper rollingPaper = RollingPaper.builder()
                .rollingPaperItem(rollingItemRepository.getReferenceById(rollingPaperReqDto.getItemId()))
                .title(rollingPaperReqDto.getTitle())
                .makerNickname("임시 닉네임")
                .makerToken("임시 토큰")
                .receiverPhone(rollingPaperReqDto.getReceiverPhone())
                .openDate(rollingPaperReqDto.getOpenDate())
                .url("임시 url")
                .imgUrl("임시 이미지 url")
                .build();

        return rollingPaperRepository.save(rollingPaper);
    }

    @Override
    public RollingPaperResDto getRollingPaper(int paperId, int paginationId) {
        RollingPaperResDto rollingPaperResDto = new RollingPaperResDto();
        RollingPaper rollingPaper = rollingPaperRepository.findById(paperId).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        List<Message> messageList = messageRepository.findAllByRollingPaper(rollingPaper);
        if((messageList.size()-1)/10<paginationId-1){
            return null;
        }
        List<MessageResDto.rollingMsgDto> rollingMsgList = new ArrayList<>();
        int range = paginationId*10;
        if(messageList.size()<paginationId*10) range = messageList.size();

        for(int i= (paginationId-1)*10; i<range; i++){
            rollingMsgList.add(messageConverter.toRollingMsgDto(messageList.get(i)));
        }
        rollingPaperResDto.setPaperId(paperId);
        rollingPaperResDto.setTitle(rollingPaper.getTitle());
        rollingPaperResDto.setImgUrl(rollingPaper.getImgUrl());
        rollingPaperResDto.setDate(rollingPaper.getOpenDate());
        rollingPaperResDto.setMessages(rollingMsgList);
        return rollingPaperResDto;
    }

    @Override
    public BookmarkResDto bookmarkRollingPaper(String token, int paperId) {
        Optional<User> user = userRepository.findById(1); //나중에 토큰으로 유저 정보 가져와서 userId값 넣기
        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findById(paperId);
        BookmarkResDto bookmarkResDto = new BookmarkResDto();

        Bookmark bookmark = bookmarkRepository.findByRollingPaper_IdAndUser_Id(rollingPaper.get().getId(), user.get().getId());
        if(bookmark==null){
            Bookmark bookmark1 = Bookmark.builder()
                    .rollingPaper(rollingPaper.get())
                    .user(user.get())
                    .isValid(true)
                    .build();

            bookmarkRepository.save(bookmark1);
            bookmarkResDto.setPaperId(rollingPaper.get().getId());
            bookmarkResDto.setStatus(true);
        }else{
            bookmark.setIsValid();

            bookmarkRepository.save(bookmark);
            bookmarkResDto.setPaperId(rollingPaper.get().getId());
            bookmarkResDto.setStatus(bookmark.isValid());
        }
        return bookmarkResDto;
    }
}