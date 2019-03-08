package neu.edu.info6250.service;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.idea.IdeaModel;
import neu.edu.info6250.controller.order.OrderModel;
import neu.edu.info6250.dao.CcDao;
import neu.edu.info6250.dao.FundingDao;
import neu.edu.info6250.dao.OrderDao;
import neu.edu.info6250.dao.UserDao;
import neu.edu.info6250.entity.Cc;
import neu.edu.info6250.entity.Funding;
import neu.edu.info6250.entity.Orderhistory;
import neu.edu.info6250.entity.User;

@Service
public class OrderService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private FundingDao fundingDao;

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private CcDao ccDao;

	@Transactional
	public Integer createOrderByFundId(Integer fundId, OrderModel orderModel) {
		// TODO Auto-generated method stub
		Integer orderId = null;
		Funding funding = fundingDao.findOne(fundId);
		Integer buyAmount = orderModel.getBuyAmount();
		Integer remainAmount = funding.getFundAmount();
		if (buyAmount < remainAmount) {
			User user = userDao.findOne(orderModel.getUserId());
			Orderhistory orderhistory = new Orderhistory(funding, user, "prepared", new Date(), funding.getFundValue(),
					orderModel.getBuyAmount());
			orderhistory = orderDao.save(orderhistory);
			funding.setFundAmount(remainAmount - buyAmount);
			fundingDao.save(funding);
			orderId = orderhistory.getOrderId();

		} else {
			System.out.println("Buy Amount cannot bigger than Remaining Amount.");
		}

		return orderId;
	}

	@Transactional
	public List<OrderModel> getOrderByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return orderDao.findByUserUserId(userId).stream().filter(map -> map.getOrderStatus().equals("prepared"))
				.map(map -> {
					OrderModel orderModel = new OrderModel(map.getOrderId(), map.getFunding().getFundId(), userId,
							map.getOrderStatus(), map.getCreateOn(), map.getPayValue(), map.getBuyAmount());
					return orderModel;
				}).collect(Collectors.toList());

	}

	@Transactional
	public boolean clearCartByCcId(Integer ccId) {
		// TODO Auto-generated method stub
		boolean isClear = false;
		Cc cc = ccDao.findOne(ccId);
		Integer userId = cc.getUser().getUserId();

		for (Orderhistory order : orderDao.findByUserUserId(userId)) {
			order.setOrderStatus("paid");
			orderDao.save(order);
			isClear = true;
		}

		return isClear;
	}

}
