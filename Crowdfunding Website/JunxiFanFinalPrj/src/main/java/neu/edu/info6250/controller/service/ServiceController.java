package neu.edu.info6250.controller.service;

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

import neu.edu.info6250.service.ServiceService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/service")
public class ServiceController {

	@Autowired
	private ServiceService serviceService;
	
	//creator为idea新建service, idea和category的status不能为disabled,且该service ddl在idea的起止时间内
	@RequestMapping(path="/{ideaId}", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Creator')")
	public ResponseEntity<?> createFunding(@PathVariable("ideaId")Integer ideaId,@RequestBody @Valid ServiceModel serviceModel) {
		ResponseEntity<?> response = new ResponseEntity<>("service Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		Integer fundId = serviceService.createService(serviceModel,ideaId);
		if (fundId != null) {
			response = new ResponseEntity<>("fundId:" + fundId, HttpStatus.OK);
		}
		return response;
	}
	
	//根据ideaId查new service
	@RequestMapping(path = "/{ideaId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Startup') or hasAuthority('Creator') or hasAuthority('Admin')" )
	public List<ServiceModel> getServiceByIdeaId(@PathVariable("ideaId") Integer ideaId) {

		return serviceService.getServiceByIdeaId(ideaId);
	}
	
	//根据获取所有service
	@RequestMapping(path = "/admin/{ideaId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Startup') or hasAuthority('Creator') or hasAuthority('Admin')" )
	public List<ServiceModel> getEveryServiceByIdeaId(@PathVariable("ideaId") Integer ideaId) {

		return serviceService.getEveryServiceByIdeaId(ideaId);
	}
	
}
