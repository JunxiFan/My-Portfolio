package neu.edu.info6250.controller.idea;

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

import neu.edu.info6250.service.IdeaService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/idea")
public class IdeaController {

	@Autowired
	private IdeaService ideaService;

	@RequestMapping(path = "/{userId}", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Creator')")
	public ResponseEntity<?> createIdea(@PathVariable("userId") Integer userId,
			@RequestBody @Valid IdeaCreation ideaCreation) {
		ResponseEntity<?> response = new ResponseEntity<>("Category Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		Integer ideaId = ideaService.createIdea(userId,ideaCreation);
		if (ideaId != null) {
			response = new ResponseEntity<>("IdeaId:" + ideaId, HttpStatus.OK);
		}
		return response;
	}

	@RequestMapping(path = "/{cateId}", method = RequestMethod.GET)
	public List<IdeaModel> getNewIdeasByCateId(@PathVariable("cateId") Integer cateId) {
		return ideaService.getNewIdeasByCateId(cateId);
	}
	
	//获取三天之内就要过期的未done的idea
	@RequestMapping(path = "/dying/{userId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Creator')")
	public List<IdeaModel> getDyingIdea(@PathVariable("userId") Integer userId) {
		return ideaService.getDyingIdea(userId);
	}
	
	//admin disabled idea
	@RequestMapping(path = "/{ideaId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> disableIdeaByIdeaId(@PathVariable("ideaId") Integer ideaId) {
		ResponseEntity<?> response = new ResponseEntity<>("Category Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		String ideaStatus = ideaService.disableIdeaByIdeaId(ideaId);
		if (ideaStatus != null) {
			response = new ResponseEntity<>("IdeaStatus:" + ideaStatus, HttpStatus.OK);
		}
		return response;
	}
	
	//获取所有idea根据cateId
	@RequestMapping(path = "admin/{cateId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public List<IdeaModel> getIdeaList(@PathVariable("cateId") Integer cateId) {
		return ideaService.getIdeaList(cateId);
	}
	
	//creator根据userId获取Idea
	@RequestMapping(path = "creator/{userId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Creator')")
	public List<IdeaModel> getNewIdeaByUserId(@PathVariable("userId") Integer userId) {
		return ideaService.getNewIdeaByUserId(userId);
	}

}
