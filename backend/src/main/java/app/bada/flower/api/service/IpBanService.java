package app.bada.flower.api.service;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

public interface IpBanService {
    void banIp(HttpServletRequest request);
    boolean isIpBan(HttpServletRequest request);
    String getIpAddress(HttpServletRequest request);
}
