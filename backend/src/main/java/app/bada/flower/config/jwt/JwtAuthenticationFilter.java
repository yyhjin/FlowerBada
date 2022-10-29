package app.bada.flower.config.jwt;

import app.bada.flower.api.service.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            String token = jwtTokenUtil.resolveToken((HttpServletRequest) request);
            // 유효한 토큰인지 확인
            if (token != null && (!jwtTokenUtil.isLogout(token)) && jwtTokenUtil.validateToken(token)) {
                // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옴
                Authentication authentication = jwtTokenUtil.getAuthentication(token);
                // SecurityContext 에 Authentication 객체를 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch(Exception e){
            logger.error("JwtAuthenticationFilter exception occured: {}", e);
        }
        chain.doFilter(request, response);
    }
}
