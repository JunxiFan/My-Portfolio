package neu.edu.info6250.controller.idea;

import java.util.Date;

import javax.validation.constraints.Min;

import org.springframework.format.annotation.DateTimeFormat;

public class IdeaCreation {
	private Integer ideaId;
	private Integer cateId;
	private Integer userId;
	private String ideaStatus;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdOn;
	private String ideaRemark;
	private String ideaName;
	private String ideaDesc;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date ideaEnddate;
	@Min(value = 0, message="Idea's aim amount must > 0 ")
	private int ideaAim;

	public IdeaCreation() {

	}
	public IdeaCreation(Integer ideaId) {
		this.ideaId = ideaId;
	}

	public Integer getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(Integer ideaId) {
		this.ideaId = ideaId;
	}

	public Integer getCateId() {
		return cateId;
	}

	public void setCateId(Integer cateId) {
		this.cateId = cateId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getIdeaStatus() {
		return ideaStatus;
	}

	public void setIdeaStatus(String ideaStatus) {
		this.ideaStatus = ideaStatus;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public String getIdeaRemark() {
		return ideaRemark;
	}

	public void setIdeaRemark(String ideaRemark) {
		this.ideaRemark = ideaRemark;
	}

	public String getIdeaName() {
		return ideaName;
	}

	public void setIdeaName(String ideaName) {
		this.ideaName = ideaName;
	}

	public String getIdeaDesc() {
		return ideaDesc;
	}

	public void setIdeaDesc(String ideaDesc) {
		this.ideaDesc = ideaDesc;
	}

	public Date getIdeaEnddate() {
		return ideaEnddate;
	}

	public void setIdeaEnddate(Date ideaEnddate) {
		this.ideaEnddate = ideaEnddate;
	}

	public int getIdeaAim() {
		return ideaAim;
	}

	public void setIdeaAim(int ideaAim) {
		this.ideaAim = ideaAim;
	}

}
