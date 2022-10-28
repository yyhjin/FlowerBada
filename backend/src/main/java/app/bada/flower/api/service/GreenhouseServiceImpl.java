package app.bada.flower.api.service;

import app.bada.flower.api.dto.greenhouse.GreenhouseResDto;
import app.bada.flower.api.entity.Bookmark;
import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.BookmarkRepository;
import app.bada.flower.api.repository.RollingPaperRepository;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GreenhouseServiceImpl implements GreenhouseService {

    private final RollingPaperRepository rollingPaperRepository;

    private final UserRepository userRepository;

    private final JwtTokenUtil jwtTokenUtil;

    private final BookmarkRepository bookmarkRepository;
    @Override
    public List<GreenhouseResDto> getMyRollingPapers(String token) {
        int userId = jwtTokenUtil.getUserId(token.split(" ")[1]);
        User user = userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        List<GreenhouseResDto> myRollingPapers = new ArrayList<>();
        List<RollingPaper> rollingPapers  = rollingPaperRepository.findAllByUser(user);
        for(RollingPaper rollingPaper : rollingPapers){
            GreenhouseResDto myRollingPaper = new GreenhouseResDto();
            myRollingPaper.setDate(rollingPaper.getOpenDate());
            myRollingPaper.setPaperId(rollingPaper.getId());
            myRollingPaper.setTitle(rollingPaper.getTitle());
            myRollingPaper.setImgUrl(rollingPaper.getImgUrl());
            myRollingPapers.add(myRollingPaper);
        }
        return myRollingPapers;
    }

    @Override
    public List<GreenhouseResDto> getMyBookmarks(String token) {
        int userId = jwtTokenUtil.getUserId(token.split(" ")[1]);
        User user = userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        List<GreenhouseResDto> myRollingPapers = new ArrayList<>();
        List<Bookmark> bookmarks  = bookmarkRepository.findAllByUserAndIsValid(user,true);
        for(Bookmark bookmark : bookmarks){
            GreenhouseResDto myRollingPaper = new GreenhouseResDto();
            myRollingPaper.setDate(bookmark.getRollingPaper().getOpenDate());
            myRollingPaper.setPaperId(bookmark.getRollingPaper().getId());
            myRollingPaper.setTitle(bookmark.getRollingPaper().getTitle());
            myRollingPaper.setImgUrl(bookmark.getRollingPaper().getImgUrl());
            myRollingPapers.add(myRollingPaper);
        }
        return myRollingPapers;
    }
}
