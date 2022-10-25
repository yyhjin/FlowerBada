package app.bada.flower.api.dto.auth;

import app.bada.flower.api.entity.User;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OAuthRes {
    private String jwtToken;
    private String accessToken;
    private Boolean registered;
    private User user;
}
