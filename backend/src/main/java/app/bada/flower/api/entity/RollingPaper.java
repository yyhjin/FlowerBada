package app.bada.flower.api.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RollingPaper extends BaseEntity{

    @ManyToOne
    @JoinColumn(name="item_id")
    private RollingItem rollingPaperItem;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String makerNickname;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime openDate;

    @Column(nullable = false)
    private String url;

    @Column
    private String imgUrl;

    @OneToMany(mappedBy = "rollingPaper")
    private List<Message> messages = new ArrayList<>();

    public void imgUrlUpdate(String imgUrl) { this.imgUrl = imgUrl ; }
}
