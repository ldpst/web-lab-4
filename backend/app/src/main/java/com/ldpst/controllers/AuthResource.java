package com.ldpst.controllers;

import com.ldpst.DTO.AuthUserDTO;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/auth")
public class AuthResource {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public String check(AuthUserDTO dto) {
        if (dto.getEmail().equals("123") && dto.getPasswordHash().equals("456")) {
            return "hello";
        }
        return "no hello :c";
    }
}