package app.bada.flower.api.service;
public interface IpBlockedService {
    boolean isBlocked(String key, Integer count);
}
