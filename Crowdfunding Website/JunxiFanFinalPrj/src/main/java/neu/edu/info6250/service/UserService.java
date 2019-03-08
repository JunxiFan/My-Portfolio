package neu.edu.info6250.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.user.StartupModel;
import neu.edu.info6250.controller.user.UserModel;
import neu.edu.info6250.controller.user.UserRegister;
import neu.edu.info6250.dao.BidDao;
import neu.edu.info6250.dao.CategoryDao;
import neu.edu.info6250.dao.CcDao;
import neu.edu.info6250.dao.IdeaDao;
import neu.edu.info6250.dao.OrderDao;
import neu.edu.info6250.dao.RoleDao;
import neu.edu.info6250.dao.StartupDao;
import neu.edu.info6250.dao.UserDao;
import neu.edu.info6250.entity.Bid;
import neu.edu.info6250.entity.Cc;
import neu.edu.info6250.entity.Idea;
import neu.edu.info6250.entity.Orderhistory;
import neu.edu.info6250.entity.Startup;
import neu.edu.info6250.entity.User;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private RoleDao RoleDao;

	@Autowired
	private StartupDao startupDao;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private CcDao ccDao;

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private IdeaDao ideaDao;

	@Autowired
	private BidDao bidDao;

	private String getHashedPassword(String password) {
		ShaPasswordEncoder encoder = new ShaPasswordEncoder(256);
		String hashed = encoder.encodePassword(password, null);
		return hashed;
	}

	@Transactional
	public Integer registerNotAsSu(UserRegister userRegister) {
		Integer toBeRegisteredUserId = null;
		if (userRegister.getRoleId().equals(3)) {
			System.out.println("Not correct startup create method");
		} else {
			if (userDao.findByUsername(userRegister.getUsername()) == null) {

				User user = new User();
				user.setUserStatus("active");
				user.setRole(RoleDao.findOne(userRegister.getRoleId()));
				user.setUsername(userRegister.getUsername());
				user.setPassword(getHashedPassword(userRegister.getPassword()));
				user.setName(userRegister.getName());
				user.setCreatedOn(new Date());
				user = userDao.save(user);
				toBeRegisteredUserId = user.getUserId();
			} else {
				System.out.println("Username already exists");
			}
		}

		return toBeRegisteredUserId;
	}

	@Transactional
	public Integer registerAsSu(UserRegister userRegister) {
		// TODO Auto-generated method stub
		Integer toBeRegisteredSuId = null;
		if (userDao.findByUsername(userRegister.getUsername()) == null) {
			User user = new User();
			user.setUserStatus("active");
			user.setRole(RoleDao.findOne(3));
			user.setUsername(userRegister.getUsername());
			user.setPassword(getHashedPassword(userRegister.getPassword()));
			user.setName(userRegister.getName());
			user.setCreatedOn(new Date());
			user = userDao.save(user);

			Startup startup = new Startup();
			startup.setSuName(userRegister.getName());
			startup.setCompName(userRegister.getCompName());
			startup.setUser(user);
			startup.setCategory(categoryDao.findOne(userRegister.getCateId()));
			startup = startupDao.save(startup);
			toBeRegisteredSuId = startup.getSuId();

		} else {
			System.out.println("Username already exists");
		}

		return toBeRegisteredSuId;
	}

	@Transactional
	public Object registerAsAdmin(UserRegister userRegister) {
		Integer toBeRegisteredUserId = null;

		if (userDao.findByUsername(userRegister.getUsername()) == null) {

			User user = new User();
			user.setUserStatus("active");
			user.setRole(RoleDao.findOne(1));
			user.setUsername(userRegister.getUsername());
			user.setPassword(getHashedPassword(userRegister.getPassword()));
			user.setName(userRegister.getName());
			user.setCreatedOn(new Date());
			user = userDao.save(user);
			toBeRegisteredUserId = user.getUserId();
		} else {
			System.out.println("Username already exists");
		}

		return toBeRegisteredUserId;
	}

	@Transactional
	public List<UserModel> searchCreatorByName(String name) {
		// TODO Auto-generated method stub
		return userDao.findAll().stream().filter(map -> map.getName().equals(name))
				.filter(map -> map.getRole().getRoleId().equals(2)).map(map -> {
					UserModel userModel = new UserModel(map.getUserId(), map.getRole().getRoleId(), map.getUsername(),
							map.getName(), map.getCreatedOn(), map.getUserStatus());
					return userModel;
				}).collect(Collectors.toList());
	}

	@Transactional
	public boolean deleteCreator(Integer userId) {
		// TODO Auto-generated method stub
		User toBeDeleted = userDao.findOne(userId);
		if (toBeDeleted.getRole().getRoleId().equals(2)) {
			if (toBeDeleted.getIdeas().size() > 0) {
				System.out.println("This creator has ideas");
				return false;
			} else {
				// 删除该creator所有cc信息
				if (toBeDeleted.getCcs().size() > 0) {
					for (Cc cc : ccDao.findByUserUserId(userId)) {
						ccDao.delete(cc.getCcId());
					}
				}
				// 删除该creator所有orderHistory
				if (toBeDeleted.getOrderhistories().size() > 0) {
					for (Orderhistory oh : orderDao.findByUserUserId(userId)) {
						orderDao.delete(oh.getOrderId());
					}
				}
				userDao.delete(userId);
				return true;
			}
		} else {
			System.out.println("it's not a creator.");
			return false;
		}

	}

	@Transactional
	public String disableCreatorByUserId(Integer userId) {
		// TODO Auto-generated method stub
		User user = userDao.findOne(userId);
		String creatorStatusString = null;
		if (user.getRole().getRoleId().equals(2)) {
			for (Idea idea : user.getIdeas()) {
				idea.setIdeaStatus("disabled");
				ideaDao.save(idea);
			}
			user.setUserStatus("disabled");
			// user.setRemark(remark);
			user = userDao.save(user);

			creatorStatusString = user.getUserStatus();
		} else {
			System.out.println("it's not a creator.");
		}

		return creatorStatusString;
	}

	@Transactional
	public String enabledCreatorByUserId(Integer userId) {
		User user = userDao.findOne(userId);
		String creatorStatusString = null;
		if (user.getRole().getRoleId().equals(2)) {
			for (Idea idea : user.getIdeas()) {
				idea.setIdeaStatus("new");
				ideaDao.save(idea);
			}
			user.setUserStatus("active");
			user = userDao.save(user);
			creatorStatusString = user.getUserStatus();
		} else {
			System.out.println("it's not a creator.");
		}
		return creatorStatusString;
	}

	@Transactional
	public boolean deleteStarup(Integer userId) {
		// TODO Auto-generated method stub
		User user = userDao.findOne(userId);
		Startup startupToBeDel = startupDao.findByUserUserId(userId);
		if (user.getRole().getRoleId().equals(3)) {
			if (startupToBeDel.getBids().size() > 0) {
				System.out.println("This startup has bids");
				return false;
			} else {
				startupDao.delete(startupToBeDel.getSuId());
				userDao.delete(userId);
				return true;
			}
		} else {
			System.out.println("it's not a startup.");
			return false;
		}
	}

	@Transactional
	public String disableSuByUserId(Integer userId) {
		User user = userDao.findOne(userId);
		Startup su = startupDao.findByUserUserId(userId);
		String suStatus = null;
		if (user.getRole().getRoleId().equals(3)) {
			for (Bid bid : su.getBids()) {
				bid.setBidStatus("disabled");
				bidDao.save(bid);
			}
			user.setUserStatus("disabled");
			// user.setRemark(remark);
			user = userDao.save(user);
			suStatus = user.getUserStatus();
		} else {
			System.out.println("it's not a startup.");
		}
		return suStatus;
	}

	@Transactional
	public String enabledSuByUserId(Integer userId) {
		User user = userDao.findOne(userId);
		Startup su = startupDao.findByUserUserId(userId);
		String suStatus = null;
		if (user.getRole().getRoleId().equals(3)) {
			for (Bid bid : su.getBids()) {
				bid.setBidStatus("new");
				bidDao.save(bid);
			}
			user.setUserStatus("active");
			user = userDao.save(user);
			suStatus = user.getUserStatus();
		} else {
			System.out.println("it's not a startup.");
		}
		return suStatus;
	}

	@Transactional
	public List<UserModel> getCreatorList() {
		// TODO Auto-generated method stub
		return userDao.findAll().stream()
				.filter(map -> !map.getUserStatus().equals("disabled") && map.getRole().getRoleId().equals(2))
				.map(map -> {
					UserModel userModel = new UserModel(map.getUserId(), map.getRole().getRoleId(), map.getUsername(),
							map.getName(), map.getCreatedOn());
					return userModel;
				}).collect(Collectors.toList());
	}

	@Transactional
	public List<StartupModel> getSuList() {
		// TODO Auto-generated method stub
		return userDao.findAll().stream()
				.filter(map -> !map.getUserStatus().equals("disabled") && map.getRole().getRoleId().equals(3))
				.map(map -> {
					Startup su = startupDao.findByUserUserId(map.getUserId());
					StartupModel suModel = new StartupModel(su.getSuId(), su.getCompName(), map.getUserId(),
							map.getRole().getRoleId(), map.getUsername(), map.getName(), map.getCreatedOn(),
							su.getCategory().getCateId());
					return suModel;
				}).collect(Collectors.toList());
	}

	@Transactional
	public List<UserModel> getInactiveCreator() {
		// TODO Auto-generated method stub
		Date today = new Date();
		Date warnTime = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000);

		List<User> creatorList = userDao.findAll().stream()
				.filter(map -> !map.getUserStatus().equals("disabled") && map.getRole().getRoleId().equals(2))
				.collect(Collectors.toList());
		List<User> activeCreators = new ArrayList<User>();
		List<UserModel> inactiveCreatorsList = new ArrayList<UserModel>();

		for (User user : creatorList) {
			Set<Idea> ideas = user.getIdeas();
			for (Idea idea : ideas) {
				if (idea.getCreatedOn().after(warnTime)) {
					activeCreators.add(user);
					break;
				}
			}
		}
		// remove all activeCreators
		Collection<User> remain = new ArrayList<User>(creatorList);
		remain.removeAll(activeCreators);

		for (User user : remain) {
			UserModel userModel = new UserModel(user.getUserId(), user.getRole().getRoleId(), user.getUsername(),
					user.getName(), user.getCreatedOn(), user.getUserStatus());
			inactiveCreatorsList.add(userModel);
		}

		return inactiveCreatorsList;

	}

	@Transactional
	public List<UserModel> getUserList() {
		// TODO Auto-generated method stub
		return userDao.findAll().stream().map(map -> {
			UserModel userModel = new UserModel(map.getUserId(), map.getRole().getRoleId(), map.getUsername(),
					map.getName(), map.getCreatedOn(), map.getUserStatus());
			return userModel;

		}).collect(Collectors.toList());

	}

	@Transactional
	public List<UserModel> searchSuByCompName(String name) {
		// TODO Auto-generated method stub
		return startupDao.findByCompName(name).stream().map(map -> {
			User user = map.getUser();
			UserModel userModel = new UserModel(user.getUserId(), user.getRole().getRoleId(), user.getUsername(),
					user.getName(), user.getCreatedOn(), user.getUserStatus());
			return userModel;
		}).collect(Collectors.toList());
	}

	@Transactional
	public Integer getUserIdByUsername(String username) {
		// TODO Auto-generated method stub
		Integer userId = null;
		User user = userDao.findByUsername(username);
		if (user != null) {
			userId = user.getUserId();
		}

		return userId;
	}

	@Transactional
	public Integer getCateIdByUserId(Integer userId) {
		// TODO Auto-generated method stub
		Integer cateId = null;
		User user = userDao.findOne(userId);
		if (user.getRole().getRoleId().equals(3)) {
			Startup startup = startupDao.findByUserUserId(userId);
			cateId = startup.getCategory().getCateId();
		} else {
			System.out.println("it's not a startup.");
		}

		return cateId;
	}

	@Transactional
	public Integer getSuIdByUserId(Integer userId) {
		// TODO Auto-generated method stub
		Integer suId = null;
		Startup startup = startupDao.findByUserUserId(userId);
		suId = startup.getSuId();
		return suId;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = userDao.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException(String.format("The username %s doesn't exist", username));
		}

		System.out.println(" User Role -->" + user.getRole().getRoleName());
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(user.getRole().getRoleName()));

		UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getUsername(),
				user.getPassword(), authorities);

		return userDetails;
	}

	@Transactional
	public List<UserModel> getDishonestStartup() {
		// TODO Auto-generated method stub
		Date today = new Date();

		return bidDao.findAll().stream().filter(
				map -> map.getDeliverydate().before(today) && map.getService().getIdea().getIdeaStatus().equals("new"))
				.map(map -> {
					// map.getStartup().getSuId()
					Startup startup = startupDao.findOne(map.getStartup().getSuId());
					User user = userDao.findOne(startup.getUser().getUserId());
					UserModel userModel = new UserModel(user.getUserId(), user.getRole().getRoleId(),
							user.getUsername(), user.getName(), user.getCreatedOn(), user.getUserStatus());

					return userModel;
				}).collect(Collectors.toList());

	}

}
