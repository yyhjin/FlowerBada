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
import org.springframework.transaction.annotation.Transactional;

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

    private final UserService userService;

    @Override
    public RollingPaper createRollingPaper(String token, RollingPaperReqDto rollingPaperReqDto) {
        User user = userService.getUserByToken(token);
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
                .openDate(rollingPaperReqDto.getOpenDate())
                .url(newWord.toString())
                .imgUrl(rollingItemRepository.getReferenceById(rollingPaperReqDto.getItemId()).getImgUrl())
                .build();

        return rollingPaperRepository.save(rollingPaper);
    }

    @Override
    public RollingPaperResDto getRollingPaper(String token, String url, int paginationId) {
        boolean bookmarkCheck = true;
        if(token.equals("Bearer")){
            bookmarkCheck = false;
        }else{
            User user = userService.getUserByToken(token);
            BookmarkResDto bookmarkResDto = new BookmarkResDto();
            RollingPaper rollingPaper = rollingPaperRepository.findByUrl(url).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
            Bookmark bookmark = bookmarkRepository.findByRollingPaper_IdAndUser_Id(rollingPaper.getId(), user.getId());
            if(bookmark==null || bookmark.isValid()==false){
                bookmarkCheck = false;
            }
        }

        RollingPaperResDto rollingPaperResDto = new RollingPaperResDto();
        RollingPaper rollingPaper = rollingPaperRepository.findByUrl(url).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        List<Message> messageList = messageRepository.findAllByRollingPaper(rollingPaper);
        int capacity = rollingPaper.getRollingPaperItem().getCapacity();
        if((messageList.size()-1)/capacity<paginationId-1){
            return null;
        }
        List<MessageResDto.rollingMsgDto> rollingMsgList = new ArrayList<>();
        int range = paginationId*capacity;
        if(messageList.size()<paginationId*capacity) range = messageList.size();

        for(int i= (paginationId-1)*capacity; i<range; i++){
            rollingMsgList.add(messageConverter.toRollingMsgDto(messageList.get(i)));
        }
        rollingPaperResDto.setRollingId(rollingPaper.getId());
        rollingPaperResDto.setItemId(rollingPaper.getRollingPaperItem().getId());
        rollingPaperResDto.setCapacity(capacity);
        rollingPaperResDto.setTotalMessages(messageList.size());
        rollingPaperResDto.setTitle(rollingPaper.getTitle());
        rollingPaperResDto.setPrice(rollingPaper.getRollingPaperItem().getPrice());
        rollingPaperResDto.setImgFront(rollingPaper.getRollingPaperItem().getImgFront());
        rollingPaperResDto.setImgBack(rollingPaper.getRollingPaperItem().getImgBack());
        rollingPaperResDto.setImgUrl(rollingPaper.getImgUrl());
        rollingPaperResDto.setDate(rollingPaperResDto.changeDateToString(rollingPaper.getOpenDate()));
        rollingPaperResDto.setBookmark(bookmarkCheck);
        rollingPaperResDto.setMessages(rollingMsgList);
        return rollingPaperResDto;
    }

    @Override
    public BookmarkResDto bookmarkRollingPaper(String token, String url) {
        User user = userService.getUserByToken(token);
        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findByUrl(url);
        BookmarkResDto bookmarkResDto = new BookmarkResDto();

        Bookmark bookmark = bookmarkRepository.findByRollingPaper_IdAndUser_Id(rollingPaper.get().getId(), user.getId());
        if(bookmark==null){
            Bookmark bookmark1 = Bookmark.builder()
                    .rollingPaper(rollingPaper.get())
                    .user(user)
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
