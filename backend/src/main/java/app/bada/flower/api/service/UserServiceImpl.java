package app.bada.flower.api.service;

import app.bada.flower.api.dto.user.SignInResDto;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RedisTemplate redisTemplate;

    public SignInResDto signIn(String token) {
        // 로그인 로직 만들고 수정 필요
        return null;
    }

    @Override
    public User getUserByToken(String userToken) {
        return null;
    }

    @Override
    public void logout(String token) {
        long duration = 24* 60 * 60 * 1000L;
        final String PREFIX = "logout";
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration exp = Duration.ofSeconds(duration);
        valueOperations.set(PREFIX + token, token, exp);
    }
}