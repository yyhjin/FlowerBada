package app.bada.flower.api.dto.mypage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyPointResDto {
    int myPoint;
    ArrayList<MyPointDto> myPointList;
}
