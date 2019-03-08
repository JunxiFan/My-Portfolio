package neu.edu.info6250.controller.category;

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

import neu.edu.info6250.service.CategoryService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/category")
public class CatagoryController {

	@Autowired
	private CategoryService categoryService;

	@RequestMapping(method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> createCategory(@RequestBody @Valid CategoryModel categoryModel) {
		ResponseEntity<?> response = new ResponseEntity<>("Category Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		Integer cateId = categoryService.createCategory(categoryModel);
		if (cateId != null) {
			response = new ResponseEntity<>("CateId:" + cateId, HttpStatus.OK);
		}
		return response;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<CategoryModel> getCategoryList() {
		return categoryService.getCategoryList();

	}
	
	@RequestMapping(path="/normalCates", method = RequestMethod.GET)
	public List<CategoryModel> getNormalCategoryList() {
		return categoryService.getNormalCategoryList();

	}

	@RequestMapping(path = "/{cateId}", method = RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> deleteRole(@PathVariable("cateId") Integer cateId) {
		ResponseEntity<?> response = new ResponseEntity<>("Category Not Deleted", HttpStatus.UNPROCESSABLE_ENTITY);
		boolean deleteStatus = categoryService.deleteCategory(cateId);
		if (deleteStatus) {
			response = new ResponseEntity<>("Delete Complete", HttpStatus.OK);
		}
		return response;
	}

	@RequestMapping(path = "/{cateId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> updateCategory(@PathVariable("cateId") Integer cateId,
			@RequestBody @Valid CategoryModel categoryModel) {
		ResponseEntity<?> response = new ResponseEntity<>("Category Not Updated", HttpStatus.UNPROCESSABLE_ENTITY);
		boolean message = categoryService.updateCategory(cateId, categoryModel);
		if (message) {
			response = new ResponseEntity<>("Update Complete", HttpStatus.OK);
		}
		return response;
	}
	
	@RequestMapping(path = "/disabled/{cateId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<?> disableCategory(@PathVariable("cateId") Integer cateId){
		ResponseEntity<?> response = new ResponseEntity<>("Category Not Disabled", HttpStatus.UNPROCESSABLE_ENTITY);
		boolean message = categoryService.disableCategory(cateId);
		if (message) {
			response = new ResponseEntity<>("Disabled Complete", HttpStatus.OK);
		}
		return response;
	}

}
