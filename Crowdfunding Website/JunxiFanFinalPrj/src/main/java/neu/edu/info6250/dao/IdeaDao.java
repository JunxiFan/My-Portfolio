package neu.edu.info6250.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.Idea;

@Repository
public interface IdeaDao extends JpaRepository<Idea, Integer> {

	List<Idea> findByUserUserId(Integer userId);
}
