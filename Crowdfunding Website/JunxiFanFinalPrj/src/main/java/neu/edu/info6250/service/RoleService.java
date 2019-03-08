package neu.edu.info6250.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neu.edu.info6250.controller.role.RoleModel;
import neu.edu.info6250.dao.RoleDao;
import neu.edu.info6250.entity.Role;

@Service
public class RoleService {

	@Autowired
	private RoleDao roleDao;

	@Transactional
	public Integer createRole(RoleModel roleModel) {

		Role role = new Role();
		role.setRoleName(roleModel.getRoleName());
		role.setRoleDesc(roleModel.getRoleDesc());
		role = roleDao.save(role);
		System.out.println("ID Created " + role.getRoleId());
		return role.getRoleId();
	}
	
	@Transactional
	public List<RoleModel> findAll() {
		// TODO Auto-generated method stub

		return roleDao.findAll().stream()
			   .map(x -> {
			RoleModel temp = new RoleModel(x.getRoleId());
			temp.setRoleName(x.getRoleName());
			temp.setRoleDesc(x.getRoleDesc());
			return temp;
		}).collect(Collectors.toList());
		
		/*
		 * List<RoleModel> roleModels = new ArrayList<>();
			for(Role x: roleDao.findAll()){
				RoleModel temp = new RoleModel(x.getRoleId());
				temp.setRoleName(x.getRoleName());
				temp.setRoleDesc(x.getRoleDesc());
				//return temp;
				roleModels.add(temp);
			
			}
		
		*/
	}

	@Transactional
	public boolean deleteRole(Integer roleId) {
		Role toBeDeleted = roleDao.findOne(roleId);
		if (toBeDeleted.getUsers().size() > 0) {
			return false;
		} else {
			roleDao.delete(toBeDeleted);
		}
		return true;
	}

	@Transactional
	public boolean updateRole(Integer roleId, RoleModel newRole) {

		Role toBeUpdated = roleDao.findOne(roleId);
		toBeUpdated.setRoleDesc(newRole.getRoleDesc());
		toBeUpdated.setRoleName(newRole.getRoleName());

		roleDao.save(toBeUpdated);
		return true;
	}

}
