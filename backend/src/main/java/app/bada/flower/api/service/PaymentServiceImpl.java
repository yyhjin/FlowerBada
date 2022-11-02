package app.bada.flower.api.service;

import app.bada.flower.api.dto.payment.PaymentReadyDto;
import app.bada.flower.api.dto.payment.PaymentSuccessResDto;
import app.bada.flower.api.entity.Transaction;
import app.bada.flower.api.repository.TransactionRepository;
import app.bada.flower.config.PropertyConfig;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{
    private static final String HOST = "https://kapi.kakao.com";
    private final TransactionRepository transactionRepository;

    @Autowired
    private PropertyConfig propertyConfig;

    @Transactional
    public String paymentReady(int rollingId) {
        // System.out.println(rollingId + " 결제 진행중");
        RestTemplate restTemplate = new RestTemplate();

        // 새로운 거래pk 생성
        Transaction singleTransaction = new Transaction();
        transactionRepository.save(singleTransaction);

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + propertyConfig.getAdminKey());
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        String orderId = Integer.toString(singleTransaction.getId());
        params.add("cid", "TC0ONETIME");
        params.add("partner_order_id", orderId);
        params.add("partner_user_id", "꽃바다");
        params.add("item_name", "꽃다발, 꽃 20송이, 롤링페이퍼");
        params.add("quantity", "1");
        params.add("total_amount", "20000");
        params.add("tax_free_amount", "15000");
        params.add("approval_url", "http://localhost:5173/payment/success?order_id=" + orderId);
        params.add("fail_url", "http://localhost:5173/payment/fail");
        params.add("cancel_url", "http://localhost:5173/payment/cancel");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try {
            PaymentReadyDto paymentReadyDto = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, PaymentReadyDto.class);
            singleTransaction.setTid(paymentReadyDto.getTid());
            transactionRepository.save(singleTransaction);
            return paymentReadyDto.getNext_redirect_pc_url();
        } catch (RestClientException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        return "/";
    }

    @Transactional
    public PaymentSuccessResDto paymentApproval(String pg_token, String order_id) {
        // System.out.println("결제 완료!");
        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + propertyConfig.getAdminKey());
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // tid 찾아두기
        Transaction transaction = transactionRepository.findById(Integer.parseInt(order_id)).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        transaction.setPgToken(pg_token);
        transactionRepository.save(transaction);

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("tid", transaction.getTid());
        params.add("partner_order_id", order_id);
        params.add("partner_user_id", "꽃바다");
        params.add("pg_token", pg_token);
        params.add("total_amount", "20000");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try {
            PaymentSuccessResDto paymentSuccessResDto = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, PaymentSuccessResDto.class);

            return paymentSuccessResDto;

        } catch (RestClientException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        return null;
    }
}
