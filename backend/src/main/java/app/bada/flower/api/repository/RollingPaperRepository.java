package app.bada.flower.api.repository;

import app.bada.flower.api.entity.RollingPaper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RollingPaperRepository extends JpaRepository<RollingPaper, Integer> {
}
