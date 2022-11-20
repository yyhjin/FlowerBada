package app.bada.flower.api.dto.rolling;

import app.bada.flower.api.entity.RollingUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RollingUserDto {
    private int id;
    private int rollingId;
    private int userId;

    public RollingUserDto(RollingUser rollingUser) {
        this.id = rollingUser.getId();
        this.rollingId = rollingUser.getRollingItem().getId();
        this.userId = rollingUser.getUser().getId();
    }
}
