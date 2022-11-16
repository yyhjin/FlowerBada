package app.bada.flower.api.repository;
import app.bada.flower.api.entity.RollingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RollingItemRepository extends JpaRepository<RollingItem, Integer> {
    @Query(value = "select r from RollingItem r")
    List<RollingItem> findAllRollingItem();
}
