package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Level {
    private Long id;
    private String name;
    private String desc;
    private int add;

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
    @Column(name = "DESC")
    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Basic
    @Column(name = "ADD")
    public int getAdd() {
        return add;
    }

    public void setAdd(int add) {
        this.add = add;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Level level = (Level) o;
        return add == level.add && Objects.equals(id, level.id) && Objects.equals(name, level.name) && Objects.equals(desc, level.desc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, desc, add);
    }
}
