package app.bada.flower.api.service;

import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.entity.Report;
import app.bada.flower.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;


    @Override
    public Report createReport(MessageReqDto.ReportReq reportReq) {

        Report report = Report.builder()
                .user(userRepository.getReferenceById(reportReq.getUserId()))
                .message(messageRepository.getReferenceById(reportReq.getMessageId()))
                .content(reportReq.getContent() )
                .build();

        return reportRepository.save(report);
    }
}