package app.bada.flower.api.repository;

import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.entity.RollingPaper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findAllByRollingPaper(RollingPaper rollingPaper);
}
