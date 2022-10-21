package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.delivery.DeliveryResDto;
import app.bada.flower.api.service.DeliveryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "마이페이지 API", tags = {"마이페이지"})
@CrossOrigin("*")
@RequestMapping("/mypage")
@RestController
@RequiredArgsConstructor
public class MyPageController {

    @Autowired
    private final DeliveryService deliveryService;

    @GetMapping("/delivery")
    @ApiOperation(value="배송중 목록", notes="sort = 1(최신순), 2(오래된순)")
    public ResponseEntity deliveringList(@RequestParam int sort, @RequestParam int paginationId) {
        PageRequest pageRequest = PageRequest.of(paginationId,10);
        // 후에 수정
        int userId  = 1;
        if (userId != 0) {
            List<DeliveryResDto> response = deliveryService.selectAllDelivery(userId,sort,pageRequest);
            return new ResponseEntity(new ResponseDto(response), HttpStatus.OK);
        }
        else {
            return new ResponseEntity(new ResponseDto("로그인이 필요한 서비스입니다."), HttpStatus.FORBIDDEN);
        }
    }
}
