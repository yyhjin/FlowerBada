package app.bada.flower.api.service;

import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import app.bada.flower.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

import static app.bada.flower.exception.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final RedisTemplate redisTemplate;
    
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;

    @Override
    public User getUserByToken(String userToken) {
        int userId = jwtTokenUtil.getUserId(userToken.split(" ")[1]);
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }

    @Value("${jwt.token.access_token_valid_time}")
    private long tokenValidTime;
    @Override
    public void logout(String token, String refresh) {
        Duration exp = Duration.ofSeconds(tokenValidTime/1000);
        redisTemplate.opsForValue().set("LOGOUT " + token, token, exp);
        redisTemplate.delete("REFRESH " + refresh);
    }
}