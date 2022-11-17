package app.bada.flower.api.service.auth;

import app.bada.flower.api.dto.auth.KakaoOAuthToken;
import app.bada.flower.api.dto.auth.KakaoUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@CrossOrigin("*")
public class KakaoOAuth {
    private String KAKAO_SNS_LOGIN_URL = "https://kauth.kakao.com/oauth/authorize";
    private String KAKAO_TOKEN_REQUEST_URL = "https://kauth.kakao.com/oauth/token";
    private String KAKAO_USERINFO_REQUEST_URL = "https://kapi.kakao.com/v2/user/me";
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String KAKAO_SNS_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String KAKAO_SNS_CALLBACK_URI;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String KAKAO_SNS_CLIENT_SECRET;

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    public String getOauthRedirectURL() {
        Map<String,Object> params = new HashMap<>();
        params.put("client_id",KAKAO_SNS_CLIENT_ID);
        params.put("redirect_uri",KAKAO_SNS_CALLBACK_URI);
        params.put("response_type","code");

        String parameterString=params.entrySet().stream()
                .map(x->x.getKey()+"="+x.getValue())
                .collect(Collectors.joining("&"));
        String redirectURL=KAKAO_SNS_LOGIN_URL+"?"+parameterString;
//        System.out.println("redirectURL = " + redirectURL);

        return redirectURL;
    }

    public ResponseEntity<String> requestAccessToken(String code){
        RestTemplate restTemplate=new RestTemplate();
//        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
//        restTemplate.setErrorHandler(new DefaultResponseErrorHandler(){
//            public boolean hasError(ClientHttpResponse response) throws IOException {
//                HttpStatus statusCode = response.getStatusCode();
//                return statusCode.series() == HttpStatus.Series.SERVER_ERROR;
//            }
//        });
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", KAKAO_SNS_CLIENT_ID);
        params.add("redirect_uri", KAKAO_SNS_CALLBACK_URI);
        params.add("code", code);
        params.add("client_secret", KAKAO_SNS_CLIENT_SECRET);

        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(params, headers);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(KAKAO_TOKEN_REQUEST_URL, entity, String.class);

        if(responseEntity.getStatusCode()== HttpStatus.OK){
            return responseEntity;
        }
        return null;
    }

    public KakaoOAuthToken getAccessToken(ResponseEntity<String> response) throws JsonProcessingException {
        KakaoOAuthToken kakaoOAuthToken= objectMapper.readValue(response.getBody(),KakaoOAuthToken.class);
        return kakaoOAuthToken;
    }

    public ResponseEntity<String> requestUserInfo(KakaoOAuthToken oAuthToken) {
//        System.out.println("oAuthToken = " + oAuthToken);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer "+oAuthToken.getAccess_token());
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity(headers);
//        System.out.println("============카카오에 회원 정보 요청============");
        ResponseEntity<String> response = restTemplate.exchange(KAKAO_USERINFO_REQUEST_URL, HttpMethod.GET, entity, String.class);
//        System.out.println("response.getBody() = " + response.getBody());
        return response;
    }

    public KakaoUser getUserInfo(ResponseEntity<String> userInfoRes) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = objectMapper.readValue(userInfoRes.getBody(), new TypeReference<Map<String, Object>>() {});
        KakaoUser kakaoUser = new KakaoUser((Long)jsonMap.get("id"),
                (String)(((Map<String, Object>)(jsonMap.get("properties"))).get("nickname")));
        return kakaoUser;
    }
}
