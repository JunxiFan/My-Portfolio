package neu.edu.info6250.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.funding.FundingModel;
import neu.edu.info6250.dao.CategoryDao;
import neu.edu.info6250.dao.FundingDao;
import neu.edu.info6250.dao.IdeaDao;
import neu.edu.info6250.dao.OrderDao;
import neu.edu.info6250.entity.Category;
import neu.edu.info6250.entity.Funding;
import neu.edu.info6250.entity.Idea;
import neu.edu.info6250.entity.Orderhistory;

@Service
public class FundingService {

	@Autowired
	private FundingDao fundingDao;

	@Autowired
	private IdeaDao ideaDao;

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private CategoryDao categoryDao;

	@Transactional
	public Integer createFunding(FundingModel fundingModel, Integer ideaId) {
		Funding funding = new Funding();
		funding.setFundValue(fundingModel.getFundValue());
		funding.setFundDesc(fundingModel.getFundDesc());
		funding.setFundAmount(fundingModel.getFundAmount());
		funding.setIdea(ideaDao.findOne(ideaId));
		funding = fundingDao.save(funding);

		return funding.getFundId();
	}

	@Transactional
	public List<FundingModel> getFundingsByIdeaId(Integer ideaId) {
		// TODO Auto-generated method stub
		return fundingDao.findAll().stream().filter(map -> map.getIdea().getIdeaId().equals(ideaId)).map(map -> {
			FundingModel fundingModel = new FundingModel(map.getFundId(), map.getFundValue(), map.getFundDesc(),
					map.getFundAmount(), map.getIdea().getIdeaId());
			return fundingModel;
		}).collect(Collectors.toList());
	}

	@Transactional
	public Integer getIdeaTotalAmount(Integer ideaId) {
		// TODO Auto-generated method stub
		Integer totalAmount = 0;
		for (Funding funding : fundingDao.findByIdeaIdeaId(ideaId)) {
			for (Orderhistory oh : orderDao.findByFundingFundId(funding.getFundId())) {
				if (oh.getOrderStatus().equals("paid")) {
					totalAmount += oh.getPayValue() * oh.getBuyAmount();
				}

			}
		}
		return totalAmount;
	}

	@Transactional
	public Integer getWebSiteTotalAmount() {
		// TODO Auto-generated method stub
		Integer totalAmount = 0;
		for (Orderhistory oh : orderDao.findAll()) {
			if (oh.getOrderStatus().equals("paid")) {
				totalAmount += oh.getPayValue() * oh.getBuyAmount();
			}
		}
		return totalAmount;
	}

	@Transactional
	public Integer getCategoryTotalAmount(Integer cateId) {
		// TODO Auto-generated method stub\
		Integer totalAmount = 0;
		Category category = categoryDao.findOne(cateId);
		if (category!=null) {
			for (Idea idea : category.getIdeas()) {
				for (Funding funding : idea.getFundings()) {
					for (Orderhistory oh : funding.getOrderhistories()) {
						if (oh.getOrderStatus().equals("paid")) {
							totalAmount += oh.getPayValue() * oh.getBuyAmount();
						}
					}
				}
			}
		}else {
			System.out.println("This category is not exist");
		}
		

		return totalAmount;
	}

}
