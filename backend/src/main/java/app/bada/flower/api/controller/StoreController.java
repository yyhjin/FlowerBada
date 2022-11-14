package app.bada.flower.api.controller;

import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.flower.FlowerReqDto;
import app.bada.flower.api.dto.flower.FlowerResDto;
import app.bada.flower.api.dto.rolling.RollingReqDto;
import app.bada.flower.api.dto.rolling.RollingResDto;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.service.StoreService;
import app.bada.flower.api.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
@Api(value = "상점 컨트롤러", tags = {"상점"})
public class StoreController {

    private final StoreService storeService;
    private final UserService userService;

    @GetMapping("/flower")
    public ResponseEntity getFlowerList(@RequestHeader(value = "X-AUTH-TOKEN", required = false) String token) {
        List<FlowerResDto> response = new ArrayList<>();
        if(!token.equals("Bearer")) {
            User user = userService.getUserByToken(token);
            response = storeService.getFlowerList(user);
        } else {
            response = storeService.getFlowerList();
        }
        return new ResponseEntity(new ResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/rolling")
    public ResponseEntity getRollingItemList(@RequestHeader(value = "X-AUTH-TOKEN") String token) {
        User user = userService.getUserByToken(token);
        List<RollingResDto> response = storeService.getRollingList(user);
        return new ResponseEntity(new ResponseDto(response), HttpStatus.OK);
    }

    @PutMapping("/buy/flower")
    public void buyFlowerItem(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestBody FlowerReqDto flowerReqDto) {
        User user = userService.getUserByToken(token);
        storeService.buyFlowerItem(user, flowerReqDto);
    }

    @PutMapping("/buy/rolling")
    public void buyRollingItem(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestBody RollingReqDto rollingReqDto) {
        User user = userService.getUserByToken(token);
        storeService.buyRollingItem(user, rollingReqDto);
    }




}
