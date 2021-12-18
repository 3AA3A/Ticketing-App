package com.example.demo.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Event {
    private Long id;
    private String name;
    private Timestamp startdate;
    private Timestamp enddate;
    private long viewamount;
    private String userid;
    private long genreid;
    private long venueid;

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
    @Column(name = "NAME")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "STARTDATE")
    public Timestamp getStartdate() {
        return startdate;
    }

    public void setStartdate(Timestamp startdate) {
        this.startdate = startdate;
    }

    @Basic
    @Column(name = "ENDDATE")
    public Timestamp getEnddate() {
        return enddate;
    }

    public void setEnddate(Timestamp enddate) {
        this.enddate = enddate;
    }

    @Basic
    @Column(name = "VIEWAMOUNT")
    public long getViewamount() {
        return viewamount;
    }

    public void setViewamount(long viewamount) {
        this.viewamount = viewamount;
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
    @Column(name = "GENREID")
    public long getGenreid() {
        return genreid;
    }

    public void setGenreid(long genreid) {
        this.genreid = genreid;
    }

    @Basic
    @Column(name = "VENUEID")
    public long getVenueid() {
        return venueid;
    }

    public void setVenueid(long venueid) {
        this.venueid = venueid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return viewamount == event.viewamount && genreid == event.genreid && venueid == event.venueid && Objects.equals(id, event.id) && Objects.equals(name, event.name) && Objects.equals(startdate, event.startdate) && Objects.equals(enddate, event.enddate) && Objects.equals(userid, event.userid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, startdate, enddate, viewamount, userid, genreid, venueid);
    }
}
