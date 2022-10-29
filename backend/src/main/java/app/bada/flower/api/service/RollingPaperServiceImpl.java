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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;


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

        Random random = new Random();
        int length = random.nextInt(5)+5;

        StringBuffer newWord = new StringBuffer();
        boolean check = false;
        while(!check){
            for (int i = 0; i < length; i++) {
                int choice = random.nextInt(3);
                switch(choice) {
                    case 0:
                        newWord.append((char)((int)random.nextInt(25)+97));
                        break;
                    case 1:
                        newWord.append((char)((int)random.nextInt(25)+65));
                        break;
                    case 2:
                        newWord.append((char)((int)random.nextInt(10)+48));
                        break;
                    default:
                        break;
                }
            }
            if(!rollingPaperRepository.findByUrl(newWord.toString()).isPresent()){
                check = true;
            }
        }


        RollingPaper rollingPaper = RollingPaper.builder()
                .rollingPaperItem(rollingItemRepository.getReferenceById(rollingPaperReqDto.getItemId()))
                .title(rollingPaperReqDto.getTitle())
                .makerNickname(user.getNickname())
                .user(user)
                .receiverPhone(rollingPaperReqDto.getReceiverPhone())
                .openDate(rollingPaperReqDto.getOpenDate())
                .url(newWord.toString())
                .imgUrl("임시 이미지 url")
                .build();

        return rollingPaperRepository.save(rollingPaper);
    }

    @Override
    public RollingPaperResDto getRollingPaper(String token, String url, int paginationId) {
        RollingPaperResDto rollingPaperResDto = new RollingPaperResDto();
        RollingPaper rollingPaper = rollingPaperRepository.findByUrl(url).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
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
        rollingPaperResDto.setRollingId(rollingPaper.getId());
        rollingPaperResDto.setTitle(rollingPaper.getTitle());
        rollingPaperResDto.setImgUrl(rollingPaper.getRollingPaperItem().getImgUrl());
        rollingPaperResDto.setDate(rollingPaper.getOpenDate());
        rollingPaperResDto.setMessages(rollingMsgList);
        return rollingPaperResDto;
    }

    @Override
    public BookmarkResDto bookmarkRollingPaper(String token, String url) {
        int userId = jwtTokenUtil.getUserId(token.split(" ")[1]);
        Optional<User> user = userRepository.findById(userId);
        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findByUrl(url);
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
}
