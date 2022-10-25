package app.bada.flower.api.dto.mypage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryResDto {
    int paperId;
    String title;
    String imgUrl;
    String pageUrl;
    String date;
    String sender;
    String receiver;
    int flowerCount;
    int price;
    String status;

    public String changeDateToString(LocalDateTime date){
        String formatDate = date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        StringBuilder sb = new StringBuilder();
        sb.append(formatDate.substring(0,4)).append(".").append(formatDate.substring(4,6)).append(".").append(formatDate.substring(6,8));
        return sb.toString();
    }
}
