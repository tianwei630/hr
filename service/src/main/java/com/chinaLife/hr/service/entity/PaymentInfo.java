package com.chinaLife.hr.service.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by tianwei on 2017/2/7.
 */
//薪酬信息  记录历次薪酬调整变化
@Entity
@Table(indexes = {
        @Index(name="paymentInfo_identityNumberIndex",columnList = "identityNumber")
})
public class PaymentInfo {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @Column(nullable = false)
    private String identityNumber;
    private String beginDate;
    private String endDate;
    private String jobLevel;  //职务级别
    private String jobGrade;   //职务档次
    private String grantRadio; //发放比例
    private String operatorNo;
    private String operatorName;
    private Date inputDate;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateTime;

    @Version
    private int version;

    @Override
    public String toString() {
        return "PaymentInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", beginDate='" + beginDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", jobLevel='" + jobLevel + '\'' +
                ", jobGrade='" + jobGrade + '\'' +
                ", grantRadio='" + grantRadio + '\'' +
                ", operatorNo='" + operatorNo + '\'' +
                ", operatorName='" + operatorName + '\'' +
                ", inputDate=" + inputDate +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", version=" + version +
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

    public String getJobLevel() {
        return jobLevel;
    }

    public void setJobLevel(String jobLevel) {
        this.jobLevel = jobLevel;
    }

    public String getJobGrade() {
        return jobGrade;
    }

    public void setJobGrade(String jobGrade) {
        this.jobGrade = jobGrade;
    }

    public String getGrantRadio() {
        return grantRadio;
    }

    public void setGrantRadio(String grantRadio) {
        this.grantRadio = grantRadio;
    }

    public String getOperatorNo() {
        return operatorNo;
    }

    public void setOperatorNo(String operatorNo) {
        this.operatorNo = operatorNo;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public Date getInputDate() {
        return inputDate;
    }

    public void setInputDate(Date inputDate) {
        this.inputDate = inputDate;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PaymentInfo that = (PaymentInfo) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (identityNumber != null ? !identityNumber.equals(that.identityNumber) : that.identityNumber != null)
            return false;
        if (beginDate != null ? !beginDate.equals(that.beginDate) : that.beginDate != null) return false;
        if (endDate != null ? !endDate.equals(that.endDate) : that.endDate != null) return false;
        if (jobLevel != null ? !jobLevel.equals(that.jobLevel) : that.jobLevel != null) return false;
        if (jobGrade != null ? !jobGrade.equals(that.jobGrade) : that.jobGrade != null) return false;
        return !(grantRadio != null ? !grantRadio.equals(that.grantRadio) : that.grantRadio != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (identityNumber != null ? identityNumber.hashCode() : 0);
        result = 31 * result + (beginDate != null ? beginDate.hashCode() : 0);
        result = 31 * result + (endDate != null ? endDate.hashCode() : 0);
        result = 31 * result + (jobLevel != null ? jobLevel.hashCode() : 0);
        result = 31 * result + (jobGrade != null ? jobGrade.hashCode() : 0);
        result = 31 * result + (grantRadio != null ? grantRadio.hashCode() : 0);
        return result;
    }
}
