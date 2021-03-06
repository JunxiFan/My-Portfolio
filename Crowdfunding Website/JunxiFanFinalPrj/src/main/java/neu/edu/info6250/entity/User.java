package neu.edu.info6250.entity;
// Generated 2017-12-7 22:48:41 by Hibernate Tools 5.2.3.Final

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

/**
 * User generated by hbm2java
 */
@Entity
@Table(name = "user", catalog = "info6250final", uniqueConstraints = @UniqueConstraint(columnNames = "username"))
public class User implements java.io.Serializable {

	private Integer userId;
	private Role role;
	private String userStatus;
	private String username;
	private String password;
	private String name;
	private Date createdOn;
	private Set<Idea> ideas = new HashSet<Idea>(0);
	private Set<Orderhistory> orderhistories = new HashSet<Orderhistory>(0);
	private Set<Cc> ccs = new HashSet<Cc>(0);
	private Set<Startup> startups = new HashSet<Startup>(0);

	public User() {
	}

	public User(Role role, String userStatus, String username, String password, String name) {
		this.role = role;
		this.userStatus = userStatus;
		this.username = username;
		this.password = password;
		this.name = name;
	}

	public User(Role role, String userStatus, String username, String password, String name, Date createdOn,
			Set<Idea> ideas, Set<Orderhistory> orderhistories, Set<Cc> ccs, Set<Startup> startups) {
		this.role = role;
		this.userStatus = userStatus;
		this.username = username;
		this.password = password;
		this.name = name;
		this.createdOn = createdOn;
		this.ideas = ideas;
		this.orderhistories = orderhistories;
		this.ccs = ccs;
		this.startups = startups;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "user_id", unique = true, nullable = false)
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id", nullable = false)
	public Role getRole() {
		return this.role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Column(name = "user_status", nullable = false, length = 20)
	public String getUserStatus() {
		return this.userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	@Column(name = "username", unique = true, nullable = false, length = 100)
	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Column(name = "password", nullable = false, length = 45)
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "name", nullable = false, length = 40)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "created_on", length = 10)
	public Date getCreatedOn() {
		return this.createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	public Set<Idea> getIdeas() {
		return this.ideas;
	}

	public void setIdeas(Set<Idea> ideas) {
		this.ideas = ideas;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	public Set<Orderhistory> getOrderhistories() {
		return this.orderhistories;
	}

	public void setOrderhistories(Set<Orderhistory> orderhistories) {
		this.orderhistories = orderhistories;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	public Set<Cc> getCcs() {
		return this.ccs;
	}

	public void setCcs(Set<Cc> ccs) {
		this.ccs = ccs;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	public Set<Startup> getStartups() {
		return this.startups;
	}

	public void setStartups(Set<Startup> startups) {
		this.startups = startups;
	}

}
