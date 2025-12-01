package com.ldpst.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.ldpst.entity.Point;
import com.ldpst.utils.PointChecker;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Stateless
public class PointService {
    @PersistenceContext(unitName = "MyPU")
    private EntityManager em;

    public List<Point> findAllByOwnerId(Long owner) {
        @SuppressWarnings("null")
        List<Point> result = em.createQuery(
                "SELECT p FROM Point p WHERE p.owner = :owner", Point.class)
                .setParameter("owner", owner)
                .getResultList();
        return result;
    }

    public Point savePoint(BigDecimal x, BigDecimal y, BigDecimal r, Long owner) {
        long start = System.nanoTime();
        LocalDateTime localDateTime = LocalDateTime.now();
        
        if (x == null || y == null || r == null) {
            return null;
        }

        Point p = new Point();
        p.setX(x);
        p.setY(y);
        p.setR(r);

        p.setDate(localDateTime);
        p.setCheck(PointChecker.check(x, y, r));
        p.setOwner(owner);

        p.setDuration(System.nanoTime() - start);

        em.persist(p);
        return p;
    }

    public void clearAllByOwnerId(Long owner) {
        em.createQuery("DELETE FROM Point p WHERE p.owner = :owner")
            .setParameter("owner", owner)
            .executeUpdate();
    }
}
