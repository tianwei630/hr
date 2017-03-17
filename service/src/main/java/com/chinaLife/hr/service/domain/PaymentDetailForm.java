package com.chinaLife.hr.service.domain;

import com.chinaLife.hr.service.entity.HrCode;

import java.io.Serializable;

/**
 * Created by tianwei on 2017/2/17.
 */
public class PaymentDetailForm implements Serializable {
    private static final long serialVersionUID = 2957450091737212071L;
    private Long id;
    private String beginDate;
    private String endDate;
    private HrCode jobLevel;  //职务级别
    private HrCode jobGrade;   //职务档次
    private String grantRadio; //发放比例
    private int version;

    @Override
    public String toString() {
        return "PaymentDetailForm{" +
                "id=" + id +
                ", beginDate='" + beginDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", jobLevel=" + jobLevel +
                ", jobGrade=" + jobGrade +
                ", grantRadio='" + grantRadio + '\'' +
                ", version=" + version +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public HrCode getJobLevel() {
        return jobLevel;
    }

    public void setJobLevel(HrCode jobLevel) {
        this.jobLevel = jobLevel;
    }

    public HrCode getJobGrade() {
        return jobGrade;
    }

    public void setJobGrade(HrCode jobGrade) {
        this.jobGrade = jobGrade;
    }

    public String getGrantRadio() {
        return grantRadio;
    }

    public void setGrantRadio(String grantRadio) {
        this.grantRadio = grantRadio;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
