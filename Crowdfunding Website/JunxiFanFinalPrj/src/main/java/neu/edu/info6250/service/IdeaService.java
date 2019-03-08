package neu.edu.info6250.service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.idea.IdeaCreation;
import neu.edu.info6250.controller.idea.IdeaModel;
import neu.edu.info6250.dao.CategoryDao;
import neu.edu.info6250.dao.IdeaDao;
import neu.edu.info6250.dao.UserDao;
import neu.edu.info6250.entity.Idea;

@Service
public class IdeaService {

	@Autowired
	private IdeaDao ideaDao;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private UserDao userDao;

	@Transactional
	public Integer createIdea(Integer userId, IdeaCreation ideaCreation) {
		// TODO Auto-generated method stub
		Integer ideaId = null;
		Date today = new Date();
		if (ideaCreation.getIdeaEnddate().after(today)) {
			if (userDao.findOne(userId).getRole().getRoleId().equals(2)) {
				if (ideaCreation.getIdeaAim() > 0) {
					Idea idea = new Idea();
					idea.setCategory(categoryDao.findOne(ideaCreation.getCateId()));
					idea.setUser(userDao.findOne(userId));
					idea.setIdeaDesc(ideaCreation.getIdeaDesc());
					idea.setIdeaStatus("new");
					idea.setCreatedOn(today);
					idea.setIdeaRemark(ideaCreation.getIdeaRemark());
					idea.setIdeaName(ideaCreation.getIdeaName());
					idea.setIdeaDesc(ideaCreation.getIdeaDesc());
					idea.setIdeaEnddate(ideaCreation.getIdeaEnddate());
					idea.setIdeaAim(ideaCreation.getIdeaAim());
					idea = ideaDao.save(idea);
					ideaId = idea.getIdeaId();
				} else {
					System.out.println("Aim ammount must > 0");
				}
			} else {
				System.out.println("Idea must be created by creator");
			}
		} else {
			System.out.println("EndDate cannot before today");
		}

		return ideaId;
	}

	// 将超出enddate的idea设为overdue
	public void setOverdueIdea() {
		for (Idea idea : ideaDao.findAll()) {
			if (idea.getIdeaEnddate().before(new Date())) {
				idea.setIdeaStatus("overdue");
				ideaDao.save(idea);
			}
		}
	}

	@Transactional
	public List<IdeaModel> getNewIdeasByCateId(Integer cateId) {
		setOverdueIdea();
		return ideaDao.findAll().stream().filter(map -> map.getCategory().getCateId().equals(cateId)).filter(
				map -> !map.getCategory().getCateStatus().equals("disabled") && map.getIdeaStatus().equals("new"))
				.map(map -> {
					IdeaModel tempIdeaModel = new IdeaModel();

					tempIdeaModel.setIdeaId(map.getIdeaId());
					tempIdeaModel.setUserId(map.getUser().getUserId());
					tempIdeaModel.setCateId(map.getCategory().getCateId());
					tempIdeaModel.setIdeaStatus(map.getIdeaStatus());
					tempIdeaModel.setCreatedOn(map.getCreatedOn());
					tempIdeaModel.setIdeaRemark(map.getIdeaRemark());
					tempIdeaModel.setIdeaName(map.getIdeaName());
					tempIdeaModel.setIdeaDesc(map.getIdeaDesc());
					tempIdeaModel.setIdeaEnddate(map.getIdeaEnddate());
					tempIdeaModel.setIdeaAim(map.getIdeaAim());

					return tempIdeaModel;

				}).sorted(Comparator.comparing(IdeaModel::getCreatedOn).reversed()).collect(Collectors.toList());
	}

	@Transactional
	public List<IdeaModel> getDyingIdea(Integer userId) {
		// Date d=new Date();
		// SimpleDateFormat df1=new SimpleDateFormat("yyyy-MM-dd");
		// System.out.println("今天的日期："+df1.format(d));
		// System.out.println("两天前的日期：" + df1.format(new Date(d.getTime() - 2 *
		// 24 * 60 * 60 * 1000)));
		// System.out.println("三天后的日期：" + df1.format(new Date(d.getTime() + 3 *
		// 24 * 60 * 60 * 1000)));
		setOverdueIdea();
		Date today = new Date();
		Date warnDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

		return ideaDao.findByUserUserId(userId).stream().filter(map -> !map.getIdeaStatus().equals("done"))
				.filter(map -> !map.getCategory().getCateStatus().equals("disabled")
						&& !map.getIdeaStatus().equals("disabled") && !map.getIdeaStatus().equals("overdue"))
				.filter(map -> map.getIdeaEnddate().before(warnDate)).map(map -> {
					IdeaModel tempIdeaModel = new IdeaModel();

					tempIdeaModel.setUserId(map.getUser().getUserId());
					tempIdeaModel.setCateId(map.getCategory().getCateId());
					tempIdeaModel.setIdeaStatus(map.getIdeaStatus());
					tempIdeaModel.setCreatedOn(map.getCreatedOn());
					tempIdeaModel.setIdeaRemark(map.getIdeaRemark());
					tempIdeaModel.setIdeaName(map.getIdeaName());
					tempIdeaModel.setIdeaDesc(map.getIdeaDesc());
					tempIdeaModel.setIdeaEnddate(map.getIdeaEnddate());
					tempIdeaModel.setIdeaAim(map.getIdeaAim());

					return tempIdeaModel;

				}).sorted(Comparator.comparing(IdeaModel::getCreatedOn).reversed()).collect(Collectors.toList());
	}

	@Transactional
	public String disableIdeaByIdeaId(Integer ideaId) {
		// TODO Auto-generated method stub
		String result = null;
		Idea toBeDisabledIdea = ideaDao.findOne(ideaId);
		if (toBeDisabledIdea != null) {
			toBeDisabledIdea.setIdeaStatus("disabled");
			toBeDisabledIdea = ideaDao.save(toBeDisabledIdea);
			result = toBeDisabledIdea.getIdeaStatus();

		}
		return result;
	}

	@Transactional
	public List<IdeaModel> getIdeaList(Integer cateId) {
		// TODO Auto-generated method stub
		return ideaDao.findAll().stream().filter(map -> map.getCategory().getCateId().equals(cateId)).map(map -> {
			IdeaModel ideaModel = new IdeaModel(map.getIdeaId(), map.getCategory().getCateId(),
					map.getUser().getUserId(), map.getIdeaStatus(), map.getCreatedOn(), map.getIdeaRemark(),
					map.getIdeaName(), map.getIdeaDesc(), map.getIdeaEnddate(), map.getIdeaAim());
			return ideaModel;
		}).collect(Collectors.toList());
	}

	@Transactional
	public List<IdeaModel> getNewIdeaByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return ideaDao.findByUserUserId(userId).stream().map(map -> {
			IdeaModel ideaModel = new IdeaModel(map.getIdeaId(), map.getCategory().getCateId(),
					map.getUser().getUserId(), map.getIdeaStatus(), map.getCreatedOn(), map.getIdeaRemark(),
					map.getIdeaName(), map.getIdeaDesc(), map.getIdeaEnddate(), map.getIdeaAim());
			return ideaModel;
		}).collect(Collectors.toList());
	}

}
