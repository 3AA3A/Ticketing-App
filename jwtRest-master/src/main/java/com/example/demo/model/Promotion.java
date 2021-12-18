package com.example.demo.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Promotion {
    private Long id;
    private long discountamount;
    private Timestamp datefrom;
    private Timestamp dateto;
    private long eventid;

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
    @Column(name = "DISCOUNTAMOUNT")
    public long getDiscountamount() {
        return discountamount;
    }

    public void setDiscountamount(long discountamount) {
        this.discountamount = discountamount;
    }

    @Basic
    @Column(name = "DATEFROM")
    public Timestamp getDatefrom() {
        return datefrom;
    }

    public void setDatefrom(Timestamp datefrom) {
        this.datefrom = datefrom;
    }

    @Basic
    @Column(name = "DATETO")
    public Timestamp getDateto() {
        return dateto;
    }

    public void setDateto(Timestamp dateto) {
        this.dateto = dateto;
    }

    @Basic
    @Column(name = "EVENTID")
    public long getEventid() {
        return eventid;
    }

    public void setEventid(long eventid) {
        this.eventid = eventid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Promotion promotion = (Promotion) o;
        return discountamount == promotion.discountamount && eventid == promotion.eventid && Objects.equals(id, promotion.id) && Objects.equals(datefrom, promotion.datefrom) && Objects.equals(dateto, promotion.dateto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, discountamount, datefrom, dateto, eventid);
    }
}
