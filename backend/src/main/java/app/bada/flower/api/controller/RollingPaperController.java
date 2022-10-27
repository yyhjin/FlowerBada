package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.dto.rollingpaper.BookmarkResDto;
import app.bada.flower.api.dto.rollingpaper.RollingPaperReqDto;
import app.bada.flower.api.dto.rollingpaper.RollingPaperResDto;
import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.repository.MessageRepository;
import app.bada.flower.api.service.MessageService;
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
//        public ResponseEntity<ResponseDto> createRollingPaper(@RequestBody RollingPaperReqDto rollingPaperReqDto) {
//        String token ="ㅋ";
        RollingPaper rollingPaper = rollingPaperService.createRollingPaper(token, rollingPaperReqDto);
        System.out.println(rollingPaper);

        if (rollingPaper.getId()!= null) {
            return new ResponseEntity<ResponseDto>(new ResponseDto(rollingPaper.getId()), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<ResponseDto>(new ResponseDto("롤링페이퍼 등록 실패"), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/{paperId}/{paginationId}")
    @ApiOperation(value="롤링페이퍼 조회", notes="롤링페이퍼를 조회한다.")
    public ResponseEntity<ResponseDto> getRollingPaper(@PathVariable("paperId") int paperId,
                                                       @PathVariable("paginationId") int paginationId) {
        RollingPaperResDto rollingPaperResDto = rollingPaperService.getRollingPaper(paperId, paginationId); // 나중에 paperId 암호화하면 String으로 바꿔보자
        System.out.println(rollingPaperResDto);

        if (rollingPaperResDto!=null) {
            return new ResponseEntity<ResponseDto>(new ResponseDto(rollingPaperResDto), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<ResponseDto>(new ResponseDto("롤링페이퍼 조회 실패"), HttpStatus.FORBIDDEN);
        }
    }

    @PatchMapping("/bookmark/{paperId}")
    @ApiOperation(value="롤링페이퍼 즐겨찾기 추가/제거", notes="롤링페이퍼를 즐겨찾기에 추가/제거 한다 (처음일 경우 true로 생성)")
    public ResponseEntity<ResponseDto> bookmarkRollingPaper(@RequestHeader(value = "X-AUTH-TOKEN") String token, @PathVariable("paperId") int paperId){
        BookmarkResDto bookmarkResDto = rollingPaperService.bookmarkRollingPaper(token, paperId); // 나중에 paperId 암호화하면 String으로 바꿔보자
        System.out.println(bookmarkResDto);
        if (bookmarkResDto!=null) {
            return new ResponseEntity<ResponseDto>(new ResponseDto(bookmarkResDto), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<ResponseDto>(new ResponseDto("롤링페이퍼 즐겨찾기 실패"), HttpStatus.FORBIDDEN);
        }
    }
}
