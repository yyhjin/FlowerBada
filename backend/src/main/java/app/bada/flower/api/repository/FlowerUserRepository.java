package app.bada.flower.api.repository;

import app.bada.flower.api.entity.FlowerUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowerUserRepository extends JpaRepository<FlowerUser, Integer> {
}
