package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Message extends BaseEntity{

    @ManyToOne
    @JoinColumn(name="rolling_id")
    private RollingPaper rollingPaper;

    @OneToOne
    @JoinColumn(name = "flower_id")
    private FlowerItem flowerItem;

    @Column(nullable = false, length=255)
    private String content;

    @Column(nullable = false, length=255)
    private String writer;
}
