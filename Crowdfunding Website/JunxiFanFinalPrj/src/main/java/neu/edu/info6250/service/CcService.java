package neu.edu.info6250.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.cc.CcModel;
import neu.edu.info6250.controller.order.OrderModel;
import neu.edu.info6250.dao.CcDao;
import neu.edu.info6250.dao.UserDao;
import neu.edu.info6250.entity.Cc;
import neu.edu.info6250.entity.User;

@Service
public class CcService {

	@Autowired
	private CcDao ccDao;
	
	@Autowired
	private UserDao userDao;

	@Transactional
	public List<CcModel> getCcByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return ccDao.findByUserUserId(userId).stream().map(map -> {
			CcModel ccModel = new CcModel(map.getCcId(), map.getCardNum(), map.getExpirMonth(), map.getExpirYear(),
					map.getCvv(), map.getUser().getUserId());
			return ccModel;
		}).collect(Collectors.toList());
	}
@Transactional
	public Integer createNewCc(Integer userId,CcModel ccModel) {
		// TODO Auto-generated method stub
		User user= userDao.findOne(userId);
		Cc cc = new Cc(user, ccModel.getCardNum(), ccModel.getExpirMonth(), ccModel.getExpirYear(), ccModel.getCvv());
		ccDao.save(cc);
		
		return cc.getCcId();
	}

}
