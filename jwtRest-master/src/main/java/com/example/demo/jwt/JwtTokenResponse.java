package com.example.demo.jwt;

import java.io.Serializable;

public class JwtTokenResponse implements Serializable {

    private static final long serialVersionUID = 8317676219297719109L;

    private final String token;
    private final String username;
    private final String role;

    public JwtTokenResponse(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    public String getToken() {
        return this.token;
    }
    public String getUsername() {
        return this.username;
    }
    public String getRole() {
        return this.role;
    }
}