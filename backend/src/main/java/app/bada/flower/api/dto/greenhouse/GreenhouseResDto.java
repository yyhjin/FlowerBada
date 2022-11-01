package app.bada.flower.api.dto.greenhouse;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Setter
@Getter
public class GreenhouseResDto {
        private String url;
        private String title;
        private String imgUrl;
        private String date;

        public String changeDateToString(LocalDateTime date){
                String formatDate = date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                StringBuilder sb = new StringBuilder();
                sb.append(formatDate.substring(0,4)).append(".").append(formatDate.substring(4,6)).append(".").append(formatDate.substring(6,8));
                return sb.toString();
        }
}
