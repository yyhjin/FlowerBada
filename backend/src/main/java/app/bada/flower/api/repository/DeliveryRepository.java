package app.bada.flower.api.repository;

import app.bada.flower.api.entity.Delivery;
import app.bada.flower.api.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
    Optional<Slice<Delivery>> findAllByUserAndIsDeletedFalseOrderByCreatedDateDesc(User user, Pageable pageable);
    Optional<Slice<Delivery>> findAllByUserAndIsDeletedFalseOrderByCreatedDate(User user, Pageable pageable);

    Optional<Delivery> findByOrderId(String order_id);
}
