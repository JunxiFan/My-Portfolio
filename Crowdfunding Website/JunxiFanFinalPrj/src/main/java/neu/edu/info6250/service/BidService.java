package neu.edu.info6250.service;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.bid.BidModel;
import neu.edu.info6250.dao.BidDao;
import neu.edu.info6250.dao.ServiceDao;
import neu.edu.info6250.dao.StartupDao;
import neu.edu.info6250.entity.Bid;
import neu.edu.info6250.entity.Idea;
import neu.edu.info6250.entity.Report;

@Service
public class BidService {

	@Autowired
	private BidDao bidDao;

	@Autowired
	private ServiceDao serviceDao;

	@Autowired
	private StartupDao startupDao;

	@Transactional
	public Integer createBid(Integer servId, Integer suId, BidModel bidModel) {
		Integer sumBidAmount = 0;
		for (neu.edu.info6250.entity.Service service : serviceDao.findByServId(servId)) {
			for(Bid bid:service.getBids()){
				if (bid.getBidStatus().equals("selected")) {
					sumBidAmount += bid.getBidAmount();
				}
			}
		}
		Idea idea = serviceDao.findOne(servId).getIdea();
		Integer remain = idea.getIdeaAim() - sumBidAmount;
		boolean suitableBidAmount = (sumBidAmount + bidModel.getBidAmount()) < idea.getIdeaAim();

		Integer newBidId = null;

		if (bidModel.getDeliverydate().before(serviceDao.findOne(servId).getServDdl())) {
			if (suitableBidAmount) {
				if (bidModel.getDeliverydate().after(new Date())) {
					Bid bid = new Bid();
					bid.setBidStatus("new");
					bid.setDeliverydate(bidModel.getDeliverydate());
					bid.setBidAmount(bidModel.getBidAmount());
					bid.setBidDesc(bidModel.getBidDesc());
					bid.setService(serviceDao.findOne(servId));
					bid.setStartup(startupDao.findOne(suId));
					bid = bidDao.save(bid);
					newBidId = bid.getBidId();
				} else {
					System.out.println("Delivery Date must after today");
				}

			} else {
				System.out.println("Bid Amount required by startup cannot more than idea's remaining money:" + remain);
			}
		} else {
			System.out.println("Delivery date must before service's ddl");
		}

		return newBidId;
	}

	@Transactional
	public List<BidModel> getBidByServId(Integer servId) {
		// TODO Auto-generated method stub
		return bidDao.findByServiceServId(servId).stream().map(map -> {
			BidModel bidModel = new BidModel(map.getBidId(), map.getBidStatus(), map.getDeliverydate(),
					map.getBidAmount(), map.getBidDesc(), map.getService().getServId(), map.getStartup().getSuId());
			return bidModel;
		}).collect(Collectors.toList());

	}

	@Transactional
	public boolean selectBid(Integer bidId) {
		// TODO Auto-generated method stub
		Bid bid = bidDao.findOne(bidId);
		bid.setBidStatus("selected");
		bidDao.save(bid);
		neu.edu.info6250.entity.Service service = serviceDao.findOne(bid.getService().getServId());
		service.setServStatus("closed");
		serviceDao.save(service);

		return true;
	}

	@Transactional
	public List<BidModel> getSelectedBidByUserId(Integer userId) {
		// TODO Auto-generated method stub

		return bidDao.findAll().stream().filter(map -> map.getStartup().getUser().getUserId().equals(userId))
				.filter(map -> map.getBidStatus().equals("selected")).map(map -> {
					BidModel bidModel = new BidModel(map.getBidId(), map.getBidStatus(), map.getDeliverydate(),
							map.getBidAmount(), map.getBidDesc(), map.getService().getServId(),
							map.getStartup().getSuId());
					return bidModel;
				}).collect(Collectors.toList());
	}

	@Transactional
	public List<BidModel> getBidIndanger(Integer suId) {
		// TODO Auto-generated method stub

		Date today = new Date();
		Date warnDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

		List<Bid> bids = bidDao.findByStartupSuId(suId).stream().filter(map -> map.getDeliverydate().before(warnDate))
				.collect(Collectors.toList());

		Integer maxProgress = 0;
		List<BidModel> bidModels = new ArrayList<>();
		for (Bid bid : bids) {
			if (!bid.getReports().isEmpty()) {
				for (Report report : bid.getReports()) {
					if (report.getProgress() > maxProgress) {
						maxProgress = report.getProgress();
					}
					if (maxProgress < 100) {
						System.out.println("This bid is not finished.");
						BidModel bidModel = new BidModel(bid.getBidId(), bid.getBidStatus(), bid.getDeliverydate(),
								bid.getBidAmount(), bid.getBidDesc(), bid.getService().getServId(),
								bid.getStartup().getSuId());
						bidModels.add(bidModel);
					}
				}
			} else {
				System.out.println("This bid has no report.");
				BidModel bidModel = new BidModel(bid.getBidId(), bid.getBidStatus(), bid.getDeliverydate(),
						bid.getBidAmount(), bid.getBidDesc(), bid.getService().getServId(), bid.getStartup().getSuId());
				bidModels.add(bidModel);
			}
		}

		return bidModels;
	}

}
