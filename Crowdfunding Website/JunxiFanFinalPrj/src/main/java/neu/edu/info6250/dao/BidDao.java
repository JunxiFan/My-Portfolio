package neu.edu.info6250.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.Bid;

@Repository
public interface BidDao extends JpaRepository<Bid, Integer> {

	List<Bid> findByServiceServId(Integer servId);

	List<Bid> findByStartupSuId(Integer suId);
}
