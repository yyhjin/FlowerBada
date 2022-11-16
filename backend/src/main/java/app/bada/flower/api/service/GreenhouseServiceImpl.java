package app.bada.flower.api.service;

import app.bada.flower.api.dto.greenhouse.GreenhouseResDto;
import app.bada.flower.api.entity.Bookmark;
import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.BookmarkRepository;
import app.bada.flower.api.repository.RollingPaperRepository;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import app.bada.flower.api.util.S3FileUpload;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GreenhouseServiceImpl implements GreenhouseService {

    private final RollingPaperRepository rollingPaperRepository;

    private final UserRepository userRepository;

    private final JwtTokenUtil jwtTokenUtil;

    private final BookmarkRepository bookmarkRepository;

    private final GreenhouseResDto greenhouseResDto = new GreenhouseResDto();

    private final UserService userService;


    @Autowired
    S3FileUpload s3FileUpload;
    @Override
    public List<GreenhouseResDto> getMyRollingPapers(String token,int sortNumber, Pageable pageable) {
        User user = userService.getUserByToken(token);
        List<GreenhouseResDto> myRollingPapers = new ArrayList<>();
        Slice<RollingPaper> findAllMyRollingPaperList = null;
        if(sortNumber==1){
            findAllMyRollingPaperList = rollingPaperRepository.findAllByUserAndIsDeletedFalseOrderByCreatedDateDesc(user,pageable).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        }else if(sortNumber==2) {
            findAllMyRollingPaperList = rollingPaperRepository.findAllByUserAndIsDeletedFalseOrderByCreatedDate(user, pageable).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        }
        for(RollingPaper rollingPaper : findAllMyRollingPaperList){
            GreenhouseResDto myRollingPaper = new GreenhouseResDto();
            myRollingPaper.setDate(greenhouseResDto.changeDateToString(rollingPaper.getOpenDate()));
            myRollingPaper.setUrl(rollingPaper.getUrl());
            myRollingPaper.setTitle(rollingPaper.getTitle());
            myRollingPaper.setImgUrl(s3FileUpload.File_Server_Url+rollingPaper.getImgUrl());
            myRollingPapers.add(myRollingPaper);
        }
        return myRollingPapers;
    }

    @Override
    public List<GreenhouseResDto> getMyBookmarks(String token, int sortNumber, Pageable pageable) {
        User user = userService.getUserByToken(token);
        List<GreenhouseResDto> myRollingPapers = new ArrayList<>();
        Slice<Bookmark> findAllMyBookmarkList = null;
        if(sortNumber==1){
            findAllMyBookmarkList = bookmarkRepository.findAllByUserAndIsValidAndIsDeletedFalseOrderByCreatedDateDesc(user,true,pageable).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        }else if(sortNumber==2) {
            findAllMyBookmarkList = bookmarkRepository.findAllByUserAndIsValidAndIsDeletedFalseOrderByCreatedDate(user,true, pageable).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        }
        for(Bookmark bookmark : findAllMyBookmarkList){
            GreenhouseResDto myRollingPaper = new GreenhouseResDto();
            myRollingPaper.setDate(greenhouseResDto.changeDateToString(bookmark.getRollingPaper().getOpenDate()));
            myRollingPaper.setUrl(bookmark.getRollingPaper().getUrl());
            myRollingPaper.setTitle(bookmark.getRollingPaper().getTitle());
            myRollingPaper.setImgUrl(s3FileUpload.File_Server_Url+bookmark.getRollingPaper().getImgUrl());
            myRollingPapers.add(myRollingPaper);
        }
        return myRollingPapers;
    }
}
