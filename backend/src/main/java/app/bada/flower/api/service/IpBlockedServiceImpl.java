package app.bada.flower.api.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class IpBlockedServiceImpl implements IpBlockedService{

    private final int MAX_ATTEMPT = 30;
    private LoadingCache<String, Integer> blocksCache;

    public IpBlockedServiceImpl(){
        blocksCache = CacheBuilder.newBuilder().
                expireAfterWrite(20, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }

    @Override
    public boolean isBlocked(String key, Integer count){
        try{
            if(count>=MAX_ATTEMPT){
                blocksCache.put(key,count);
            }
            if(blocksCache.get(key)>=MAX_ATTEMPT) return true;
            else return false;
        }catch (ExecutionException e){
            return  false;
        }
    }
}
