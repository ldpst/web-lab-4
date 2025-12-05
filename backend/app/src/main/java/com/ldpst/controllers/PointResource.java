package com.ldpst.controllers;

import java.math.BigDecimal;
import java.util.List;

import com.ldpst.DTO.PointDTO;
import com.ldpst.DTO.TokenDTO;
import com.ldpst.entity.Point;
import com.ldpst.repository.PointService;
import com.ldpst.utils.JwtGenerator;
import com.ldpst.utils.PointValidator;

import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/point")
public class PointResource {

    @EJB
    private PointService pointService;

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String addPoint(PointDTO dto) {
        try {
            BigDecimal x = new BigDecimal(dto.getX());
            if (!PointValidator.checkX(x)) return "{\"isSuccess\":\"false\",\"error\":\"X must be from -5 to 5\"}";
            BigDecimal y = new BigDecimal(dto.getY());
            if (!PointValidator.checkY(y)) return "{\"isSuccess\":\"false\",\"error\":\"Y must be from -5 to 3\"}";
            BigDecimal r = new BigDecimal(dto.getR());
            if (!PointValidator.checkR(r)) return "{\"isSuccess\":\"false\",\"error\":\"R must be from -5 to 5\"}";

            Long owner = JwtGenerator.validateToken(dto.getToken());
            if (owner == null) return "{\"isSuccess\":\"false\",\"error\":\"Token not found\"}";

            pointService.savePoint(x, y, r, owner);
            return "{\"isSuccess\":\"true\"}";
        }
        catch (Exception e) {
            return "{\"isSuccess\":\"false\",\"error\":\"Invalid data (x/y/r)\"}";
        }
    }

    @POST
    @Path("/clear")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String clearPoints(TokenDTO dto) {
        String token = dto.getToken();
        Long owner = JwtGenerator.validateToken(token);
        if (owner != null) {
            pointService.clearAllByOwnerId(owner);
            return "{\"isSuccess\":\"true\"}";
        }
        return "{\"isSuccess\":\"false\",\"error\":\"Token not found\"}";
    }

    @POST
    @Path("/get")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON) 
    public String getPoints(TokenDTO dto) {
        String token = dto.getToken();
        Long owner = JwtGenerator.validateToken(token);
        if (owner != null) {
            System.out.println("Owner !null");
            List<Point> points = pointService.findAllByOwnerId(owner);
            System.out.println(points);
            StringBuilder sb = new StringBuilder();
            sb.append("{\"isSuccess\":\"true\", \"points\":[");
            for (int i = 0; i < points.size(); i++) {
                Point p = points.get(i);
                sb.append("{");
                sb.append("\"x\":").append(p.getX()).append(",");
                sb.append("\"y\":").append(p.getY()).append(",");
                sb.append("\"r\":").append(p.getR()).append(",");
                sb.append("\"date\":\"").append(p.beautifulDate()).append("\",");
                sb.append("\"duration\":\"").append(p.beautifulDuration()).append("\",");
                sb.append("\"check\":").append(p.getCheck());
                sb.append("}");
                if (i < points.size() - 1) {
                    sb.append(",");
                }
            }

            sb.append("]}");
            return sb.toString();
        }
        else {
            System.out.println("owner null");
            return "{\"isSuccess\":\"false\",\"error\":\"Token not found\"}";
        }
    }
}
