package app.bada.flower.api.interceptor;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import app.bada.flower.api.service.IpBanService;
import app.bada.flower.api.service.IpBanServiceImpl;
import app.bada.flower.api.service.jwt.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.WebUtils;

@Slf4j
@Component
public class IPCheckInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(IPCheckInterceptor.class);

    private static final String HEADER_AUTH = "X-AUTH-TOKEN";


    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {

    }

    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {

    }

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object arg2) throws Exception {
        logger.info("client ip " + req.getRemoteAddr()); //접속한 사용자의 IP
        String clientIpAddress  = req.getRemoteAddr();


        return true;
    }

}
