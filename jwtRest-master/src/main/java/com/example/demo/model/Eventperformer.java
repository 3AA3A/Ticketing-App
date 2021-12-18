package com.example.demo.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Eventperformer {
    private Long id;
    private Timestamp performdate;
    private String performtime;
    private long eventid;
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
    @Column(name = "PERFORMDATE")
    public Timestamp getPerformdate() {
        return performdate;
    }

    public void setPerformdate(Timestamp performdate) {
        this.performdate = performdate;
    }

    @Basic
    @Column(name = "PERFORMTIME")
    public String getPerformtime() {
        return performtime;
    }

    public void setPerformtime(String performtime) {
        this.performtime = performtime;
    }

    @Basic
    @Column(name = "EVENTID")
    public long getEventid() {
        return eventid;
    }

    public void setEventid(long eventid) {
        this.eventid = eventid;
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
        Eventperformer that = (Eventperformer) o;
        return eventid == that.eventid && performerid == that.performerid && Objects.equals(id, that.id) && Objects.equals(performdate, that.performdate) && Objects.equals(performtime, that.performtime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, performdate, performtime, eventid, performerid);
    }
}
