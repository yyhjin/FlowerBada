package app.bada.flower.api.service;

import app.bada.flower.api.dto.user.SignInResDto;
import app.bada.flower.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public SignInResDto signIn(String token) {
        // 로그인 로직 만들고 수정 필요
        userRepository.findById(123);
        SignInResDto tmp = new SignInResDto();
        return tmp;
    }
}