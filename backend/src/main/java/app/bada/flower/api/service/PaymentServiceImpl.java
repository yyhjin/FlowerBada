package app.bada.flower.api.service;

import app.bada.flower.api.dto.payment.PaymentReadyReqDto;
import app.bada.flower.api.dto.payment.PaymentReadyResDto;
import app.bada.flower.api.dto.payment.PaymentSuccessResDto;
import app.bada.flower.api.entity.*;
import app.bada.flower.api.repository.*;
import app.bada.flower.api.util.S3FileUpload;
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
    private final DeliveryRepository deliveryRepository;
    private final UserRepository userRepository;
    private final RollingPaperRepository rollingPaperRepository;
    private final DeliveryStateRepository deliveryStateRepository;

    static String DEV = "http://localhost:5173/";
    static String SERVER = "https://k7a405.p.ssafy.io/";


    @Autowired
    S3FileUpload s3FileUpload;

    @Autowired
    private PropertyConfig propertyConfig;

    @Transactional
    public String paymentReady(PaymentReadyReqDto paymentReadyReqDto) {
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
        String optionName = "";
        if (paymentReadyReqDto.getOptionType().equals("rollingPaperOnly")) optionName = "[롤링페이퍼]";
        else if (paymentReadyReqDto.getOptionType().equals("both")) optionName = "[꽃 + 롤링페이퍼]";
        params.add("item_name", optionName + paymentReadyReqDto.getTitle());
        params.add("quantity", "1");
        params.add("total_amount", paymentReadyReqDto.getPrice() + "");
        params.add("tax_free_amount", paymentReadyReqDto.getPrice() + "");
        params.add("approval_url", SERVER + "payment/success?order_id=" + orderId);
        params.add("fail_url", SERVER + "payment/fail");
        params.add("cancel_url", SERVER + "payment/cancel");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try {
            PaymentReadyResDto paymentReadyResDto = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, PaymentReadyResDto.class);
            singleTransaction.setTid(paymentReadyResDto.getTid());
            transactionRepository.save(singleTransaction);

            User requestUser = userRepository.findByKakaoUserId(paymentReadyReqDto.getUserToken()).orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
            RollingPaper rollingPaper = rollingPaperRepository.findById(paymentReadyReqDto.getRollingId()).orElseThrow(()-> new CustomException(ErrorCode.POSTS_NOT_FOUND));
            DeliveryState deliveryState = deliveryStateRepository.findById(1).orElseThrow(()-> new CustomException(ErrorCode.ITEM_NOT_FOUND));

            Delivery delivery = Delivery.builder()
                    .user(requestUser)
                    .rollingPaper(rollingPaper)
                    .orderId(orderId)
                    .imgUrl(paymentReadyReqDto.getImgUrl())
                    .senderName(paymentReadyReqDto.getSenderName())
                    .senderPhone(paymentReadyReqDto.getSenderPhone())
                    .senderMsg(paymentReadyReqDto.getSenderMsg())
                    .price(paymentReadyReqDto.getPrice())
                    .deliveryState(deliveryState)
                    .receiverName(paymentReadyReqDto.getReceiverName())
                    .receiverPhone(paymentReadyReqDto.getReceiverPhone())
                    .receiverAddress(paymentReadyReqDto.getReceiverAddress())
                    .flowersCount(paymentReadyReqDto.getFlowerCnt())
                    .build();
            deliveryRepository.save(delivery);

            return paymentReadyResDto.getNext_redirect_pc_url();
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

        Delivery delivery = deliveryRepository.findByOrderId(order_id).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("tid", transaction.getTid());
        params.add("partner_order_id", order_id);
        params.add("partner_user_id", "꽃바다");
        params.add("pg_token", pg_token);
        params.add("total_amount", delivery.getPrice() + "");

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
