package app.bada.flower.api.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class TimeCheckServiceImpl implements TimeCheckService{

    private LoadingCache<String, Integer> attemptsCache;

    @Autowired
    private HttpServletRequest request;

    public TimeCheckServiceImpl(){
        attemptsCache = CacheBuilder.newBuilder().
                expireAfterWrite(1, TimeUnit.SECONDS).build(new CacheLoader<String, Integer>() {
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }

    @Override
    public Integer IpAccess(String key) {
        int attempts = 0;
        try{
            attempts = attemptsCache.get(key);
        } catch (ExecutionException e){
            attempts = 0;
        }
        attempts++;
        attemptsCache.put(key,attempts);
        try{
            return  attemptsCache.get(key);
        }catch (ExecutionException e) {
            return null;
        }
    }
}
