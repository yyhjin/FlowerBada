package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor
public class Transaction extends BaseEntity{
    @Column
    private String tid;

    @Column
    private String pgToken;

    public void setTid(String tid) {
        this.tid = tid;
    }

    public void setPgToken(String pgToken) {
        this.pgToken = pgToken;
    }
}
