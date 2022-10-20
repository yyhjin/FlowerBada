package app.bada.flower.api.repository;

import app.bada.flower.api.entity.FlowerItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowerItemRepository extends JpaRepository<FlowerItem, Integer> {
}
