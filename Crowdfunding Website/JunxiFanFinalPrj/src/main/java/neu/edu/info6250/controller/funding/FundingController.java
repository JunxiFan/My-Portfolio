package neu.edu.info6250.controller.funding;

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

import neu.edu.info6250.service.FundingService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/funding")
public class FundingController {

	@Autowired
	private FundingService fundingService;
	
	@RequestMapping(path="/{ideaId}", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Creator')")
	public ResponseEntity<?> createFunding(@PathVariable("ideaId")Integer ideaId,@RequestBody @Valid FundingModel fundingModel) {
		ResponseEntity<?> response = new ResponseEntity<>("Funding Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		Integer fundId = fundingService.createFunding(fundingModel,ideaId);
		if (fundId != null) {
			response = new ResponseEntity<>("fundId:" + fundId, HttpStatus.OK);
		}
		return response;
	}
	
	@RequestMapping(path="/{ideaId}", method=RequestMethod.GET)
	public List<FundingModel> getFundingsByIdeaId(@PathVariable("ideaId") Integer ideaId) {
		return fundingService.getFundingsByIdeaId(ideaId);
	}
	
	//单个idea的总收款
	@RequestMapping(path="/total/{ideaId}", method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('Creator')")
	public Integer getIdeaTotalAmount(@PathVariable("ideaId") Integer ideaId) {
		return fundingService.getIdeaTotalAmount(ideaId);
	}
	
	//所有收款
	@PreAuthorize("hasAuthority('Admin')")
	@RequestMapping(path="/website/total", method=RequestMethod.GET)
	public Integer getWebSiteTotalAmount() {
		return fundingService.getWebSiteTotalAmount();
	}
	
	//根据cateID查各个category的收款
	@RequestMapping(path="/category/total/{cateId}", method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public Integer getCategoryTotalAmount(@PathVariable("cateId") Integer cateId) {
		return fundingService.getCategoryTotalAmount(cateId);
	}
	
	
	
}
