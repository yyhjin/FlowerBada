package app.bada.flower.api.controller;

import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.greenhouse.GreenhouseResDto;
import app.bada.flower.api.service.GreenhouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "그린하우스 API", tags = {"그린하우스"})
@CrossOrigin("*")
@RequestMapping("/greenhouse")
@RestController
@RequiredArgsConstructor
public class GreenhouseController {

    private final GreenhouseService greenhouseService;

    @GetMapping("/sent")
    @ApiOperation(value = "내가 쓴 롤링페이퍼 조회", notes = "그린하우스에서 내가 작성한 롤링페이퍼 목록을 조회 ")
    public ResponseEntity<ResponseDto> getMyRollingPapers(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestParam Integer sort, @RequestParam Integer paginationId) {
        if(paginationId!=null && sort != null && (sort==1 || sort==2) && paginationId>=0){
            PageRequest pageRequest = PageRequest.of(paginationId,6);
            List<GreenhouseResDto> rollingPapers = greenhouseService.getMyRollingPapers(token,sort,pageRequest);
            return new ResponseEntity<>(new ResponseDto(rollingPapers), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("내가 쓴 롤링 페이퍼 조회 실패"), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/bookmark")
    @ApiOperation(value = "즐겨찾기 한 롤링페이퍼 조회", notes = "그린하우스에서 내가 즐겨찾기한 롤링페이퍼 목록을 조회 ")
    public ResponseEntity<ResponseDto> getMyBookmarks(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestParam Integer sort, @RequestParam Integer paginationId) {
        if(paginationId!=null && sort != null && (sort==1 || sort==2) && paginationId>=0){
            PageRequest pageRequest = PageRequest.of(paginationId,6);
            List<GreenhouseResDto> rollingPapers = greenhouseService.getMyBookmarks(token,sort,pageRequest);
            return new ResponseEntity<>(new ResponseDto(rollingPapers), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseDto("내가 즐겨찾기한 롤링 페이퍼 조회실패"), HttpStatus.FORBIDDEN);
        }
    }


}
