package neu.edu.info6250.controller.report;

import java.util.Date;

import neu.edu.info6250.entity.Bid;

public class ReportModel {
	private Integer repoId;
	private Integer bidId;
	private String repoDesc;
	private Date createdOn;
	private Integer progress;
	
	
	public ReportModel() {
		super();
	}





	public ReportModel(Integer repoId, Integer bidId, String repoDesc, Date createdOn, Integer progress) {
		super();
		this.repoId = repoId;
		this.bidId = bidId;
		this.repoDesc = repoDesc;
		this.createdOn = createdOn;
		this.progress = progress;
	}





	public Integer getBidId() {
		return bidId;
	}





	public void setBidId(Integer bidId) {
		this.bidId = bidId;
	}





	public Integer getRepoId() {
		return repoId;
	}


	public void setRepoId(Integer repoId) {
		this.repoId = repoId;
	}


	public String getRepoDesc() {
		return repoDesc;
	}


	public void setRepoDesc(String repoDesc) {
		this.repoDesc = repoDesc;
	}


	public Date getCreatedOn() {
		return createdOn;
	}


	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}


	public Integer getProgress() {
		return progress;
	}


	public void setProgress(Integer progress) {
		this.progress = progress;
	}
	
	

	
}
