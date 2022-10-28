package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class FlowerItem extends BaseEntity{

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String flowerLanguage;

    @Column(nullable = false)
    private String season;

    private int point;

    private int price;

    @Column(nullable = false)
    private String imgUrl;

}
