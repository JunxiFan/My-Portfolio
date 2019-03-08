package neu.edu.info6250.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.category.CategoryModel;
import neu.edu.info6250.dao.CategoryDao;
import neu.edu.info6250.entity.Category;

@Service
public class CategoryService {

	@Autowired
	private CategoryDao categoryDao;

	@Transactional
	public Integer createCategory(CategoryModel categoryModel) {
		Category category = new Category();
		category.setCateName(categoryModel.getCateName());
		category.setCateDesc(categoryModel.getCateDesc());
		category.setCateStatus("normal");
		category = categoryDao.save(category);
		// String message = "category created:" + category.getCateId();
		return category.getCateId();
	}

	@Transactional
	public List<CategoryModel> getCategoryList() {
		return categoryDao.findAll().stream().map(cate -> {
			CategoryModel temp = new CategoryModel(cate.getCateId());
			temp.setCateName(cate.getCateName());
			temp.setCateDesc(cate.getCateDesc());
			temp.setCateStatus(cate.getCateStatus());
			return temp;
		}).collect(Collectors.toList());
	}

	@Transactional
	public List<CategoryModel> getNormalCategoryList() {
		return categoryDao.findAll().stream()
		.filter(cate -> cate.getCateStatus().equals("normal"))
		.map(cate -> {
			CategoryModel temp = new CategoryModel(cate.getCateId());
			temp.setCateName(cate.getCateName());
			temp.setCateDesc(cate.getCateDesc());
			temp.setCateStatus(cate.getCateStatus());
			return temp;
		}).collect(Collectors.toList());
	}

	@Transactional
	public boolean deleteCategory(Integer cateId) {
		Category toBeDeleted = categoryDao.findOne(cateId);
		if (toBeDeleted.getIdeas().size() > 0 || toBeDeleted.getStartups().size() > 0) {
			System.out.println("This category has ideas/ has startups.");
			return false;
		} else {
			categoryDao.delete(toBeDeleted);
			return true;
		}
		
	}

	@Transactional
	public boolean updateCategory(Integer cateId, CategoryModel categoryModel) {
		// TODO Auto-generated method stub
		Category toBeUpdatedCategory = categoryDao.findOne(cateId);
		if (toBeUpdatedCategory != null) {
			toBeUpdatedCategory.setCateName(categoryModel.getCateName());
			toBeUpdatedCategory.setCateDesc(categoryModel.getCateDesc());
			return true;
		}

		return false;
	}

	@Transactional
	public boolean disableCategory(Integer cateId) {
		// TODO Auto-generated method stub
		Category toBeDisabled = categoryDao.findOne(cateId);
		if (toBeDisabled!=null) {
			toBeDisabled.setCateStatus("disabled");
			categoryDao.save(toBeDisabled);
			return true;
		}
		return false;
	}
}
