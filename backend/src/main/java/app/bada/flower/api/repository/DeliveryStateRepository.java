package app.bada.flower.api.repository;

import app.bada.flower.api.entity.DeliveryState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryStateRepository extends JpaRepository<DeliveryState, Integer> {
}