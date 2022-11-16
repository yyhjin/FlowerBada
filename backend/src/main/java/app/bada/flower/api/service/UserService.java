package app.bada.flower.api.service;

import app.bada.flower.api.entity.User;

public interface UserService {
    void logout(String token, String refresh);
    User getUserByToken(String token);
}
