package app.bada.flower.api.entity;

import javax.persistence.Column;

public class User extends BaseEntity{
    @Column(nullable = false, length=256)
    private String token;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int points;
}
