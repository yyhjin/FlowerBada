package app.bada.flower.api.service;

public interface IpBlockedService {
    boolean isBlocked(String key);

    void IpAccess (String key);

}
