package app.bada.flower.config;

import app.bada.flower.api.controller.exception.HttpInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(httpInterceptor())
                .addPathPatterns("/**");
    }
    @Bean
    public HttpInterceptor httpInterceptor(){
        return new HttpInterceptor();
    }

}
