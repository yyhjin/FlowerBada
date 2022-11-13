package app.bada.flower.api.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class FlowerUserQueryRepository {
    static private JPAQueryFactory jpaQueryFactory;
}
