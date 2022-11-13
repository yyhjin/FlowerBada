package app.bada.flower.api.service;

import app.bada.flower.api.dto.mypage.MyPointDto;
import app.bada.flower.api.dto.mypage.MyPointResDto;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.FlowerUserRepository;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{
    private final UserRepository userRepository;
    private final FlowerUserRepository flowerUserRepository;

    public MyPointResDto selectAllMyPoint(int userId, Pageable pageable){
        User user = userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        Slice<MyPointDto> myPointDtoList = flowerUserRepository.findMyPointList(user.getId(),pageable).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));

        ArrayList<MyPointDto> resultList = new ArrayList<>();
        for(MyPointDto flowerUser: myPointDtoList){
            resultList.add(flowerUser);
        }
        return MyPointResDto.builder().myPoint(user.getPoints()).myPointList(resultList).build();
    }
}
