package com.example.demo.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JwtWebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtUnAuthorizedResponseAuthenticationEntryPoint jwtUnAuthorizedResponseAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtTableUserDetailsService;

    @Autowired
    private JwtTokenAuthorizationOncePerRequestFilter jwtAuthenticationTokenFilter;

    @Value("/login")
    private String authenticationPath;

    @Value("/register")
    private String registerPath;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(jwtTableUserDetailsService)
                .passwordEncoder(passwordEncoderBean());
    }

    @Bean
    public PasswordEncoder passwordEncoderBean() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().authorizeRequests().anyRequest().authenticated()
                //.antMatchers("/**")
        ;

        httpSecurity
                .addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        httpSecurity
                .headers()
                .frameOptions().sameOrigin()  //H2 Console Needs this setting
                .cacheControl(); //disable caching
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity
                .ignoring()
                .antMatchers(HttpMethod.POST, authenticationPath)
                .antMatchers(HttpMethod.POST, registerPath)
                .antMatchers(HttpMethod.OPTIONS, "/**")
                // whitelist all public urls here -- copy this line and modify:
                .antMatchers(HttpMethod.GET, "/images/**")
                .antMatchers(HttpMethod.GET, "/products/**")
                .antMatchers(HttpMethod.GET, "/performers/**")
                .antMatchers(HttpMethod.GET, "/events/**")
                .antMatchers(HttpMethod.GET, "/venues/**")
                .antMatchers(HttpMethod.GET, "/genres/**")
                .antMatchers(HttpMethod.GET, "/levels/**")
                .antMatchers(HttpMethod.GET, "/eventperformers/**")
                .antMatchers(HttpMethod.GET, "/generalfeedbacks/**")
                .antMatchers(HttpMethod.GET, "/faqs/**")
                .antMatchers(HttpMethod.GET, "/favoriteperformers/**")
                .antMatchers(HttpMethod.GET, "/favoriteevents/**")
                .antMatchers(HttpMethod.GET, "/historyperformers/**")
                .antMatchers(HttpMethod.GET, "/historyevents/**")
                .antMatchers(HttpMethod.GET, "/promotions/**")
                .antMatchers(HttpMethod.GET, "/explorer/**")








        //.antMatchers("/**")
        ;
    }
}