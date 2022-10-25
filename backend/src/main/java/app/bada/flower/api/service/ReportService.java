package app.bada.flower.api.service;

import app.bada.flower.api.dto.message.MessageReqDto;
import app.bada.flower.api.entity.Report;

public interface ReportService {
    Report createReport(MessageReqDto.ReportReq reportReq);

}
