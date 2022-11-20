package app.bada.flower.api.service;

import app.bada.flower.api.dto.flower.FlowerReqDto;
import app.bada.flower.api.dto.flower.FlowerResDto;
import app.bada.flower.api.dto.rolling.RollingReqDto;
import app.bada.flower.api.dto.rolling.RollingResDto;
import app.bada.flower.api.entity.User;

import java.util.List;

public interface StoreService {
    List<FlowerResDto> getFlowerList(User user);
    List<FlowerResDto> getFlowerList();
    List<RollingResDto> getRollingList(User user);
    void buyFlowerItem(User user, FlowerReqDto flowerReqDto);
    void buyRollingItem(User user, RollingReqDto rollingReqDto);
}
