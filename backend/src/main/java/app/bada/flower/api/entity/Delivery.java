package app.bada.flower.api.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="rolling_id")
    private RollingPaper rollingPaper;

    @Column(nullable = false)
    private String orderId;

    @Column(nullable = false)
    private String imgUrl;

    @Column(nullable = false)
    private String senderName;

    @Column(nullable = false)
    private String senderPhone;

    @Column(nullable = false)
    private String senderMsg;

    private int price;

    @OneToOne
    @JoinColumn(name = "state_id")
    private DeliveryState deliveryState;

    @Column(nullable = false)
    private String receiverName;

    @Column(nullable = false)
    private String receiverPhone;

    @Column(nullable = false)
    private String receiverAddress;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int flowersCount;

}
