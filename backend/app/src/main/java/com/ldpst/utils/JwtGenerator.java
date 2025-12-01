package com.ldpst.utils;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

public class JwtGenerator {
    private static final SecretKey key = (SecretKey) Jwts.SIG.HS256.key().build();

    public static String generateToken(Long id) { 
        long expirationMs = 3600000;
        
        return Jwts.builder()
            .subject(id.toString())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expirationMs))
            .signWith(key)
            .compact();
    }

    public static Long validateToken(String token) {
        try {
            Jws<Claims> parsed = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);

            return Long.valueOf(parsed.getPayload().getSubject());

        } catch (Exception e) {
            return null;
        }
    }
}
