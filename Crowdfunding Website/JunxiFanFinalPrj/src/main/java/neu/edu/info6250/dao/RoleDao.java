package neu.edu.info6250.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import neu.edu.info6250.entity.Role;

public interface RoleDao extends JpaRepository<Role, Integer> {

}
