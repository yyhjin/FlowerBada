package app.bada.flower.api.service.auth;

import app.bada.flower.api.dto.auth.KakaoOAuthToken;
import app.bada.flower.api.dto.auth.KakaoUser;
import app.bada.flower.api.dto.auth.OAuthRes;
import app.bada.flower.api.dto.type.SocialLoginType;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OAuthService {
    private final UserRepository userRepository;
    private final KakaoOAuth kakaoOAuth;
    private final JwtTokenUtil jwtTokenUtil;
    private final RedisTemplate redisTemplate;

    @Value("${jwt.token.refresh_token_valid_time}")
    private long refreshTokenValidTime;

    public Map<String, String> request(SocialLoginType socialLoginType) throws IOException {
        Map<String, String> resultMap = new HashMap<>();
        String redirectURL;
        switch (socialLoginType){
            //각 소셜 로그인을 요청하면 소셜로그인 페이지로 리다이렉트
            case KAKAO: {
                redirectURL = kakaoOAuth.getOauthRedirectURL();
                resultMap.put("redirectURL", redirectURL);
                break;
            }
            default:{
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
        return resultMap;
    }

    public OAuthRes oAuthLogin(SocialLoginType socialLoginType, String code) throws Exception {

        switch (socialLoginType){
            case KAKAO:{
                //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
                ResponseEntity<String> accessTokenResponse= kakaoOAuth.requestAccessToken(code);
                //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담을 것이다.
                KakaoOAuthToken oAuthToken=kakaoOAuth.getAccessToken(accessTokenResponse);

                //액세스 토큰을 다시 카카오로 보내 카카오에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
                ResponseEntity<String> userInfoResponse=kakaoOAuth.requestUserInfo(oAuthToken);
                //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
                KakaoUser kakaoUser= kakaoOAuth.getUserInfo(userInfoResponse);
//                System.out.println(kakaoUser);

                String user_id = String.valueOf(kakaoUser.getId());
                //우리 서버의 db와 대조하여 해당 user가 존재하는 지 확인한다.
                User user = userRepository.findByKakaoUserId(user_id).orElse(null);

                OAuthRes res = null;
                String refreshToken = null;
                if(user != null) {
                    // 하루에 한 번 로그인 시 10 포인트 지급 - 자정 기준
                    LocalDateTime lastLoginDate = user.getLastLoginDate();
                    LocalDateTime nowDate = LocalDateTime.now();
                    if(lastLoginDate.getYear() != nowDate.getYear() ||
                            lastLoginDate.getMonth() != nowDate.getMonth() ||
                            lastLoginDate.getDayOfMonth() != nowDate.getDayOfMonth()) {
                        user.updatePoint(user.getPoints()+10);
                    }
                    user.updateLastLoginDate(LocalDateTime.now());
                    userRepository.save(user);
                    //서버에 user가 존재하면 앞으로 회원 인가 처리를 위한 jwtToken을 발급한다.
                    String jwtToken = jwtTokenUtil.createToken(user.getToken(), user.getRoles());
                    refreshToken = jwtTokenUtil.createRefreshToken(user.getToken(), user.getRoles());
                    //액세스 토큰과 jwtToken, 이외 정보들이 담긴 자바 객체를 다시 전송한다.
                    res = OAuthRes.builder()
                            .jwtToken(jwtToken)
                            .refreshToken(refreshToken)
                            .accessToken(oAuthToken.getAccess_token())
                            .registered(true)
                            .user(user)
                            .build();
                }else {
//                    throw new Exception("Account does not exists.");
                    System.out.println("--------소셜 회원가입--------");
                    user = User.builder()
                            .token(String.valueOf(kakaoUser.getId()))
                            .points(200) // 회원가입 시에 200포인트 지급
                            .nickname(kakaoUser.getNickname())
                            .roles(Arrays.asList("ROLE_USER"))
                            .lastLoginDate(LocalDateTime.now())
                            .build();
                    try {
                        userRepository.save(user);
                    }catch(Exception e){
                        throw new Exception("유저 회원가입 실패 - DB에 save 실패");
                    }

                    String jwtToken = jwtTokenUtil.createToken(user.getToken(), user.getRoles());
                    refreshToken = jwtTokenUtil.createRefreshToken(user.getToken(), user.getRoles());
                    res = OAuthRes.builder()
                            .jwtToken(jwtToken)
                            .refreshToken(refreshToken)
                            .accessToken(oAuthToken.getAccess_token())
                            .registered(false)
                            .user(user)
                            .build();
                }

                //refresh token 관련
                redisTemplate.opsForValue().set("REFRESH "+refreshToken, refreshToken, Duration.ofSeconds(refreshTokenValidTime/1000));
                return res;
            }
            default:{
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
    }

}