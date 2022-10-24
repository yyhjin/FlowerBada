package app.bada.flower.api.repository;

import app.bada.flower.api.entity.FlowerItem;
import app.bada.flower.api.entity.FlowerUser;
import app.bada.flower.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface FlowerUserRepository extends JpaRepository<FlowerUser, Integer> {
    @Query(value = "select f from FlowerUser f where f.user.id = :userId")
    List<FlowerUser> findUserFlower(@Param("userId") Integer userId);

    @Query(value = "select f.id, f.flowerLanguage, f.imgUrl, f.name, f.point, f.price, f.season from FlowerItem f join FlowerUser u on f.id = u.flowerItem.id where u.user.id = :userId and f.isDeleted = false and f.point <> 0")
    List<FlowerItem> userPurchasedFlower(@Param("userId") Integer userId);

}
