package neu.edu.info6250.service;

import static org.hamcrest.CoreMatchers.nullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.funding.FundingModel;
import neu.edu.info6250.controller.report.ReportModel;
import neu.edu.info6250.dao.BidDao;
import neu.edu.info6250.dao.ReportDao;
import neu.edu.info6250.entity.Report;

@Service
public class ReportService {

	@Autowired
	private BidDao bidDao;
	@Autowired
	private ReportDao reportDao;

	@Transactional
	public Integer createReport(Integer bidId, ReportModel reportModel) {
		// TODO Auto-generated method stub
		Integer maxProgress = 0;
		for (Report report : reportDao.findAll()) {
			if (report.getBid().getBidId().equals(bidId) && report.getProgress() > maxProgress) {
				maxProgress = report.getProgress();
			}
		}
		Integer reportId = null;
		if (reportModel.getProgress()<=100) {
			if (maxProgress < reportModel.getProgress()) {

				Report report = new Report();
				report.setBid(bidDao.findOne(bidId));
				report.setRepoDesc(reportModel.getRepoDesc());
				report.setCreatedOn(new Date());
				report.setProgress(reportModel.getProgress());
				report = reportDao.save(report);
				reportId = report.getRepoId();
			} else {
				System.out.println("Progress must bigger than the bigest");
			}
		}else {
			System.out.println("Progress cannot more than 100%");
		}
		
		return reportId;
	}

	@Transactional
	public List<ReportModel> getReportByBidId(Integer bidId) {
		// TODO Auto-generated method stub
		return reportDao.findAll().stream().filter(map -> map.getBid().getBidId().equals(bidId)).map(map -> {

			ReportModel reportModel = new ReportModel(map.getRepoId(), map.getBid().getBidId(), map.getRepoDesc(),
					map.getCreatedOn(), map.getProgress());
			return reportModel;
		}).sorted(Comparator.comparing(ReportModel::getProgress).reversed()).collect(Collectors.toList());
		

	}

}
