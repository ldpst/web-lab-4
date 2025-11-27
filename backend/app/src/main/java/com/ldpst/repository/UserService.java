package com.ldpst.repository;

import java.beans.Transient;
import java.util.List;

import com.ldpst.entity.UserEntity;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Stateless
public class UserService {
    
    @PersistenceContext(unitName = "MyPU")
    private EntityManager em;

    public UserEntity findByEmail(String email) {
        @SuppressWarnings("null")
        List<UserEntity> result = em.createQuery(
                "SELECT u FROM UserEntity u WHERE u.email = :email", UserEntity.class)
                .setParameter("email", email)
                .getResultList();
        
        return result.isEmpty() ? null : result.get(0);
    }

    public UserEntity findByEmailAndPasswordHash(String email, String passwordHash) {
        @SuppressWarnings("null")
        List<UserEntity> result = em.createQuery(
                "SELECT u FROM UserEntity u WHERE u.email = :email AND u.passwordHash = :passwordHash",
                UserEntity.class)
                .setParameter("email", email)
                .setParameter("passwordHash", passwordHash)
                .getResultList();

        return result.isEmpty() ? null : result.get(0);
    }

    @Transient
    public UserEntity save(String email, String passwordHash) {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(email);
        userEntity.setPasswordHash(passwordHash);
        em.persist(userEntity);
        return userEntity;
    }
}