package com.example.demo.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Coupon {
    private Long id;
    private String userid;
    private Long discount;
    private Timestamp datevalid;
    private String coupcode;

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
    @Column(name = "DISCOUNT")
    public Long getDiscount() {
        return discount;
    }

    public void setDiscount(Long discount) {
        this.discount = discount;
    }

    @Basic
    @Column(name = "DATEVALID")
    public Timestamp getDatevalid() {
        return datevalid;
    }

    public void setDatevalid(Timestamp datevalid) {
        this.datevalid = datevalid;
    }

    @Basic
    @Column(name = "COUPCODE")
    public String getCoupcode() {
        return coupcode;
    }

    public void setCoupcode(String coupcode) {
        this.coupcode = coupcode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coupon coupon = (Coupon) o;
        return Objects.equals(id, coupon.id) && Objects.equals(userid, coupon.userid) && Objects.equals(discount, coupon.discount) && Objects.equals(datevalid, coupon.datevalid) && Objects.equals(coupcode, coupon.coupcode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userid, discount, datevalid, coupcode);
    }
}
