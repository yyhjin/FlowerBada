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
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final FlowerItemRepository flowerItemRepository;
    private final RollingPaperRepository rollingPaperRepository;
    private final S3FileUpload s3FileUpload;

    @Transactional
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
    public String uploadRollingImage(String url, String imgUrl, String option) throws IOException{
        String fileUrl = "";
        if (option.equals("update")) {
            RollingPaper rollingPaper = rollingPaperRepository.findByUrl(url)
                    .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

            final String dirname = "rollingpaper";
            String filename = url+".png";

            File file = captureUpload(dirname, filename, imgUrl);
//          s3FileUpload.deleteFile(dirname+"/"+filename);
            fileUrl = s3FileUpload.upload2(file, "rollingpaper");

            // 롤링페이퍼 imgUrl 컬럼 수정
            rollingPaper.imgUrlUpdate(fileUrl);
            rollingPaperRepository.save(rollingPaper);
        }
        else if (option.equals("upload")) {
            final String dirname = "paymentitem";
            SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
            String filename = url+"-"+date.format(new Date())+".png";

            File file = captureUpload(dirname, filename, imgUrl);
//          s3FileUpload.deleteFile(dirname+"/"+filename);
            fileUrl = s3FileUpload.upload2(file, "paymentitem");
        }

        else if (option.equals("printUpload")) {
            final String dirname = "print";
            SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss");
            String filename = url+"-"+date.format(new Date())+".png";

            File file = captureUpload(dirname, filename, imgUrl);
//          s3FileUpload.deleteFile(dirname+"/"+filename);
            fileUrl = s3FileUpload.upload2(file, "print");
        }

        return fileUrl;
    }

    public File captureUpload(String dirname, String filename, String imgUrl) throws IOException {
        String path = "";
        String os = System.getProperty("os.name").toLowerCase();
        File file = null;
        if(os.contains("win")) {
            path = "C:\\Temp\\upload\\"+dirname;
            file = new File(path);
            path += "\\" + filename;
            new File("C:\\Temp\\upload").mkdir();
        }
        else if(os.contains("linux")) {
            path = "/home/ubuntu/upload/"+dirname;
            file = new File(path);
            path += "/" + filename;
        }
        boolean res = file.mkdirs();
        System.out.println("result of mkdirs: "+res);
        System.out.println("path:"+path);

        String prefix = "data:image/png;base64,";
        byte[] imgByte = Base64.getDecoder().decode(imgUrl.substring(prefix.length()));
        try(FileOutputStream fos = new FileOutputStream(path)){
            fos.write(imgByte);
        }

        return new File(path);
    }

    @Override
    public void updateRollingImage(String url, String imgUrl) {
        // 롤링페이퍼 imgUrl 컬럼 수정
        RollingPaper rollingPaper = rollingPaperRepository.findByUrl(url)
                .orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        rollingPaper.imgUrlUpdate(imgUrl);
        rollingPaperRepository.save(rollingPaper);
    }


}