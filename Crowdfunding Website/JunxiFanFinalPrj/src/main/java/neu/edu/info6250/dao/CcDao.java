package neu.edu.info6250.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.Cc;

@Repository
public interface CcDao extends JpaRepository<Cc, Integer> {

	List<Cc> findByUserUserId(Integer userId);
}
