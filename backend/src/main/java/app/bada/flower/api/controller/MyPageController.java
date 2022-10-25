package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.mypage.DeliveryResDto;
import app.bada.flower.api.dto.mypage.MyPointResDto;
import app.bada.flower.api.service.DeliveryService;
import app.bada.flower.api.service.MyPageService;
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

    @Autowired
    private final MyPageService myPageService;

    @GetMapping("/delivery")
    @ApiOperation(value="배송중 목록", notes="sort = 1(최신순), 2(오래된순)")
    public ResponseEntity deliveringList(@RequestHeader(value = "X-AUTH-TOKEN", required = false) String jwtToken, @RequestParam int sort, @RequestParam int paginationId) {
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
    @GetMapping("/mypoint")
    @ApiOperation(value="나의 포인트 목록", notes="최신순 나열")
    public ResponseEntity myPointList(@RequestHeader(value = "X-AUTH-TOKEN", required = false) String jwtToken, @RequestParam int paginationId) {
        PageRequest pageRequest = PageRequest.of(paginationId,10);

        // 후에 수정
        int userId  = 1;
        if (userId != 0) {
            MyPointResDto response = myPageService.selectAllMyPoint(userId,pageRequest);
            return new ResponseEntity(new ResponseDto(response), HttpStatus.OK);
        }
        else {
            return new ResponseEntity(new ResponseDto("로그인이 필요한 서비스입니다."), HttpStatus.FORBIDDEN);
        }
    }
}
