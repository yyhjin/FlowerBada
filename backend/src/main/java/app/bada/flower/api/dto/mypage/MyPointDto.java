package app.bada.flower.api.dto.mypage;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyPointDto {
    String name;
    Integer point;
    String createdDate;
}
