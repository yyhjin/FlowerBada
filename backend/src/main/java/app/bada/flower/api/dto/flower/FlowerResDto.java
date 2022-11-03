package app.bada.flower.api.dto.flower;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FlowerResDto {

    Integer flowerId;
    String name;
    Integer point;
    String flowerLanguage;
    String season;
    Integer price;
    String imgUrl;
    String imgBud;
    Boolean isOwned;

}
