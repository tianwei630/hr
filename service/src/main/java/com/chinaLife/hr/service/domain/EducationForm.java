package com.chinaLife.hr.service.domain;

import java.io.Serializable;
import java.util.Arrays;

/**
 * Created by tianwei on 2017/2/16.
 */
public class EducationForm implements Serializable{
    private Long id;
    private String name;
    private String identityNumber;
    private EducationDetailForm[] educations;

    @Override
    public String toString() {
        return "EducationForm{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", educations=" + Arrays.toString(educations) +
                '}';
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

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public EducationDetailForm[] getEducations() {
        return educations;
    }

    public void setEducations(EducationDetailForm[] educations) {
        this.educations = educations;
    }
}
