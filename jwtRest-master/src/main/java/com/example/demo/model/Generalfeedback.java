package com.example.demo.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Generalfeedback {
    private Long id;
    private String userid;
    private Timestamp datemade;
    private String title;
    private String feedback;
    private String reply;
    private String viewed;

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
    @Column(name = "DATEMADE")
    public Timestamp getDatemade() {
        return datemade;
    }

    public void setDatemade(Timestamp datemade) {
        this.datemade = datemade;
    }

    @Basic
    @Column(name = "TITLE")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "FEEDBACK")
    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    @Basic
    @Column(name = "REPLY")
    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    @Basic
    @Column(name = "VIEWED")
    public String getViewed() {
        return viewed;
    }

    public void setViewed(String viewed) {
        this.viewed = viewed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Generalfeedback that = (Generalfeedback) o;
        return Objects.equals(id, that.id) && Objects.equals(userid, that.userid) && Objects.equals(datemade, that.datemade) && Objects.equals(title, that.title) && Objects.equals(feedback, that.feedback) && Objects.equals(reply, that.reply) && Objects.equals(viewed, that.viewed);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userid, datemade, title, feedback, reply, viewed);
    }
}
