package com.chinaLife.hr.service.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by tianwei on 2017/2/7.
 */
@Entity
@Table(indexes = {
        @Index(name="work_identityNumberIndex",columnList = "identityNumber")
})
public class Work {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @Column(nullable = false)
    private String identityNumber;
    private String beginDate;
    private  String endDate;
    private String workCompany;
    private String workDepartMent;
    private String workPosition;  //工作职务
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
        return "Work{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", beginDate='" + beginDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", workCompany='" + workCompany + '\'' +
                ", workDepartMent='" + workDepartMent + '\'' +
                ", workPosition='" + workPosition + '\'' +
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

        Work work = (Work) o;

        if (id != null ? !id.equals(work.id) : work.id != null) return false;
        if (name != null ? !name.equals(work.name) : work.name != null) return false;
        if (identityNumber != null ? !identityNumber.equals(work.identityNumber) : work.identityNumber != null)
            return false;
        if (beginDate != null ? !beginDate.equals(work.beginDate) : work.beginDate != null) return false;
        if (endDate != null ? !endDate.equals(work.endDate) : work.endDate != null) return false;
        if (workCompany != null ? !workCompany.equals(work.workCompany) : work.workCompany != null) return false;
        if (workDepartMent != null ? !workDepartMent.equals(work.workDepartMent) : work.workDepartMent != null)
            return false;
        return !(workPosition != null ? !workPosition.equals(work.workPosition) : work.workPosition != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (identityNumber != null ? identityNumber.hashCode() : 0);
        result = 31 * result + (beginDate != null ? beginDate.hashCode() : 0);
        result = 31 * result + (endDate != null ? endDate.hashCode() : 0);
        result = 31 * result + (workCompany != null ? workCompany.hashCode() : 0);
        result = 31 * result + (workDepartMent != null ? workDepartMent.hashCode() : 0);
        result = 31 * result + (workPosition != null ? workPosition.hashCode() : 0);
        return result;
    }
}
