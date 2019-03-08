package neu.edu.info6250.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.Funding;

@Repository
public interface FundingDao extends JpaRepository<Funding, Integer> {

	List<Funding> findByIdeaIdeaId(Integer ideaId);
}
