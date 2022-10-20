package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class DeliveryState extends BaseEntity{

    @Column(nullable = false)
    private int deliveryStateId;

    @Column(nullable = false)
    private String name;

}
