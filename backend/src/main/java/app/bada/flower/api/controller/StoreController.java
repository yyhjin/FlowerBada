package app.bada.flower.api.controller;

import app.bada.flower.api.entity.User;
import app.bada.flower.api.service.StoreService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
@Api(value = "상점 컨트롤러")
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public ResponseEntity<?> getFlowerList(@RequestHeader(value = "X-AUTH-TOKEN") String token) {
        User user = new User(); // TEMP
        return ResponseEntity.ok(storeService.getFlowerList(user));
    }


}
