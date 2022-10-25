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

import java.util.Optional;

@Repository
public interface FlowerUserRepository extends JpaRepository<FlowerUser, Integer> {
    @Query(nativeQuery = true, name = "find_pointList")
    Optional<Slice<MyPointDto>> findMyPointList(@Param("user") Integer userId, Pageable pageable);
}
