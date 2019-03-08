package neu.edu.info6250.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.Orderhistory;

@Repository
public interface OrderDao extends JpaRepository<Orderhistory, Integer>{

	List<Orderhistory> findByUserUserId(Integer userId);
	
	List<Orderhistory> findByFundingFundId(Integer  fundId);
}
