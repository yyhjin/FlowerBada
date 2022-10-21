package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class RollingPaper extends BaseEntity{

    @OneToOne
    @JoinColumn(name="item_id")
    private RollingItem rollingPaperItem;

    @Column(nullable = false)
    private String makerNickname;

    @Column(nullable = false)
    private String makerToken;

    @Column(nullable = false)
    private String receiverPhone;

    @Column(updatable = false)
    private LocalDateTime open_date;

    @Column(nullable = false)
    private String url;

    @Column
    private String imgUrl;

    @OneToMany(mappedBy = "rollingPaper")
    private List<Message> messages = new ArrayList<>();
}
