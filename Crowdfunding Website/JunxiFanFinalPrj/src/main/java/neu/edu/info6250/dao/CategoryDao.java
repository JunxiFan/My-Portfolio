package neu.edu.info6250.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer> {
	

}
