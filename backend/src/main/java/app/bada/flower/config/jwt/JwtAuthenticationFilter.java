package app.bada.flower.config.jwt;

import app.bada.flower.api.dto.auth.JwtCode;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "X-AUTH-TOKEN";
    public static final String REFRESH_HEADER = "REFRESH-TOKEN";
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            String token = jwtTokenUtil.resolveToken(request, AUTHORIZATION_HEADER);
            if(token != null && !jwtTokenUtil.isLogout(token) && jwtTokenUtil.validateToken(token) == JwtCode.ACCESS){
                Authentication authentication = jwtTokenUtil.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            else if(token != null && !jwtTokenUtil.isLogout(token) && jwtTokenUtil.validateToken(token) == JwtCode.EXPIRED){
                String refreshToken = jwtTokenUtil.resolveToken(request, REFRESH_HEADER);
                if(refreshToken != null && jwtTokenUtil.validateToken(refreshToken) == JwtCode.ACCESS){
                    String newRefresh = jwtTokenUtil.reissueRefreshToken(refreshToken);
                    if(newRefresh != null){
                        Authentication authentication = jwtTokenUtil.getAuthentication(token);
                        response.setHeader(REFRESH_HEADER, "Bearer " + newRefresh);
                        response.setHeader(AUTHORIZATION_HEADER, "Bearer " + jwtTokenUtil.createAccessToken(token));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
            else{
                response.sendError(402);
            }
//            if (token != null && (!jwtTokenUtil.isLogout(token)) && jwtTokenUtil.validateToken(token)) {
//                // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옴
//                Authentication authentication = jwtTokenUtil.getAuthentication(token);
//                // SecurityContext 에 Authentication 객체를 저장
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
        } catch(Exception e){
            logger.error("JwtAuthenticationFilter exception occured: {}", e);
        }
        chain.doFilter(request, response);
    }
}
