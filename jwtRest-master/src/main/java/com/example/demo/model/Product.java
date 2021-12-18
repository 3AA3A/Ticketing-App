package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Product {
    private Long id;
    private int price;
    private int amount;
    private long levelid;
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
    @Column(name = "PRICE")
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Basic
    @Column(name = "AMOUNT")
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Basic
    @Column(name = "LEVELID")
    public long getLevelid() {
        return levelid;
    }

    public void setLevelid(long levelid) {
        this.levelid = levelid;
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
        Product product = (Product) o;
        return price == product.price && amount == product.amount && levelid == product.levelid && eventid == product.eventid && Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, price, amount, levelid, eventid);
    }
}
