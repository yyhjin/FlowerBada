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
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final JwtTokenUtil jwtTokenUtil;


    @Override
    public RollingPaper createRollingPaper(String token, RollingPaperReqDto rollingPaperReqDto) {
        int userId = jwtTokenUtil.getUserId(token.split(" ")[1]);
        User user = userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        RollingPaper rollingPaper = RollingPaper.builder()
                .rollingPaperItem(rollingItemRepository.getReferenceById(rollingPaperReqDto.getItemId()))
                .title(rollingPaperReqDto.getTitle())
                .makerNickname(user.getNickname())
                .user(user)
                .openDate(rollingPaperReqDto.getOpenDate())
                .url("임시 url")
                .imgUrl("임시 이미지 url")
                .build();

        return rollingPaperRepository.save(rollingPaper);
    }

    @Override
    public RollingPaperResDto getRollingPaper(int rollingId, int paginationId) {
        RollingPaperResDto rollingPaperResDto = new RollingPaperResDto();
        RollingPaper rollingPaper = rollingPaperRepository.findById(rollingId).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
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
        rollingPaperResDto.setRollingId(rollingId);
        rollingPaperResDto.setTitle(rollingPaper.getTitle());
        rollingPaperResDto.setImgUrl(rollingPaper.getImgUrl());
        rollingPaperResDto.setDate(rollingPaper.getOpenDate());
        rollingPaperResDto.setMessages(rollingMsgList);
        return rollingPaperResDto;
    }

    @Override
    public BookmarkResDto bookmarkRollingPaper(String token, int rollingId) {
        int userId = jwtTokenUtil.getUserId(token.split(" ")[1]);
        Optional<User> user = userRepository.findById(userId);
        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findById(rollingId);
        BookmarkResDto bookmarkResDto = new BookmarkResDto();

        Bookmark bookmark = bookmarkRepository.findByRollingPaper_IdAndUser_Id(rollingPaper.get().getId(), user.get().getId());
        if(bookmark==null){
            Bookmark bookmark1 = Bookmark.builder()
                    .rollingPaper(rollingPaper.get())
                    .user(user.get())
                    .isValid(true)
                    .build();

            bookmarkRepository.save(bookmark1);
            bookmarkResDto.setRollingId(rollingPaper.get().getId());
            bookmarkResDto.setStatus(true);
        }else{
            bookmark.setIsValid();

            bookmarkRepository.save(bookmark);
            bookmarkResDto.setRollingId(rollingPaper.get().getId());
            bookmarkResDto.setStatus(bookmark.isValid());
        }
        return bookmarkResDto;
    }

    @Transactional
    @Override
    public RollingPaper deleteRolling(int rollingId) {
        RollingPaper rollingPaper = rollingPaperRepository.findById(rollingId)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        rollingPaper.isDeleteUpdate(true);
        return rollingPaperRepository.save(rollingPaper);
    }

}
