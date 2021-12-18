package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Performer {
    private Long id;
    private String name;
    private String type;
    private String image;
    private int viewamount;

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
    @Column(name = "TYPE")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "IMAGE")
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Basic
    @Column(name = "VIEWAMOUNT")
    public int getViewamount() {
        return viewamount;
    }

    public void setViewamount(int viewamount) {
        this.viewamount = viewamount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Performer performer = (Performer) o;
        return viewamount == performer.viewamount && Objects.equals(id, performer.id) && Objects.equals(name, performer.name) && Objects.equals(type, performer.type) && Objects.equals(image, performer.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, image, viewamount);
    }
}
