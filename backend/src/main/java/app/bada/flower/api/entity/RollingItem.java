package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor
public class RollingItem extends BaseEntity{
    @Column
    private Integer code;

    @Column(nullable = false)
    private String name;

    @Column
    private Integer point;

    @Column
    private Integer capacity;

    @Column
    private Integer price;
}
