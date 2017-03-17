package com.chinaLife.hr.service.domain;

import java.io.Serializable;

/**
 * Created by tianwei on 2017/3/10.
 */
//查询入参条件
public class QueryForm implements Serializable {

    private static final long serialVersionUID = -658362671666330221L;
    private String identityNumber;
    private String name;
    private String year;
    private String month;

    @Override
    public String toString() {
        return "QueryForm{" +
                "identityNumber='" + identityNumber + '\'' +
                ", name='" + name + '\'' +
                ", year='" + year + '\'' +
                ", month='" + month + '\'' +
                '}';
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
