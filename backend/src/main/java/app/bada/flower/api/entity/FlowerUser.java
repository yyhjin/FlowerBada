package app.bada.flower.api.entity;

import app.bada.flower.api.dto.mypage.MyPointDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@NamedNativeQuery(
        name = "find_pointList",
        query =
                "select * from (" +
                " select i.name, i.point, DATE_FORMAT(u.created_date, '%Y.%m.%d') as createdDate from flower_user u join flower_item i on u.flower_id = i.id "+
                " where u.user_id = :user "+
                " union all " +
                " select i.name, i.point,  DATE_FORMAT(u.created_date, '%Y.%m.%d') as createdDate from rolling_user u join rolling_item i on u.item_id = i.id " +
                " where u.user_id = :user " +
                ") as collect order by createdDate desc ",
        resultSetMapping = "myPointDto"
)
@SqlResultSetMapping(
        name = "myPointDto",
        classes = @ConstructorResult(
                targetClass = MyPointDto.class,
                columns = {
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "point", type = Integer.class),
                        @ColumnResult(name = "createdDate", type = String.class)
                }
        )
)
public class FlowerUser extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="flower_id")
    private FlowerItem flowerItem;

}
