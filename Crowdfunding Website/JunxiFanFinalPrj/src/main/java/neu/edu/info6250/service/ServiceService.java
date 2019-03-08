package neu.edu.info6250.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.service.ServiceModel;
import neu.edu.info6250.controller.user.UserModel;
import neu.edu.info6250.dao.IdeaDao;
import neu.edu.info6250.dao.ServiceDao;
import neu.edu.info6250.entity.Idea;

@Service
public class ServiceService {

	@Autowired
	private IdeaDao ideaDao;

	@Autowired
	private ServiceDao serviceDao;

	@Transactional
	public Integer createService(ServiceModel serviceModel, Integer ideaId) {
		Integer sumReward = 0;
		for (neu.edu.info6250.entity.Service service : serviceDao.findByIdeaIdeaId(ideaId)) {
			sumReward += service.getReward();
		}

		Idea idea = ideaDao.findOne(ideaId);
		Integer remain = idea.getIdeaAim() - sumReward;
		boolean suitableReward = (sumReward + serviceModel.getReward()) < idea.getIdeaAim();

		neu.edu.info6250.entity.Service service = null;
		Integer newServiceId = null;

		// 验证idea和相关category可用
		if (!idea.getCategory().getCateStatus().equals("disabled")) {
			if (!idea.getIdeaStatus().equals("disabled")) {
				// 验证service ddl在idea的起止时间内
				if (idea.getCreatedOn().before(serviceModel.getServDdl())) {
					if (idea.getIdeaEnddate().after(serviceModel.getServDdl())) {
						if (suitableReward) {
							service = new neu.edu.info6250.entity.Service();
							service.setIdea(idea);
							service.setServStatus("new");
							service.setServDdl(serviceModel.getServDdl());
							service.setReward(serviceModel.getReward());
							service.setServDesc(serviceModel.getServDesc());
							service = serviceDao.save(service);
							newServiceId = service.getServId();
						} else {
							System.out.println("Reward cannot more than idea's remaining money: " + remain);
						}
					} else {
						System.out.println("Ddl should before idea's end date");
					}
				} else {
					System.out.println("Ddl should after idea's create date");
				}
			} else {
				System.out.println("Status of idea cannot be disabled");
			}
		} else {
			System.out.println("Status of idea's category cannot be disabled");
		}

		return newServiceId;
	}

	@Transactional
	public List<ServiceModel> getServiceByIdeaId(Integer ideaId) {
		// TODO Auto-generated method stub
		return serviceDao.findByIdeaIdeaId(ideaId).stream().filter(map -> map.getServStatus().equals("new"))
				.map(map -> {
					ServiceModel serviceModel = new ServiceModel(map.getServId(), map.getServStatus(), map.getServDdl(),
							map.getReward(), map.getServDesc(), map.getIdea().getIdeaId());
					return serviceModel;

				}).collect(Collectors.toList());
	}

	@Transactional
	public List<ServiceModel> getEveryServiceByIdeaId(Integer ideaId) {
		// TODO Auto-generated method stub
		return serviceDao.findByIdeaIdeaId(ideaId).stream()
				.map(map -> {
					ServiceModel serviceModel = new ServiceModel(map.getServId(), map.getServStatus(), map.getServDdl(),
							map.getReward(), map.getServDesc(), map.getIdea().getIdeaId());
					return serviceModel;

				}).collect(Collectors.toList());
	}

}
