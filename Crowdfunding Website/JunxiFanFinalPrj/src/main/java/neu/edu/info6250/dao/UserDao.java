package neu.edu.info6250.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import neu.edu.info6250.entity.User;

@Repository
public interface UserDao extends JpaRepository<User,Integer> {

	User findByUsername(String username);
	
}
