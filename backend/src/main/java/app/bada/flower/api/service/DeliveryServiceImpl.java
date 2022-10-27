package app.bada.flower.api.service;

import app.bada.flower.api.converter.DeliveryConverter;
import app.bada.flower.api.dto.mypage.DeliveryResDto;
import app.bada.flower.api.entity.Delivery;
import app.bada.flower.api.entity.User;
import app.bada.flower.api.repository.DeliveryRepository;
import app.bada.flower.api.repository.UserRepository;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
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
        User user = userRepository.findById(userId).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        List<DeliveryResDto> deliveryList = new ArrayList<>();

        Slice<Delivery> findAllMyDeliveryList = null;
        if(sortNumber==1){
            findAllMyDeliveryList = deliveryRepository.findAllByUserAndIsDeletedFalseOrderByCreatedDateDesc(user,pageable).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        }else if(sortNumber==2) {
            findAllMyDeliveryList = deliveryRepository.findAllByUserAndIsDeletedFalseOrderByCreatedDate(user, pageable).orElseThrow(()->new CustomException(ErrorCode.POSTS_NOT_FOUND));
        }
        for(Delivery delivery : findAllMyDeliveryList){
            deliveryList.add(deliveryConverter.EntityToDto(delivery));
        }
        return deliveryList;
    }
}
