package app.bada.flower.api.dto.flower;

import lombok.Setter;

@Setter
public class FlowerResDto {

    Integer flowerId;
    String name;
    Integer point;
    String flowerLanguage;
    String season;
    Integer price;
    String imgUrl;
    Boolean isOwned;

}
