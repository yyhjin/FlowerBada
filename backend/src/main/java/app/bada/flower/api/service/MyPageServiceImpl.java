package app.bada.flower.api.service;

import app.bada.flower.api.converter.MyPageQuery;
import app.bada.flower.api.dto.mypage.MyPointDto;
import app.bada.flower.api.dto.mypage.MyPointResDto;
import app.bada.flower.api.entity.FlowerUser;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.FlowerUserRepository;
import app.bada.flower.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{
    private final UserRepository userRepository;
    private final FlowerUserRepository flowerUserRepository;

    private final MyPageQuery myPageQuery;
    public MyPointResDto selectAllMyPoint(int userId, Pageable pageable){
        try {
            MyPointResDto myPointResDto = new MyPointResDto();
            User user = userRepository.findById(userId).get();
            Slice<FlowerUser> myPointDtoList = flowerUserRepository.findMyPointList(user.getId(),pageable);
            ArrayList<MyPointDto> resultList = new ArrayList<>();

            for(FlowerUser flowerUser: myPointDtoList){
                System.out.println(flowerUser.getFlowerItem().getName());
                resultList.add(new MyPointDto(flowerUser.getFlowerItem().getName(),flowerUser.getFlowerItem().getPoint(),flowerUser.getCreatedDate()));
            }
            myPointResDto.builder().myPoint(user.getPoints()).myPointList(resultList).build();
            return myPointResDto;
        }catch (Exception e){
            System.out.println(e.toString());
            return null;
        }
    }
}
