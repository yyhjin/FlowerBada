package app.bada.flower.api.repository;

import app.bada.flower.api.dto.mypage.MyPointDto;
import app.bada.flower.api.entity.FlowerUser;
import app.bada.flower.api.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowerUserRepository extends JpaRepository<FlowerUser, Integer> {
    @Query(nativeQuery = true,
            value = "select * from (" +
                    " select u.id, u.is_deleted, u.updated_date, u.flower_id, u.created_date, u.user_id  from flower_user u join flower_item i on u.flower_id = i.id "+
                    " where u.user_id = :user "+
                    " union all " +
                    " select u.id, u.is_deleted, u.updated_date, u.item_id as \"flower_id\", u.created_date, u.user_id from rolling_user u join rolling_item i on u.item_id = i.id " +
                    " where u.user_id = :user " +
                    ") as collect order by created_date desc ",
            countQuery = "select * from (" +
                    " select u.id, u.is_deleted, u.updated_date, u.flower_id, u.created_date, u.user_id  from flower_user u join flower_item i on u.flower_id = i.id "+
                    " where u.user_id = :user "+
                    " union all " +
                    " select u.id, u.is_deleted, u.updated_date, u.item_id as \"flower_id\", u.created_date, u.user_id from rolling_user u join rolling_item i on u.item_id = i.id " +
                    " where u.user_id = :user " +
                    ") as collect order by created_date desc ")
    Slice<FlowerUser> findMyPointList(@Param("user") Integer userId, Pageable pageable);
}
