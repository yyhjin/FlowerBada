package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.mypage.DeliveryResDto;
import app.bada.flower.api.dto.mypage.MyPointResDto;
import app.bada.flower.api.service.DeliveryService;
import app.bada.flower.api.service.MyPageService;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import app.bada.flower.api.util.S3FileUpload;
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

    @Autowired
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/delivery")
    @ApiOperation(value="배송중 목록", notes="sort = 1(최신순), 2(오래된순)")
    public ResponseEntity deliveringList(@RequestHeader(value = "X-AUTH-TOKEN") String jwtToken, @RequestParam Integer sort, @RequestParam Integer paginationId) {
        if(paginationId!=null && sort != null && (sort==1 || sort==2) && paginationId>=0){
            PageRequest pageRequest = PageRequest.of(paginationId,10);

            List<DeliveryResDto> response = deliveryService.selectAllDelivery(jwtTokenUtil.getUserId(jwtToken.split(" ")[1]),sort,pageRequest);
            return new ResponseEntity(new ResponseDto(response), HttpStatus.OK);
        }else{
            return new ResponseEntity(new ResponseDto(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/mypoint")
    @ApiOperation(value="나의 포인트 목록", notes="최신순 나열")
    public ResponseEntity myPointList(@RequestHeader(value = "X-AUTH-TOKEN") String jwtToken, @RequestParam Integer paginationId) {
        if(paginationId!=null && paginationId>=0){
            PageRequest pageRequest = PageRequest.of(paginationId,20);

            MyPointResDto response = myPageService.selectAllMyPoint(jwtTokenUtil.getUserId(jwtToken.split(" ")[1]), pageRequest);
            return new ResponseEntity(new ResponseDto(response), HttpStatus.OK);
        }else {
            return new ResponseEntity(new ResponseDto(), HttpStatus.BAD_REQUEST);
        }
    }
}
