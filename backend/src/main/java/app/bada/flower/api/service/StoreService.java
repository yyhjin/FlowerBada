package app.bada.flower.api.service;

import app.bada.flower.api.dto.flower.FlowerDto;
import app.bada.flower.api.dto.flower.FlowerResDto;
import app.bada.flower.api.entity.User;

import java.util.List;

public interface StoreService {
    List<FlowerResDto> getFlowerList(User user);
    void buyFlowerItem(User user, FlowerDto flowerDto);
}
