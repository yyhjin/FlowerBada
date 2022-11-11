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
public class IpBlockedServiceImpl implements IpBlockedService{

    private final int MAX_ATTEMPT = 30;
    private LoadingCache<String, Integer> attemptsCache;

    @Autowired
    private HttpServletRequest request;

    public IpBlockedServiceImpl(){
        attemptsCache = CacheBuilder.newBuilder().
                expireAfterWrite(1, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }

    @Override
    public void IpAccess(String key){
        int attempts = 0;
        try{
            System.out.println("come?? : " + attemptsCache.get(key));

            attempts = attemptsCache.get(key);
        } catch (ExecutionException e){
            attempts = 0;
        }
        attempts++;
        attemptsCache.put(key,attempts);
    }

    @Override
    public boolean isBlocked(String key){
        try{
            System.out.println("count: "+attemptsCache.get(key));
            return  attemptsCache.get(key) >= MAX_ATTEMPT;
        }catch (ExecutionException e){
            return  false;
        }
    }
}
