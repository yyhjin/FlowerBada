package app.bada.flower.api.repository;

import app.bada.flower.api.entity.RollingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RollingItemRepository extends JpaRepository<RollingItem, Integer> {
}
