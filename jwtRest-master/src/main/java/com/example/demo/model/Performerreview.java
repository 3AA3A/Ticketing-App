package com.example.demo.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Performerreview {
    private Long id;
    private Timestamp revdate;
    private String review;
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
    @Column(name = "REVDATE")
    public Timestamp getRevdate() {
        return revdate;
    }

    public void setRevdate(Timestamp revdate) {
        this.revdate = revdate;
    }

    @Basic
    @Column(name = "REVIEW")
    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
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
        Performerreview that = (Performerreview) o;
        return performerid == that.performerid && Objects.equals(id, that.id) && Objects.equals(revdate, that.revdate) && Objects.equals(review, that.review) && Objects.equals(userid, that.userid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, revdate, review, userid, performerid);
    }
}
