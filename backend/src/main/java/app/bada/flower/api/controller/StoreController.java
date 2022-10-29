package app.bada.flower.api.controller;

import app.bada.flower.api.dto.flower.FlowerDto;
import app.bada.flower.api.dto.flower.FlowerUserDto;
import app.bada.flower.api.entity.FlowerItem;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.service.StoreService;
import app.bada.flower.api.service.UserService;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
@Api(value = "상점 컨트롤러", tags = {"상점"})
public class StoreController {

    private final StoreService storeService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getFlowerList(@RequestHeader(value = "X-AUTH-TOKEN") String token) {
        User user = userService.getUserByToken(token);
        return ResponseEntity.ok(storeService.getFlowerList(user));
    }

    @PutMapping
    public ResponseEntity<?> buyFlowerItem(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestBody FlowerDto flowerDto) {
        User user = userService.getUserByToken(token);
        storeService.buyFlowerItem(user, flowerDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }




}
