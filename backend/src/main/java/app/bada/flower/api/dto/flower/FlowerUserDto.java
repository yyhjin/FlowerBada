package app.bada.flower.api.dto.flower;

import app.bada.flower.api.entity.FlowerUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlowerUserDto {
    private int id;
    private int flowerId;
    private int userId;

    public FlowerUserDto(FlowerUser flowerUser) {
        this.id = flowerUser.getId();
        this.flowerId = flowerUser.getFlowerItem().getId();
        this.userId = flowerUser.getUser().getId();
    }
}
