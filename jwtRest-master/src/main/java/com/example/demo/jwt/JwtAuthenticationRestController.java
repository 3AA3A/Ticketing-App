package com.example.demo.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
//@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
public class JwtAuthenticationRestController {

    @Value("Authorization")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService jwtTableUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUserRepository jwtUserRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest)
            throws AuthenticationException {
        System.out.println("Logging in:" + authenticationRequest.getUsername());
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = jwtTableUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtTokenResponse(
                token,
                userDetails.getUsername(),
                userDetails.getAuthorities().toArray(new GrantedAuthority[0])[0].getAuthority())
        );
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(@RequestBody JwtTokenRequest authenticationRequest)
            throws AuthenticationException {

        if(jwtUserRepository.findByUsername(authenticationRequest.getUsername()) == null) {
            JwtUser jwtUser = new JwtUser();
            jwtUser.setUsername(authenticationRequest.getUsername());
            jwtUser.setPassword(passwordEncoder.encode(authenticationRequest.getPassword()));
            jwtUser.setRole("ROLE_USER");
            jwtUserRepository.save(jwtUser);
            System.out.println("Registered: " + jwtUser);
            System.out.println(passwordEncoder.encode(authenticationRequest.getPassword()));
        } else {
            System.out.println("User exists, attempting login instead:" + authenticationRequest.getUsername());
        }

        return createAuthenticationToken(authenticationRequest);
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    private void authenticate(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new AuthenticationException("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            System.out.println("Login failed: '" + username + "', '" + password + "'");
            throw new AuthenticationException("INVALID_CREDENTIALS", e);
        }
    }
}

