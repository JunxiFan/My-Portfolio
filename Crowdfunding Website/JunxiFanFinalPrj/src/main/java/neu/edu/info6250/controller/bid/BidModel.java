package neu.edu.info6250.controller.bid;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class BidModel {
	private Integer bidId;
	private String bidStatus;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date deliverydate;
	private Integer bidAmount;
	private String bidDesc;
	private Integer servId;
	private Integer suId;

	public BidModel() {
		super();
	}
	
	

	public BidModel(Integer bidId, String bidStatus, Date deliverydate, Integer bidAmount, String bidDesc,
			Integer servId, Integer suId) {
		super();
		this.bidId = bidId;
		this.bidStatus = bidStatus;
		this.deliverydate = deliverydate;
		this.bidAmount = bidAmount;
		this.bidDesc = bidDesc;
		this.servId = servId;
		this.suId = suId;
	}



	public Integer getBidId() {
		return bidId;
	}

	public void setBidId(Integer bidId) {
		this.bidId = bidId;
	}

	public String getBidStatus() {
		return bidStatus;
	}

	public void setBidStatus(String bidStatus) {
		this.bidStatus = bidStatus;
	}

	public Date getDeliverydate() {
		return deliverydate;
	}

	public void setDeliverydate(Date deliverydate) {
		this.deliverydate = deliverydate;
	}

	public Integer getBidAmount() {
		return bidAmount;
	}

	public void setBidAmount(Integer bidAmount) {
		this.bidAmount = bidAmount;
	}

	public String getBidDesc() {
		return bidDesc;
	}

	public void setBidDesc(String bidDesc) {
		this.bidDesc = bidDesc;
	}

	public Integer getServId() {
		return servId;
	}

	public void setServId(Integer servId) {
		this.servId = servId;
	}

	public Integer getSuId() {
		return suId;
	}

	public void setSuId(Integer suId) {
		this.suId = suId;
	}

}
