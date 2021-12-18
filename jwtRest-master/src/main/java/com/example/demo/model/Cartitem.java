package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Cartitem {
    private Long id;
    private int quantity;
    private long cartid;
    private long productid;

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
    @Column(name = "QUANTITY")
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Basic
    @Column(name = "CARTID")
    public long getCartid() {
        return cartid;
    }

    public void setCartid(long cartid) {
        this.cartid = cartid;
    }

    @Basic
    @Column(name = "PRODUCTID")
    public long getProductid() {
        return productid;
    }

    public void setProductid(long productid) {
        this.productid = productid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cartitem cartitem = (Cartitem) o;
        return quantity == cartitem.quantity && cartid == cartitem.cartid && productid == cartitem.productid && Objects.equals(id, cartitem.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, quantity, cartid, productid);
    }
}
