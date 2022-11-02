package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor
public class RollingItem extends BaseEntity{
    @Column(nullable = false)
    private String name;

    @Column
    private Integer point;

    @Column
    private Integer capacity;

    @Column
    private Integer price;

    @Column(nullable = false)
    private String imgUrl;

    @Column(nullable = false)
    private String imgFront;

    @Column(nullable = false)
    private String imgBack;
}
