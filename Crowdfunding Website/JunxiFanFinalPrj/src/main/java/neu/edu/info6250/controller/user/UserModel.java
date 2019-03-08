package neu.edu.info6250.controller.user;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class UserModel {
	private Integer userId;
	private Integer roleId;
	private String username;
	private String name;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdOn;
	private String userStatus;

	public UserModel(Integer userId, Integer roleId, String username, String name, Date createdOn) {
		super();
		this.userId = userId;
		this.roleId = roleId;
		this.username = username;
		this.name = name;
		this.createdOn = createdOn;
	}
	
	
	public UserModel() {
		super();
	}
	
	


	public UserModel(Integer userId, Integer roleId, String username, String name, Date createdOn, String userStatus) {
		super();
		this.userId = userId;
		this.roleId = roleId;
		this.username = username;
		this.name = name;
		this.createdOn = createdOn;
		this.userStatus = userStatus;
	}


	public String getUserStatus() {
		return userStatus;
	}


	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}




	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

}
