package app.bada.flower.api.service;

import app.bada.flower.api.dto.user.SignInResDto;
import app.bada.flower.api.entity.User;

public interface UserService {
    SignInResDto signIn(String token);
    User getUserByToken(String userToken);
    void logout(String token);
}
