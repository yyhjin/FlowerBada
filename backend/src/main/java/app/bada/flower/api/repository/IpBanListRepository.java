package app.bada.flower.api.repository;

import app.bada.flower.api.entity.IpBanList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IpBanListRepository extends JpaRepository<IpBanList, Integer> {
    IpBanList findByIp(String ip);
}