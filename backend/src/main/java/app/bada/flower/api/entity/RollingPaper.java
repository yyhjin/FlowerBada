package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class RollingPaper extends BaseEntity{

    @OneToOne
    @JoinColumn(name="item_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private RollingPaperItem rollingPaperItem;

    @Column(nullable = false, length=255)
    private String makerNickname;

    @Column(nullable = false, length=255)
    private String makerToken;

    @Column(nullable = false, length=255)
    private String receiverPhone;

    @Column(updatable = false)
    private LocalDateTime open_date;

    @Column(nullable = false, length=255)
    private String url;
}
