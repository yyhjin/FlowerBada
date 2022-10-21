package app.bada.flower.api.service;

import app.bada.flower.api.converter.DeliveryConverter;
import app.bada.flower.api.dto.delivery.DeliveryResDto;
import app.bada.flower.api.entity.Delivery;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.DeliveryRepository;
import app.bada.flower.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService{

    private final UserRepository userRepository;
    private final DeliveryRepository deliveryRepository;
    private final DeliveryConverter deliveryConverter;

    public List<DeliveryResDto> selectAllDelivery(int userId, int sortNumber, Pageable pageable){
        if(userRepository.findById(userId).isPresent()){
            List<DeliveryResDto> deliveryList = new ArrayList<>();
            User user = userRepository.findById(userId).get();
            Slice<Delivery> list = null;
            if(sortNumber==1){
                list = deliveryRepository.findAllByUserAndIsDeletedFalseOrderByCreatedDateDesc(user,pageable).get();
            }else if(sortNumber==2) {
                list = deliveryRepository.findAllByUserAndIsDeletedFalseOrderByCreatedDate(user, pageable).get();
            }
            for(Delivery delivery : list){
                deliveryList.add(deliveryConverter.EntityToDto(delivery));
            }
            return deliveryList;
        }else{
            return null;
        }
    }
}
