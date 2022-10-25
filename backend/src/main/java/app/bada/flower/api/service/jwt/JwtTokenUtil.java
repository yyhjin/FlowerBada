package app.bada.flower.api.service.jwt;

import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.api.service.UserService;
import app.bada.flower.api.service.auth.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RequiredArgsConstructor
@Component
public class JwtTokenUtil {

    private String secretKey = "flowerbada";
    // 토큰 유효시간 설정: 24시간
    private long tokenValidTime = 24 * 60 * 60 * 1000L;
    private final CustomUserDetailService userDetailService;
    private final RedisTemplate redisTemplate;
    private final UserRepository userRepository;

    // 객체 초기화, secretKey를 Base64로 인코딩
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 토큰 생성
    public String createToken(String userToken, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userToken);
        claims.put("roles", roles);
        claims.put("nonce", "flowerbada");
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘과 signature에 들어갈 secret값 세팅
                .compact();
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) throws UsernameNotFoundException {
        User userDetails = userDetailService.loadUserByUsername(this.getUserToken(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "");
    }

    // 토큰에서 회원 토큰 추출
    public String getUserToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // 토큰에서 회원 아이디 추출
    public int getUserId(String jwt) {
        String token = getUserToken(jwt);
        User user = userRepository.findByKakaoUserId(token).orElse(null);
        if(user == null)
            throw new IllegalStateException("해당 유저가 존재하지 않습니다.");
        return user.getId();
    }

    // 토큰에서 회원 권한(role) 추출
    public List<String> getUserRoles(String jwt) {
        String token = getUserToken(jwt);
        User user = userRepository.findByKakaoUserId(token).orElse(null);
        if(user == null)
            throw new IllegalStateException("해당 유저가 존재하지 않습니다.");
        return user.getRoles();
    }

    // Request의 Header에서 token 값을 가져옵니다. "X-AUTH-TOKEN" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    // 토큰의 유효성 & 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            boolean flag = !claims.getBody().getExpiration().before(new Date()); // 만료일자 검사
            flag &= claims.getBody().get("nonce").equals("flowerbada"); // nonce 검사
            return flag;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isLogout(String jwtToken) {
        final String PREFIX = "logout";
        if(redisTemplate.opsForValue().get(PREFIX+jwtToken)==null) {
            return false;
        }
        return true;
    }
}
