package app.bada.flower.api.repository;

import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RollingPaperRepository extends JpaRepository<RollingPaper, Integer> {
    List<RollingPaper> findAllByUser(User user);
    Optional<RollingPaper> findByUrl(String url);
}
