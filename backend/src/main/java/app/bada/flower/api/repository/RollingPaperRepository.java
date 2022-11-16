package app.bada.flower.api.repository;

import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RollingPaperRepository extends JpaRepository<RollingPaper, Integer> {
    Optional<Slice<RollingPaper>> findAllByUserAndIsDeletedFalseOrderByCreatedDateDesc(User user, Pageable pageable);
    Optional<Slice<RollingPaper>> findAllByUserAndIsDeletedFalseOrderByCreatedDate(User user, Pageable pageable);
    Optional<RollingPaper> findByUrl(String url);

}
