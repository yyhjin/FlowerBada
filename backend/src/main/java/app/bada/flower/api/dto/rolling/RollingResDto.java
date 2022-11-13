package app.bada.flower.api.dto.rolling;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RollingResDto {

    Integer rollingId;
    String name;
    Integer capacity;
    Integer point;
    Integer price;
    String imgUrl;
    String imgFront;
    String imgBack;
    Boolean isOwned;

}
