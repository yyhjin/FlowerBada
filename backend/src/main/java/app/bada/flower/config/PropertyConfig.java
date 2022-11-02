package app.bada.flower.config;

import app.bada.flower.util.YamlLoadFactory;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
@PropertySource(value="classpath:env.yml", factory = YamlLoadFactory.class)
@ConfigurationProperties(prefix = "kakao")
@Getter
@Setter
public class PropertyConfig {
    private String adminKey;
}