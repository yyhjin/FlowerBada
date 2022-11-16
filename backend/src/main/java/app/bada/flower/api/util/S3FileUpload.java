package app.bada.flower.api.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3FileUpload {

    @Value("${cloud.aws.s3.baseUrl}")
    public String File_Server_Url;
    private final AmazonS3Client amazonS3Client;
    // 버킷 이름 동적 할당
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public List<String> upload(List<MultipartFile> multipartFileList, String dirName) throws IOException {
        List<String> urlList = new ArrayList<>();
        for(MultipartFile multipartFile : multipartFileList){
            urlList.add(upload(multipartFile, dirName));
        }
        return urlList;
    }

    public String upload(MultipartFile multipartFile, String dirName)throws IOException {
        File uploadFile = convert(multipartFile).orElseThrow(()-> new
                IllegalArgumentException("error: MultipartFile -> File convert fail") );
        return upload(uploadFile,dirName);
    }
    //S3로 파일 업로드 하기
    public String upload(File uploadFile, String dirName){
        String fileName = dirName + "/" + UUID.randomUUID()+uploadFile.getName();
        putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return fileName;
    }
    public String upload2(File uploadFile, String dirName){
        String fileName = dirName + "/" + uploadFile.getName();
        putS3(uploadFile, fileName);
        removeNewFile(uploadFile);

//        String fileUrl = File_Server_Url + fileName;
        return fileName;
    }
    //S3로 업로드
    private String putS3(File uploadFile, String fileName){
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }
    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile){
        if(targetFile.delete()){
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }
    // 로컬에 파일 업로드
    private Optional<File> convert(MultipartFile file) throws  IOException{
        File convertFile = new File(System.getProperty("user.dir")+"/"+file.getOriginalFilename());
        if(convertFile.createNewFile()){
            try(FileOutputStream fos = new FileOutputStream(convertFile)){
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    // 파일 삭제(수정 시에도 삭제 후 upload하면 됨, AWS S3는 insert, delete 밖에 안됨)
    public void deleteFile(String fileName){
        DeleteObjectRequest request = new DeleteObjectRequest(this.bucket,fileName);
        System.out.println("Deleted : "+fileName);
        amazonS3Client.deleteObject(request);
    }

    // 폴더 삭제 (아직은 사용 보류)
    public void removeFolder(String folderName){
        ListObjectsV2Request listObjectsV2Request = new ListObjectsV2Request().withBucketName(bucket)
                .withPrefix(folderName+"/");
        ListObjectsV2Result listObjectsV2Result = amazonS3Client.listObjectsV2(listObjectsV2Request);
        ListIterator<S3ObjectSummary> listIterator = listObjectsV2Result.getObjectSummaries().listIterator();

        while (listIterator.hasNext()){
            S3ObjectSummary objectSummary = listIterator.next();
            DeleteObjectRequest request = new DeleteObjectRequest(bucket, objectSummary.getKey());
            amazonS3Client.deleteObject(request);
            System.out.println("Deleted : "+objectSummary.getKey());
        }
    }
}
