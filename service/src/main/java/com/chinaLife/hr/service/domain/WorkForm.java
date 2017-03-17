package com.chinaLife.hr.service.domain;

import java.io.Serializable;
import java.util.Arrays;

/**
 * Created by tianwei on 2017/2/17.
 */
public class WorkForm implements Serializable {
    private static final long serialVersionUID = 6762262111530935503L;
    private String name;
    private String identityNumber;
    private WorkDetialForm[] works;

    @Override
    public String toString() {
        return "WorkForm{" +
                "name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", works=" + Arrays.toString(works) +
                '}';
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public WorkDetialForm[] getWorks() {
        return works;
    }

    public void setWorks(WorkDetialForm[] works) {
        this.works = works;
    }
}
