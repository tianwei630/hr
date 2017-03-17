package com.chinaLife.hr.service.domain;

import java.io.Serializable;

/**
 * Created by tianwei on 2017/2/17.
 */
public class WorkDetialForm implements Serializable {

    private static final long serialVersionUID = -406628022105361127L;
    private Long id;
    private String beginDate;
    private  String endDate;
    private String workCompany;
    private String workDepartMent;
    private String workPosition;  //工作职务
    private int version;

    @Override
    public String toString() {
        return "WorkDetialForm{" +
                "id=" + id +
                ", beginDate='" + beginDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", workCompany='" + workCompany + '\'' +
                ", workDepartMent='" + workDepartMent + '\'' +
                ", workPosition='" + workPosition + '\'' +
                ", version='" + version + '\'' +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getWorkCompany() {
        return workCompany;
    }

    public void setWorkCompany(String workCompany) {
        this.workCompany = workCompany;
    }

    public String getWorkDepartMent() {
        return workDepartMent;
    }

    public void setWorkDepartMent(String workDepartMent) {
        this.workDepartMent = workDepartMent;
    }

    public String getWorkPosition() {
        return workPosition;
    }

    public void setWorkPosition(String workPosition) {
        this.workPosition = workPosition;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
