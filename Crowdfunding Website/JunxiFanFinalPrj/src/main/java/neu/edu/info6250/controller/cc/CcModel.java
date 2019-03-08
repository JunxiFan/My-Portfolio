package neu.edu.info6250.controller.cc;

import neu.edu.info6250.controller.user.UserModel;

public class CcModel {
private Integer ccId;
private String cardNum;
private Integer expirMonth;
private Integer expirYear;
private Integer cvv;
private Integer userId;



public CcModel() {
	super();
}
public CcModel(Integer ccId, String cardNum, Integer expirMonth, Integer expirYear, Integer cvv, Integer userId) {
	super();
	this.ccId = ccId;
	this.cardNum = cardNum;
	this.expirMonth = expirMonth;
	this.expirYear = expirYear;
	this.cvv = cvv;
	this.userId = userId;
}
public Integer getUserId() {
	return userId;
}
public void setUserId(Integer userId) {
	this.userId = userId;
}
public Integer getCcId() {
	return ccId;
}
public void setCcId(Integer ccId) {
	this.ccId = ccId;
}
public String getCardNum() {
	return cardNum;
}
public void setCardNum(String cardNum) {
	this.cardNum = cardNum;
}
public Integer getExpirMonth() {
	return expirMonth;
}
public void setExpirMonth(Integer expirMonth) {
	this.expirMonth = expirMonth;
}
public Integer getExpirYear() {
	return expirYear;
}
public void setExpirYear(Integer expirYear) {
	this.expirYear = expirYear;
}
public Integer getCvv() {
	return cvv;
}
public void setCvv(Integer cvv) {
	this.cvv = cvv;
}



}
