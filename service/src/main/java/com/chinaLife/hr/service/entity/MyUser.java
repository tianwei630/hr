package com.chinaLife.hr.service.entity;

import javax.persistence.*;

/**
 * Created by tianwei on 2017/2/7.
 */
@Entity
@Table(name="myUsers",indexes = {@Index(name="nameIndex",columnList = "name")})
public class MyUser {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    public MyUser(){}

    public MyUser(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

}