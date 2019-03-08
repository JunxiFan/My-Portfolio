package neu.edu.info6250.controller.user;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class StartupModel {

	private Integer suId;
	private String compName;
	private Integer userId;
	private Integer roleId;
	private String username;
	private String name;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdOn;
	private Integer cateId;



	public StartupModel(Integer suId, String compName, Integer userId, Integer roleId, String username, String name,
			Date createdOn, Integer cateId) {
		super();
		this.suId = suId;
		this.compName = compName;
		this.userId = userId;
		this.roleId = roleId;
		this.username = username;
		this.name = name;
		this.createdOn = createdOn;
		this.cateId = cateId;
	}

	public StartupModel() {
		super();
	}

	public Integer getCateId() {
		return cateId;
	}

	public void setCateId(Integer cateId) {
		this.cateId = cateId;
	}

	public Integer getSuId() {
		return suId;
	}

	public void setSuId(Integer suId) {
		this.suId = suId;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

}
