package app.bada.flower.api.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Data
public class UserInfo {
    private Integer id;
    private String token;
    private String nickname;
    private Integer points;
}
