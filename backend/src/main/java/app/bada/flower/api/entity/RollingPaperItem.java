package app.bada.flower.api.entity;

import javax.persistence.Column;

public class RollingPaperItem extends BaseEntity{
    @Column
    private Integer code;

    @Column(nullable = false, length=255)
    private String name;

    @Column
    private Integer point;

    @Column
    private Integer capacity;

    @Column
    private Integer price;
}
