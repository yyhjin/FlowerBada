package app.bada.flower.api.service;

import app.bada.flower.api.dto.flower.FlowerDto;
import app.bada.flower.api.dto.flower.FlowerReqDto;
import app.bada.flower.api.dto.flower.FlowerResDto;
import app.bada.flower.api.dto.rolling.RollingDto;
import app.bada.flower.api.dto.rolling.RollingReqDto;
import app.bada.flower.api.dto.rolling.RollingResDto;
import app.bada.flower.api.entity.*;
import app.bada.flower.api.repository.FlowerItemRepository;
import app.bada.flower.api.repository.FlowerUserRepository;
import app.bada.flower.api.repository.RollingItemRepository;
import app.bada.flower.api.repository.RollingUserRepository;
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
    private final RollingItemRepository rollingItemRepository;
    private final RollingUserRepository rollingUserRepository;

    /* 꽃 아이템 조회 */
    public List<FlowerResDto> getFlowerList(User user) {

        List<FlowerItem> flowers = flowerItemRepository.findAllFlowerItem();
        List<FlowerItem> userPurchasedFlowers = flowerUserRepository.userPurchasedFlower(user.getId());

        List<FlowerResDto> resDtos = new ArrayList<>();

        for(FlowerItem f : flowers) {
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

    /* 롤링페이퍼 아이템 조회 */
    public List<RollingResDto> getRollingList(User user) {
        List<RollingItem> rollingItems = rollingItemRepository.findAllRollingItem();
        List<RollingItem> userPurchasedRollingItems = rollingUserRepository.userPurchasedRollingItem(user.getId());
        List<RollingResDto> resDtos = new ArrayList<>();

        for(RollingItem r : rollingItems) {
            RollingResDto rollingResDto = new RollingResDto();
            rollingResDto.setRollingId(r.getId());
            rollingResDto.setName(r.getName());
            rollingResDto.setCapacity(r.getCapacity());
            rollingResDto.setPoint(r.getPoint());
            rollingResDto.setPrice(r.getPrice());
            rollingResDto.setImgUrl(r.getImgUrl());
            if(r.getPoint() == 0) {
                rollingResDto.setIsOwned(true);
            } else {
                rollingResDto.setIsOwned(userPurchasedRollingItems.contains(r));
            }
            resDtos.add(rollingResDto);
        }

        return resDtos;
    }

    /* 꽃 아이템 구매 */
    @Transactional
    public void buyFlowerItem(User user, FlowerReqDto flowerReqDto) {
        FlowerItem flowerItem = flowerItemRepository.findById(flowerReqDto.getFlowerId())
                .orElseThrow(() -> new CustomException(ITEM_NOT_FOUND));

        flowerUserRepository.save(FlowerUser.addFlowerUser(user, flowerItem));
    }

    /* 롤링페이퍼 아이템 구매 */
    @Transactional
    public void buyRollingItem(User user, RollingReqDto rollingReqDto) {
        RollingItem rollingItem = rollingItemRepository.findById(rollingReqDto.getRollingId())
                .orElseThrow(() -> new CustomException(ITEM_NOT_FOUND));

        rollingUserRepository.save(RollingUser.addRollingUser(user, rollingItem));
    }
}
