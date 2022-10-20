package app.bada.flower.api.service;

import app.bada.flower.api.dto.user.SignInResDto;

public interface UserService {
    SignInResDto signIn(String token);
}
