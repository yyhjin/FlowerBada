package app.bada.flower.api.converter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.Query;

@Component
@RequiredArgsConstructor
public class MyPageQuery {
    private final EntityManager em;

    public Query myPagePointList(){
        Query query = em.createNativeQuery("select * from\n" +
                "(\n" +
                "select  i.name, i.point, u.created_date from flower_user u join flower_item i on u.flower_id = i.id\n" +
                "where u.user_id=1\n" +
                "union all\n" +
                "select  i.name, i.point,  u.created_date from rolling_user u join rolling_item i on u.item_id = i.id\n" +
                "where u.user_id=1\n" +
                ") as collect\n" +
                "order by created_date desc ");
        return query;
    }
}
