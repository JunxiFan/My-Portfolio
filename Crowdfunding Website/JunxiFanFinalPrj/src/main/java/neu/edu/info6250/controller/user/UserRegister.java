package neu.edu.info6250.controller.user;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class UserRegister {
	private Integer userId;
	private String username;
	private String password;
	private String name;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdOn;
	private Integer roleId;
	private String compName;
	private Integer cateId;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public Integer getCateId() {
		return cateId;
	}

	public void setCateId(Integer cateId) {
		this.cateId = cateId;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}
}
