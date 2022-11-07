package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ip_ban_list")
@Getter
@NoArgsConstructor
public class IpBanList extends BaseEntity {
    private String ip;
    public IpBanList(String ip){this.ip=ip;}
}