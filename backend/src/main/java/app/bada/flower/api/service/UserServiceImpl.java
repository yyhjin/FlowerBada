package app.bada.flower.api.service;

import app.bada.flower.api.dto.user.SignInResDto;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final RedisTemplate redisTemplate;
    @Value("${jwt.token.access_token_valid_time}")
    private long tokenValidTime;

    @Override
    public void logout(String token) {
        final String PREFIX = "LOGOUT";
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration exp = Duration.ofSeconds(tokenValidTime);
        valueOperations.set(PREFIX + token, token, exp);
    }
}