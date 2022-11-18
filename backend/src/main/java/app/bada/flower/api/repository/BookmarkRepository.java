package app.bada.flower.api.repository;

import app.bada.flower.api.entity.Bookmark;
import app.bada.flower.api.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    List<Bookmark> findAllByUserAndIsValid(User user, boolean check);

    Optional<Slice<Bookmark>> findAllByUserAndIsValidAndIsDeletedFalseOrderByCreatedDateDesc(User user,boolean check, Pageable pageable);
    Optional<Slice<Bookmark>> findAllByUserAndIsValidAndIsDeletedFalseOrderByCreatedDate(User user,boolean check, Pageable pageable);
    Bookmark findByRollingPaper_IdAndUser_Id(int rollingId, int userId);
}
