package neu.edu.info6250.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@ComponentScan({ "neu.edu.info6250.config","neu.edu.info6250.config.security", "neu.edu.info6250.controller", "neu.edu.info6250.service" })
@EnableJpaRepositories("neu.edu.info6250.dao")
@EntityScan("neu.edu.info6250.entity")
public class Application extends WebMvcConfigurerAdapter implements CommandLineRunner {

	@Autowired
	private DataSource dataSource;

	public static void main(String... args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("DATASOURCE = " + dataSource);

	}
}
