package neu.edu.info6250.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.Service;

@Repository
public interface ServiceDao extends JpaRepository<Service, Integer>{

	List<Service> findByIdeaIdeaId(Integer ideaId);
	
	List<Service> findByServId(Integer servId);
}
