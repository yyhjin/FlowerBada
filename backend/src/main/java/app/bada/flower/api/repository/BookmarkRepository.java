package app.bada.flower.api.repository;

import app.bada.flower.api.entity.Bookmark;
import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    Bookmark findByRollingPaper_IdAndUser_Id(int rollingId, int userId);
}
