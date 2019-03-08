package neu.edu.info6250.controller.order;

import java.util.Date;

public class OrderModel {

	private Integer orderId;
	private Integer fundId;
	private Integer userId;
	private String orderStatus;
	private Date createOn;
	private Integer payValue;
	private Integer buyAmount;

	public OrderModel() {
		super();
	}

	public OrderModel(Integer orderId, Integer fundId, Integer userId, String orderStatus, Date createOn,
			Integer payValue, Integer buyAmount) {
		super();
		this.orderId = orderId;
		this.fundId = fundId;
		this.userId = userId;
		this.orderStatus = orderStatus;
		this.createOn = createOn;
		this.payValue = payValue;
		this.buyAmount = buyAmount;
	}

	public Integer getBuyAmount() {
		return buyAmount;
	}

	public void setBuyAmount(Integer fundAmount) {
		this.buyAmount = fundAmount;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getFundId() {
		return fundId;
	}

	public void setFundId(Integer fundId) {
		this.fundId = fundId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Date getCreateOn() {
		return createOn;
	}

	public void setCreateOn(Date createOn) {
		this.createOn = createOn;
	}

	public Integer getPayValue() {
		return payValue;
	}

	public void setPayValue(Integer payValue) {
		this.payValue = payValue;
	}

}
