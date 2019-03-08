package neu.edu.info6250.controller.report;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import neu.edu.info6250.service.ReportService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/report")
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	
	
	@RequestMapping(path="/{bidId}", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Startup')")
	public ResponseEntity<?> createReport(@PathVariable("bidId")Integer bidId,@RequestBody @Valid ReportModel reportModel) {
		ResponseEntity<?> response = new ResponseEntity<>("Report Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		Integer repoId = reportService.createReport(bidId,reportModel);
		if (repoId != null) {
			response = new ResponseEntity<>("repoId:" + repoId, HttpStatus.OK);
		}
		return response;
	}
	
	@RequestMapping(path="/{bidId}", method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('Startup') or hasAuthority('Creator') or hasAuthority('Admin')" )
	public List<ReportModel> getReportByBidId(@PathVariable("bidId") Integer bidId) {
		return reportService.getReportByBidId(bidId);
	}
	
}
