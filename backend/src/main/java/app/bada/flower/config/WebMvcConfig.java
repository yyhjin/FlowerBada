package app.bada.flower.config;

import app.bada.flower.api.interceptor.IPCheckInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private static final List<String> URL_PATTERNS = Arrays.asList("/async/*", "/board", "/user");  //인터셉터가 동작 해야 될 요청 주소 mapping 목록
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(new IPCheckInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/error");
    }
}
