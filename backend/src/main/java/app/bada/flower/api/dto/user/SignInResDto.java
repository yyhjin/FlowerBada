package app.bada.flower.api.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignInResDto {
    private String token;
    private String jwt;
}
