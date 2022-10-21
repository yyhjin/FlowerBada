package app.bada.flower.api.repository;

import app.bada.flower.api.entity.RollingUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RollingUserRepository extends JpaRepository<RollingUser, Integer> {
}
