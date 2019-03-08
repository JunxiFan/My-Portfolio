package neu.edu.info6250.controller.bid;

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

import neu.edu.info6250.service.BidService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/bid")
public class BidController {

	@Autowired
	private BidService bidService;

	// su 查看service list后选择一个创建bid
	@RequestMapping(path = "/{servId}/{suId}", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Startup')")
	public ResponseEntity<?> createBid(@PathVariable("servId") Integer servId, @PathVariable("suId") Integer suId,
			@RequestBody @Valid BidModel bidModel) {
		ResponseEntity<?> response = new ResponseEntity<>("Bid Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		Integer BidId = bidService.createBid(servId, suId, bidModel);
		if (BidId != null) {
			response = new ResponseEntity<>("Bid:" + BidId, HttpStatus.OK);
		}
		return response;
	}

	// creator method 查看自己提出的该服务的所有bid
	@RequestMapping(path = "/{servId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Startup') or hasAuthority('Creator')")
	public List<BidModel> getBidByServId(@PathVariable("servId") Integer servId) {
		return bidService.getBidByServId(servId);
	}

	// creator choose a bid for the service, servStatus->closed.
	// bidStatus->selected
	@RequestMapping(path = "/{bidId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Creator')")
	public ResponseEntity<?> selectBid(@PathVariable("bidId") Integer bidId) {
		ResponseEntity<?> response = new ResponseEntity<>("Bid Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		boolean success = bidService.selectBid(bidId);
		if (success) {
			response = new ResponseEntity<>("Changed status to selected", HttpStatus.OK);
		}
		return response;
	}

	// su 获得自己中标的bid
	@RequestMapping(path = "/selected/{userId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Startup') or hasAuthority('Creator')")
	public List<BidModel> getSelectedBidByUserId(@PathVariable("userId") Integer userIdString) {
		return bidService.getSelectedBidByUserId(userIdString);
	}

	// su 获得三天后就要上交的bids
	@RequestMapping(path = "/indanger/{suId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Startup')")
	public List<BidModel> getBidIndanger(@PathVariable("suId") Integer suId) {
		return bidService.getBidIndanger(suId);
	}
}
