package com.ldpst.controllers;

import com.ldpst.DTO.AuthUserDTO;
import com.ldpst.entity.UserEntity;
import com.ldpst.repository.UserService;
import com.ldpst.utils.JwtGenerator;
import com.ldpst.utils.UserValidator;

import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/auth")
public class AuthResource {
    @EJB
    private UserService userService;

    private final String invalidEmailMsg = "{\"isAuth\":\"false\",\"error\":\"invalid email\"}";
    private final String invalidPasswordMsg = "{\"isAuth\":\"false\",\"error\":\"invalid password\"}";

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String login(AuthUserDTO dto) {
        String email = dto.getEmail();
        if (!UserValidator.checkEmail(email)) return invalidEmailMsg;
        String passwordHash = dto.getPasswordHash();
        if (!UserValidator.checkPasswordHash(passwordHash)) return invalidPasswordMsg;
        UserEntity user = userService.findByEmailAndPasswordHash(email, passwordHash);
        if (user != null) {
            String json = "{\"isAuth\":\"true\",\"token\":\"" + JwtGenerator.generateToken(user.getId()) + "\"}";
            return json;
        } else {
            return "{\"isAuth\":\"false\",\"error\":\"wrong email or password\"}";
        }
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String register(AuthUserDTO dto) {
        String email = dto.getEmail();
        if (!UserValidator.checkEmail(email)) return invalidEmailMsg;
        String passwordHash = dto.getPasswordHash();
        if (!UserValidator.checkPasswordHash(passwordHash)) return invalidPasswordMsg;
        UserEntity oUser = userService.findByEmail(email);
        if (oUser == null) {
            UserEntity user = userService.save(email, passwordHash);
            if (user != null) {
                return "{\"isAuth\":\"true\",\"token\":\"" + JwtGenerator.generateToken(user.getId()) + "\"}";
            } else {
                return "{\"isAuth\":\"false\",\"error\":\"server error. code: 37933\"}";
            }
        } else {
            return "{\"isAuth\":\"false\",\"error\":\"email already in use\"}";
        }
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    public String check() {
        return "zxc";
    }
}