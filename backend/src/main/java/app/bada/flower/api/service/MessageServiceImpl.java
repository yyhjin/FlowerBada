package app.bada.flower.api.service;

import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.dto.message.MessageResDto;
import app.bada.flower.api.entity.Message;
import app.bada.flower.api.entity.RollingPaper;
import app.bada.flower.api.repository.FlowerItemRepository;
import app.bada.flower.api.repository.MessageRepository;
import app.bada.flower.api.repository.RollingPaperRepository;
import app.bada.flower.api.util.S3FileUpload;
import app.bada.flower.exception.CustomException;
import app.bada.flower.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final FlowerItemRepository flowerItemRepository;
    private final RollingPaperRepository rollingPaperRepository;
    private final S3FileUpload s3FileUpload;

    @Override
    public Message createMessage(MessageReqDto.MessageReq messageReq) {

        Message message = Message.builder()
                .rollingPaper(rollingPaperRepository.findById(messageReq.getRollingId())
                        .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)))
                .flowerItem(flowerItemRepository.findById(messageReq.getFlowerId())
                        .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND)))
                .content(messageReq.getContent())
                .writer(messageReq.getWriter())
                .font(messageReq.getFont())
                .build();

        return messageRepository.save(message);
    }

    @Override
    public Message getMessage(int msgId) {
        return messageRepository.findById(msgId)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
    }

    @Transactional
    @Override
    public Message deleteMessage(int msgId) {
        Message message = messageRepository.findById(msgId)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        message.isDeleteUpdate(true);
        return messageRepository.save(message);
    }

    @Override
    public List<MessageResDto.MessageDto> search(String content) {
        return messageRepository.searchContent(content);
    }

    @Override
    public void updateRollingImage(String url, String imgUrl) throws IOException{
        rollingPaperRepository.findByUrl(url).orElseThrow(() -> new IllegalArgumentException());
        final String dirname = "rollingpaper";
        String filename = url+".png";
        String path = "";
        String os = System.getProperty("os.name").toLowerCase();
        File file = null;
        if(os.contains("win")) {
            path = "C:\\Temp\\upload\\"+dirname;
            file = new File(path);
            path += "\\" + filename;
        }
        else if(os.contains("linux")) {
            path = "/home/ubuntu/upload/"+dirname;
            file = new File(path);
            path += "/" + filename;
        }
        file.mkdir();
        System.out.println("path:"+path);

        String prefix = "data:image/png;base64,";
        byte[] imgByte = Base64.getDecoder().decode(imgUrl.substring(prefix.length()));
        try(FileOutputStream fos = new FileOutputStream(path)){
            fos.write(imgByte);
        }
        file = new File(path);
        s3FileUpload.deleteFile(dirname+"/"+filename);
        s3FileUpload.upload2(file, "rollingpaper");
    }
}