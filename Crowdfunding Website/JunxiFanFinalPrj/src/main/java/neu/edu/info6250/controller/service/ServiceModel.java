package neu.edu.info6250.controller.service;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class ServiceModel {

	private Integer servId;
	private String servStatus;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date servDdl;
	private Integer reward;
	private String servDesc;
	private Integer ideaId;
	
	public ServiceModel() {
		super();
	}

	public ServiceModel(Integer servId, String servStatus, Date servDdl, Integer reward, String servDesc,
			Integer ideaId) {
		super();
		this.servId = servId;
		this.servStatus = servStatus;
		this.servDdl = servDdl;
		this.reward = reward;
		this.servDesc = servDesc;
		this.ideaId = ideaId;
	}

	public Integer getServId() {
		return servId;
	}

	public void setServId(Integer servId) {
		this.servId = servId;
	}

	public String getServStatus() {
		return servStatus;
	}

	public void setServStatus(String servStatus) {
		this.servStatus = servStatus;
	}

	public Date getServDdl() {
		return servDdl;
	}

	public void setServDdl(Date servDdl) {
		this.servDdl = servDdl;
	}

	public Integer getReward() {
		return reward;
	}

	public void setReward(Integer reward) {
		this.reward = reward;
	}

	public String getServDesc() {
		return servDesc;
	}

	public void setServDesc(String servDesc) {
		this.servDesc = servDesc;
	}

	public Integer getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(Integer ideaId) {
		this.ideaId = ideaId;
	}
	
	
	
}
