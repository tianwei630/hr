package com.chinaLife.hr.service.domain;

import com.chinaLife.hr.service.entity.HrCode;

import java.io.Serializable;

/**
 * Created by tianwei on 2017/2/16.
 */
public class EducationDetailForm implements Serializable {

    private static final long serialVersionUID = -6147048357514954477L;
    private Long id;
    private HrCode education;  //学历
    private HrCode degree;    //学位
    private String major;    //专业
    private String fullTimeFlag;  //是否全日制
    private String graduateSchool;  //毕业学校
    private String beginDate;  //开始时间
    private String endDate;    //结束时间
    private int version;

    @Override
    public String toString() {
        return "EducationDetailForm{" +
                "id=" + id +
                ", education=" + education +
                ", degree=" + degree +
                ", major='" + major + '\'' +
                ", fullTimeFlag='" + fullTimeFlag + '\'' +
                ", graduateSchool='" + graduateSchool + '\'' +
                ", beginDate='" + beginDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", version=" + version +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public HrCode getEducation() {
        return education;
    }

    public void setEducation(HrCode education) {
        this.education = education;
    }

    public HrCode getDegree() {
        return degree;
    }

    public void setDegree(HrCode degree) {
        this.degree = degree;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getFullTimeFlag() {
        return fullTimeFlag;
    }

    public void setFullTimeFlag(String fullTimeFlag) {
        this.fullTimeFlag = fullTimeFlag;
    }

    public String getGraduateSchool() {
        return graduateSchool;
    }

    public void setGraduateSchool(String graduateSchool) {
        this.graduateSchool = graduateSchool;
    }

    public String getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(String beginDate) {
        this.beginDate = beginDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
