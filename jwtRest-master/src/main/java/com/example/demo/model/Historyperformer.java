package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Historyperformer {
    private Long id;
    private String userid;
    private long performerid;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "USERID")
    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    @Basic
    @Column(name = "PERFORMERID")
    public long getPerformerid() {
        return performerid;
    }

    public void setPerformerid(long performerid) {
        this.performerid = performerid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Historyperformer that = (Historyperformer) o;
        return performerid == that.performerid && Objects.equals(id, that.id) && Objects.equals(userid, that.userid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userid, performerid);
    }
}
