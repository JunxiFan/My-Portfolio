package neu.edu.info6250.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
	
    @Autowired
    private ResourceServerTokenServices tokenServices;

    @Value("${security.jwt.resource-ids}")
    private String resourceIds;

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.resourceId(resourceIds)
        			 .tokenServices(tokenServices);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
                http
                .requestMatchers().and()
                .authorizeRequests()
                
                .antMatchers(HttpMethod.POST,"/user/register/**").permitAll()
                .antMatchers(HttpMethod.GET,"/**").authenticated()
                .antMatchers(HttpMethod.PUT,"/**").authenticated()
                .antMatchers(HttpMethod.POST,"/**").authenticated()
                .antMatchers(HttpMethod.DELETE,"/**").authenticated()
//                
                
//                .antMatchers(HttpMethod.GET,"/user/**").permitAll()
//                .antMatchers("/**").permitAll()
////                .antMatchers("/role/**").authenticated()
//                .antMatchers("/role/**").authenticated()
;
    }
}