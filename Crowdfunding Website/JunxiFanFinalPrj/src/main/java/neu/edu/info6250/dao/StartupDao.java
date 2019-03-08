package neu.edu.info6250.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.Startup;

@Repository
public interface StartupDao extends JpaRepository<Startup, Integer> {
	Startup findBySuName(String suName);
	Startup findByUserUserId(Integer userId);
	List<Startup> findByCompName(String compName);

}
