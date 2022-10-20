package app.bada.flower.api.controller;


import app.bada.flower.api.dto.ResponseDto;
import app.bada.flower.api.dto.user.SignInReqDto;
import app.bada.flower.api.dto.user.SignInResDto;
import app.bada.flower.api.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "유저 API", tags = {"유저"})
@CrossOrigin("*")
@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signin")
    @ApiOperation(value="로그인", notes="로그인 요청을 보냄")
    public ResponseEntity<ResponseDto> signIn(@RequestBody SignInReqDto signInReqDto) {
        // 로그인 로직
        // {
        //  token: string,
        //	jwt: string
        // }
        SignInResDto tokenAndJwt = userService.signIn(signInReqDto.getToken());
        if (tokenAndJwt.getToken() != null) {
            return new ResponseEntity<ResponseDto>(new ResponseDto(tokenAndJwt), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<ResponseDto>(new ResponseDto("로그인 실패"), HttpStatus.FORBIDDEN);
        }
    }
}
