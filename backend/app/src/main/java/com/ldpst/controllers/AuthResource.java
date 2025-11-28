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

    private final String invalidEmailMsg = "{\"isAuth\":\"false\",\"error\":\"Invalid email\"}";
    private final String invalidPasswordMsg = "{\"isAuth\":\"false\",\"error\":\"Invalid password\"}";
    private final String invalidSaltMsg = "{\"isAuth\":\"false\",\"error\":\"Salt not found\"}";

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
            return "{\"isAuth\":\"false\",\"error\":\"Wrong email or password\"}";
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
        String salt = dto.getSalt();
        if (!UserValidator.checkSalt(salt)) return invalidSaltMsg;
        UserEntity oUser = userService.findByEmail(email);
        if (oUser == null) {
            UserEntity user = userService.save(email, passwordHash, salt);
            if (user != null) {
                return "{\"isAuth\":\"true\",\"token\":\"" + JwtGenerator.generateToken(user.getId()) + "\"}";
            } else {
                return "{\"isAuth\":\"false\",\"error\":\"Server error. Code: 37933\"}";
            }
        } else {
            return "{\"isAuth\":\"false\",\"error\":\"Email already in use\"}";
        }
    }

    @POST
    @Path("/getsalt")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getSalt(AuthUserDTO dto) {
        String email = dto.getEmail();
        UserEntity user = userService.findByEmail(email);
        if (user != null && user.getSalt() != null) {
            return "{\"salt\":\"" + user.getSalt() + "\"}";
        }
        return null;
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    public String check() {
        return "zxc";
    }
}