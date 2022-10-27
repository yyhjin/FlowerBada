package app.bada.flower.api.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Bookmark extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="rolling_id")
    private RollingPaper rollingPaper;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Column
    private boolean isValid;

    public void setIsValid() {
        this.isValid = !this.isValid;
    }
}
