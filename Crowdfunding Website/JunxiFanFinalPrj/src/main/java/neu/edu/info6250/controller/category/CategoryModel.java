package neu.edu.info6250.controller.category;

import javax.validation.constraints.NotNull;

public class CategoryModel {

	private Integer cateId;
	@NotNull
	private String cateName;
	private String cateDesc;

	private String cateStatus;
	
	public CategoryModel() {
		
	}
	
	public CategoryModel(Integer cateId, String cateName, String cateDesc, String cateStatus) {
		super();
		this.cateId = cateId;
		this.cateName = cateName;
		this.cateDesc = cateDesc;
		this.cateStatus = cateStatus;
	}

	public CategoryModel(Integer cateId) {
		this.cateId = cateId;
	}
	public Integer getCateId() {
		return cateId;
	}
	public String getCateName() {
		return cateName;
	}
	public void setCateName(String cateName) {
		this.cateName = cateName;
	}
	public String getCateDesc() {
		return cateDesc;
	}
	public void setCateDesc(String cateDesc) {
		this.cateDesc = cateDesc;
	}

	public String getCateStatus() {
		return cateStatus;
	}

	public void setCateStatus(String cateStatus) {
		this.cateStatus = cateStatus;
	}


	
	
}
