package app.bada.flower.api.service;

import app.bada.flower.api.dto.flower.FlowerDto;
import app.bada.flower.api.dto.flower.FlowerResDto;
import app.bada.flower.api.entity.FlowerItem;
import app.bada.flower.api.entity.FlowerUser;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.FlowerItemRepository;
import app.bada.flower.api.repository.FlowerUserRepository;
import app.bada.flower.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static app.bada.flower.exception.ErrorCode.ITEM_NOT_FOUND;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final FlowerItemRepository flowerItemRepository;
    private final FlowerUserRepository flowerUserRepository;

    public List<FlowerResDto> getFlowerList(User user) {

        List<FlowerDto> flowers = flowerItemRepository.findAllFlowerItem().stream().map(FlowerDto::new).collect(Collectors.toList());
        List<FlowerDto> userPurchasedFlowers = flowerUserRepository.userPurchasedFlower(user.getId()).stream().map(FlowerDto::new).collect(Collectors.toList());
        List<FlowerResDto> resDtos = new ArrayList<>();

        for(FlowerDto f : flowers) {
            FlowerResDto flowerResDto = new FlowerResDto();
            flowerResDto.setFlowerId(f.getId());
            flowerResDto.setName(f.getName());
            flowerResDto.setPoint(f.getPoint());
            flowerResDto.setFlowerLanguage(f.getFlowerLanguage());
            flowerResDto.setSeason(f.getSeason());
            flowerResDto.setPrice(f.getPrice());
            flowerResDto.setImgUrl(f.getImgUrl());
            if(f.getPoint() == 0) {
                flowerResDto.setIsOwned(true);
            } else {
                flowerResDto.setIsOwned(userPurchasedFlowers.contains(f));
            }
            resDtos.add(flowerResDto);
        }

        return resDtos;
    }

    @Transactional
    public void buyFlowerItem(User user, FlowerDto flowerDto) {
        FlowerItem flowerItem = flowerItemRepository.findById(flowerDto.getId())
                .orElseThrow(() -> new CustomException(ITEM_NOT_FOUND));


        flowerUserRepository.save(FlowerUser.addFlowerUser(user, flowerItem));
    }
}
