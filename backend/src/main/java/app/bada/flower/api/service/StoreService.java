package app.bada.flower.api.service;

import app.bada.flower.api.dto.flower.FlowerDto;
import app.bada.flower.api.repository.FlowerItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreService {

    private final FlowerItemRepository flowerItemRepository;

    public List<FlowerDto> getAllFlowerList() {
        List<FlowerDto> flowers = flowerItemRepository.findAllFlower().stream().map(FlowerDto::new).collect(Collectors.toList());
        return flowers;
    }
}
