package neu.edu.info6250.controller.cc;

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

import neu.edu.info6250.controller.order.OrderModel;
import neu.edu.info6250.controller.user.UserRegister;
import neu.edu.info6250.service.CcService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/cc")
public class CcController {
	@Autowired
	private CcService ccService;
	
	//获取funder的所有cc
	@RequestMapping(path = "/{userId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Funder')")
	public List<CcModel> getCcByUserId(@PathVariable("userId") Integer userId) {
		return ccService.getCcByUserId(userId);
	}
	
	@RequestMapping(path = "/{userId}",method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Funder')")
	public ResponseEntity<?> createNewCc(@PathVariable("userId") Integer userId, @Valid @RequestBody CcModel ccModel) {
		ResponseEntity<?> responseEntity = new ResponseEntity<>("CC Creation Failed",
				HttpStatus.UNPROCESSABLE_ENTITY);
		if (ccService.createNewCc(userId,ccModel) != null) {
			responseEntity = new ResponseEntity<>("CC Created", HttpStatus.OK);
		}

		return responseEntity;
	}

}
