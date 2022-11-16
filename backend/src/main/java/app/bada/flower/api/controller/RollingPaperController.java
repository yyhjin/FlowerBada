package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.rollingpaper.BookmarkResDto;
import app.bada.flower.api.dto.rollingpaper.RollingPaperReqDto;
import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.service.RollingPaperService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "롤링페이퍼 API", tags = {"롤링페이퍼"})
@CrossOrigin("*")
@RequestMapping("/rolling")
@RestController
@RequiredArgsConstructor
public class RollingPaperController {

    private final RollingPaperService rollingPaperService;

    @PostMapping
    @ApiOperation(value="롤링페이퍼 생성", notes="롤링페이퍼를 생성한다.")
    public ResponseEntity<ResponseDto> createRollingPaper(@RequestHeader(value = "X-AUTH-TOKEN") String token, @RequestBody RollingPaperReqDto rollingPaperReqDto) {
        RollingPaper rollingPaper = rollingPaperService.createRollingPaper(token, rollingPaperReqDto);

        if (rollingPaper.getId()!= null) {
            return new ResponseEntity<ResponseDto>(new ResponseDto(rollingPaper.getUrl()), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<ResponseDto>(new ResponseDto("롤링페이퍼 등록 실패"), HttpStatus.FORBIDDEN);
        }
    }

    @PatchMapping("/bookmark/{url}")
    @ApiOperation(value="롤링페이퍼 즐겨찾기 추가/제거", notes="롤링페이퍼를 즐겨찾기에 추가/제거 한다 (처음일 경우 true로 생성)")
    public ResponseEntity<ResponseDto> bookmarkRollingPaper(@RequestHeader(value = "X-AUTH-TOKEN") String token, @PathVariable("url") String url){
        BookmarkResDto bookmarkResDto = rollingPaperService.bookmarkRollingPaper(token, url);
        if (bookmarkResDto!=null) {
            return new ResponseEntity<ResponseDto>(new ResponseDto(bookmarkResDto), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<ResponseDto>(new ResponseDto("롤링페이퍼 즐겨찾기 실패"), HttpStatus.FORBIDDEN);
        }
    }
}
