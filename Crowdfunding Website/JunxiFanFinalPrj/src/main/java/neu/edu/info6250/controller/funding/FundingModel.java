package neu.edu.info6250.controller.funding;

public class FundingModel {

	private Integer fundId;
	private Integer fundValue;
	private String fundDesc;
	private Integer fundAmount;
	private Integer ideaId;
	
	

	public FundingModel() {
		super();
	}

	public FundingModel(Integer fundId, Integer fundValue, String fundDesc, Integer fundAmount, Integer ideaId) {
		super();
		this.fundId = fundId;
		this.fundValue = fundValue;
		this.fundDesc = fundDesc;
		this.fundAmount = fundAmount;
		this.ideaId = ideaId;
	}

	public Integer getFundId() {
		return fundId;
	}

	public void setFundId(Integer fundId) {
		this.fundId = fundId;
	}

	public Integer getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(Integer ideaId) {
		this.ideaId = ideaId;
	}

	public Integer getFundValue() {
		return fundValue;
	}

	public void setFundValue(Integer fundValue) {
		this.fundValue = fundValue;
	}

	public String getFundDesc() {
		return fundDesc;
	}

	public void setFundDesc(String fundDesc) {
		this.fundDesc = fundDesc;
	}

	public Integer getFundAmount() {
		return fundAmount;
	}

	public void setFundAmount(Integer fundAmount) {
		this.fundAmount = fundAmount;
	}

}
