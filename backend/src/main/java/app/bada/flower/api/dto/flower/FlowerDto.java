package app.bada.flower.api.dto.flower;

import app.bada.flower.api.entity.FlowerItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlowerDto {
    private int id;
    private String name;
    private String flowerLanguage;
    private String season;
    private int point;
    private int price;
    private String imgUrl;

    public FlowerDto(FlowerItem flowerItem) {
        this.id = flowerItem.getId();
        this.name = flowerItem.getName();
        this.flowerLanguage = flowerItem.getFlowerLanguage();
        this.season = flowerItem.getSeason();
        this.point = flowerItem.getPoint();
        this.price = flowerItem.getPrice();
        this.imgUrl = flowerItem.getImgUrl();
    }
}
