package app.bada.flower.api.repository;

import app.bada.flower.api.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer>, MessageRepositoryCustom {
}
