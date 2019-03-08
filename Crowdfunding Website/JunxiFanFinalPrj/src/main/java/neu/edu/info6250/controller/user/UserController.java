package neu.edu.info6250.controller.user;

import java.util.List;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

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

import neu.edu.info6250.controller.idea.IdeaModel;
import neu.edu.info6250.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(path = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> registerNotAsSu(@Valid @RequestBody UserRegister userRegister) {
		ResponseEntity<?> responseEntity = new ResponseEntity<>("User Creation Failed",
				HttpStatus.UNPROCESSABLE_ENTITY);
		if (userService.registerNotAsSu(userRegister) != null) {
			responseEntity = new ResponseEntity<>("User Registered", HttpStatus.OK);
		}

		return responseEntity;
	}

	@RequestMapping(path = "/register/startup", method = RequestMethod.POST)
	public ResponseEntity<?> registerAsSu(@Valid @RequestBody UserRegister userRegister) {
		ResponseEntity<?> responseEntity = new ResponseEntity<>("Startup Creation Failed",
				HttpStatus.UNPROCESSABLE_ENTITY);
		if (userService.registerAsSu(userRegister) != null) {
			responseEntity = new ResponseEntity<>("Startup Registered", HttpStatus.OK);
		}

		return responseEntity;
	}
	
	@RequestMapping(path = "/register/admin", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> registerAsAdmin(@Valid @RequestBody UserRegister userRegister) {
		ResponseEntity<?> responseEntity = new ResponseEntity<>("Startup Creation Failed",
				HttpStatus.UNPROCESSABLE_ENTITY);
		if (userService.registerAsAdmin(userRegister) != null) {
			responseEntity = new ResponseEntity<>("Startup Registered", HttpStatus.OK);
		}

		return responseEntity;
	}

	// name -》creator list
	@RequestMapping(path = "/{name}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public List<UserModel> searchCreatorByName(@PathVariable("name") String name) {

		return userService.searchCreatorByName(name);
	}

	// compName -> startup list
	@RequestMapping(path = "/su/{compName}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public List<UserModel> searchSuByCompName(@PathVariable("compName") String name) {

		return userService.searchSuByCompName(name);
	}

	@RequestMapping(method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public List<UserModel> getUserList() {

		return userService.getUserList();
	}

	// 删除creator,无idea才可删除.先删除cc\order信息
	@RequestMapping(path = "/creator/{userId}", method = RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> deleteCreator(@PathVariable("userId") Integer userId) {
		ResponseEntity<?> responseEntity = new ResponseEntity<>("Creator deletion Failed",
				HttpStatus.UNPROCESSABLE_ENTITY);
		if (userService.deleteCreator(userId)) {
			responseEntity = new ResponseEntity<>("creator deleted", HttpStatus.OK);
		}

		return responseEntity;
	}

	// admin disabled creator,连同idea一起
	@RequestMapping(path = "/creatorDis/{userId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> disableCreatorByUserId(@PathVariable("userId") Integer userId) {
		ResponseEntity<?> response = new ResponseEntity<>("Disable failed", HttpStatus.UNPROCESSABLE_ENTITY);
		String creatorStatus = userService.disableCreatorByUserId(userId);
		if (creatorStatus != null) {
			response = new ResponseEntity<>("creator status:" + creatorStatus, HttpStatus.OK);
		}
		return response;
	}

	// admin enable creator,连同idea
	@RequestMapping(path = "/creatorEnb/{userId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> enabledCreatorByUserId(@PathVariable("userId") Integer userId) {
		ResponseEntity<?> response = new ResponseEntity<>("Disable failed", HttpStatus.UNPROCESSABLE_ENTITY);
		String creatorStatus = userService.enabledCreatorByUserId(userId);
		if (creatorStatus != null) {
			response = new ResponseEntity<>("creator status:" + creatorStatus, HttpStatus.OK);
		}
		return response;
	}

	// 删除startup,无bid才可删除。先删除su表中的信息
	@RequestMapping(path = "/startup/{userId}", method = RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> deleteStartup(@PathVariable("userId") Integer userId) {
		ResponseEntity<?> responseEntity = new ResponseEntity<>("Startup deletion Failed",
				HttpStatus.UNPROCESSABLE_ENTITY);
		if (userService.deleteStarup(userId)) {
			responseEntity = new ResponseEntity<>("startup deleted", HttpStatus.OK);
		}
		return responseEntity;
	}

	// admin disabled startup,连同bid一起
	@RequestMapping(path = "/suDis/{userId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> disableSuByUserId(@PathVariable("userId") Integer userId) {
		ResponseEntity<?> response = new ResponseEntity<>("Disable failed", HttpStatus.UNPROCESSABLE_ENTITY);
		String suStatus = userService.disableSuByUserId(userId);
		if (suStatus != null) {
			response = new ResponseEntity<>("startup status:" + suStatus, HttpStatus.OK);
		}
		return response;
	}

	// admin enable startup,连同bid
	@RequestMapping(path = "/suEnb/{userId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> enabledSuByUserId(@PathVariable("userId") Integer userId) {
		ResponseEntity<?> response = new ResponseEntity<>("Disable failed", HttpStatus.UNPROCESSABLE_ENTITY);
		String suStatus = userService.enabledSuByUserId(userId);
		if (suStatus != null) {
			response = new ResponseEntity<>("startup status:" + suStatus, HttpStatus.OK);
		}
		return response;
	}

	// view creator,看不见disabled
	@RequestMapping(path = "/creator", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public List<UserModel> getCreatorList() {
		return userService.getCreatorList();
	}

	// view startup,看不见disabled
	@RequestMapping(path = "/startup", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public List<StartupModel> getSuList() {
		return userService.getSuList();
	}

	// 查看所有最近10天内没有提交idea的creator
	@RequestMapping(path = "/inactive/creator", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public List<UserModel> getInactiveCreator() {
		return userService.getInactiveCreator();
	}

	// 根据username获得userID
	@RequestMapping(path = "/username/{username}", method = RequestMethod.GET)
	public Integer getUserIdByUsername(@PathVariable("username") String username) {
		return userService.getUserIdByUsername(username);
	}

	// startup根据userId获得cateId
	@RequestMapping(path = "/su/cateid/{userId}", method = RequestMethod.GET)
	public Integer getCateIdByUserId(@PathVariable("userId") Integer userId) {
		return userService.getCateIdByUserId(userId);
	}

	// startup根据userid获得suId
	@RequestMapping(path = "/su/suid/{userId}", method = RequestMethod.GET)
	public Integer getSuIdByUserId(@PathVariable("userId") Integer userId) {
		return userService.getSuIdByUserId(userId);
	}

	// 查看超出bid deliveryDate,且idea状态不是done的startup
	@RequestMapping(path = "/dishonest/startup", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Admin')")
	public List<UserModel> getDishonestStartup() {
		return userService.getDishonestStartup();
	}

}
