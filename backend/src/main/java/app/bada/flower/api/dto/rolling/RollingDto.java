package app.bada.flower.api.dto.rolling;

import app.bada.flower.api.entity.RollingItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RollingDto {
    private int id;
    private String name;
    private int capacity;
    private int point;
    private int price;
    private String imgUrl;

    public RollingDto(RollingItem rollingItem) {
        this.id = rollingItem.getId();
        this.name = rollingItem.getName();
        this.capacity = rollingItem.getCapacity();
        this.point = rollingItem.getPoint();
        this.price = rollingItem.getPrice();
        this.imgUrl = rollingItem.getImgUrl();
    }
}
