package neu.edu.info6250.controller.order;

import static org.mockito.Matchers.booleanThat;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import neu.edu.info6250.controller.idea.IdeaModel;
import neu.edu.info6250.service.OrderService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	//funder 购买funding放入购物车  该funding减去购买数量
	@RequestMapping(path="/{fundId}", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('Funder')")
	public ResponseEntity<?> createOrderByFundId(@PathVariable("fundId")Integer fundId,@RequestBody @Valid OrderModel orderModel) {
		ResponseEntity<?> response = new ResponseEntity<>("Order Not Created", HttpStatus.UNPROCESSABLE_ENTITY);
		Integer orderId = orderService.createOrderByFundId(fundId,orderModel);
		if (orderId != null) {
			response = new ResponseEntity<>("orderId:" + orderId, HttpStatus.OK);
		}
		return response;
	}
	
	//funder查看已经加入购物车的order
	@RequestMapping(path = "/{userId}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('Funder')")
	public List<OrderModel> getOrderByUserId(@PathVariable("userId") Integer userId) {
		return orderService.getOrderByUserId(userId);
	}
	
	//根据已有cc清空购物车
	@RequestMapping(path="/clear/{ccId}", method = RequestMethod.PUT)
	@PreAuthorize("hasAuthority('Funder')")
	public ResponseEntity<?> clearCartByCcId(@PathVariable("ccId")Integer ccId) {
		ResponseEntity<?> response = new ResponseEntity<>("cart is not clear", HttpStatus.UNPROCESSABLE_ENTITY);
		boolean clear = orderService.clearCartByCcId(ccId);
		if (clear) {
			response = new ResponseEntity<>("Cart cleared", HttpStatus.OK);
		}
		return response;
	}

	
	
}
