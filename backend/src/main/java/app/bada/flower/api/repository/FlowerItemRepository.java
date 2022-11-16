package app.bada.flower.api.repository;

import app.bada.flower.api.entity.FlowerItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlowerItemRepository extends JpaRepository<FlowerItem, Integer> {
    @Query(value = "select f from FlowerItem f")
    List<FlowerItem> findAllFlowerItem();
}
