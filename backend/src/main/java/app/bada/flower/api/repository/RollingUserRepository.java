package app.bada.flower.api.repository;

import app.bada.flower.api.entity.RollingItem;
import app.bada.flower.api.entity.RollingUser;
import app.bada.flower.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RollingUserRepository extends JpaRepository<RollingUser, Integer> {
    @Query(value = "select r from RollingItem r join RollingUser u on r.id = u.rollingItem.id where u.user.id = :userId and r.isDeleted = false and r.point <> 0")
    List<RollingItem> userPurchasedRollingItem(@Param("userId") Integer userId);

    Optional<RollingUser> findByUserAndRollingItem(User user, RollingItem rollingItem);
}
