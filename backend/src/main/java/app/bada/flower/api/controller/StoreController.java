package app.bada.flower.api.controller;

import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.flower.FlowerReqDto;
import app.bada.flower.api.dto.flower.FlowerResDto;
import app.bada.flower.api.dto.rolling.RollingReqDto;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.service.StoreService;
import app.bada.flower.api.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
@Api(value = "상점 컨트롤러", tags = {"상점"})
public class StoreController {

    private final StoreService storeService;
    private final UserService userService;

    @GetMapping("/flower")
    public ResponseEntity<?> getFlowerList(@RequestHeader(value = "X-AUTH-TOKEN") String token) {
        User user = userService.getUserByToken(token);
        return ResponseEntity.ok(storeService.getFlowerList(user));
    }

    @GetMapping("/rolling")
    public ResponseEntity<?> getRollingItemList(@RequestHeader(value = "X-AUTH-TOKEN") String token) {
        User user = userService.getUserByToken(token);
        return ResponseEntity.ok(storeService.getRollingList(user));
    }

    @PutMapping("/buy/flower")
    public ResponseEntity<?> buyFlowerItem(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestBody FlowerReqDto flowerReqDto) {
        User user = userService.getUserByToken(token);
        storeService.buyFlowerItem(user, flowerReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/buy/rolling")
    public ResponseEntity<?> buyRollingItem(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestBody RollingReqDto rollingReqDto) {
        User user = userService.getUserByToken(token);
        storeService.buyRollingItem(user, rollingReqDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }




}
