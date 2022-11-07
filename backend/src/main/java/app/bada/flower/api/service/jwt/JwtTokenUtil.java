package app.bada.flower.api.service.jwt;

import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.api.service.UserService;
import app.bada.flower.api.service.auth.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${jwt.secret}")
    private String secretKey;
    private String nonce = "flowerbada";

    @Value("${jwt.token.access_token_valid_time}")
    private long tokenValidTime;
    @Value("${jwt.token.refresh_token_valid_time}")
    private long refreshTokenValidTime;
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
        return generateToken(userToken, roles, tokenValidTime);
    }

    public String createRefreshToken(String userToken, List<String> roles) {
        return generateToken(userToken, roles, refreshTokenValidTime);
    }

    public String generateToken(String userToken, List<String> roles, long expTime){
        Claims claims = Jwts.claims().setSubject(userToken);
        claims.put("roles", roles);
        claims.put("nonce", nonce);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + expTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 사용할 암호화 알고리즘과 signature에 들어갈 secret값 세팅
                .compact();
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) throws UsernameNotFoundException {
        User userDetails = userDetailService.loadUserByUsername(this.getUserToken(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
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

    // Request의 Header에서 token 값을 가져옴
    public String resolveToken(HttpServletRequest request, String type) {
        String header = request.getHeader(type);
        try {
            return header == null ? null : header.split(" ")[1];
        } catch(IndexOutOfBoundsException e){
            return null;
        }
    }

    // 토큰의 유효성 & 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            boolean flag = !claims.getBody().getExpiration().before(new Date()); // 만료일자 검사
            flag &= claims.getBody().get("nonce").equals(nonce); // nonce 검사
            return flag;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isLogout(String jwtToken) {
        final String PREFIX = "LOGOUT";
        if(redisTemplate.opsForValue().get(PREFIX+jwtToken)==null) {
            System.out.println("logout: false");
            return false;
        }
        System.out.println("logout: true");
        return true;
    }
}
