package app.bada.flower.api.repository;

import app.bada.flower.api.entity.FlowerItem;
import app.bada.flower.api.entity.FlowerUser;
import app.bada.flower.api.dto.mypage.MyPointDto;
import app.bada.flower.api.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.List;

public interface FlowerUserRepository extends JpaRepository<FlowerUser, Integer> {
    @Query(value = "select f from FlowerItem f join FlowerUser u on f.id = u.flowerItem.id where u.user.id = :userId and f.isDeleted = false and f.point <> 0")
    List<FlowerItem> userPurchasedFlower(@Param("userId") Integer userId);

    @Query(nativeQuery = true, name = "find_pointList")
    Optional<Slice<MyPointDto>> findMyPointList(@Param("user") Integer userId, Pageable pageable);
    Optional<FlowerUser> findByUserAndFlowerItem(User user, FlowerItem flowerItem);

}
