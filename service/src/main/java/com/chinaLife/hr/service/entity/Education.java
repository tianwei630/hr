package com.chinaLife.hr.service.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by tianwei on 2017/2/7.
 */
//教育信息
@Entity
@Table(indexes = {
        @Index(name="education_identityNumberIndex",columnList = "identityNumber")
})
public class Education {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @Column(nullable = false)
    private String identityNumber;
    private String education;  //学历
    private String degree;    //学位
    private String major;    //专业
    private String fullTimeFlag;  //是否全日制
    private String graduateSchool;  //毕业学校
    private String beginDate;  //开始时间
    private String endDate;    //结束时间
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
        return "Education{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", education='" + education + '\'' +
                ", degree='" + degree + '\'' +
                ", major='" + major + '\'' +
                ", fullTimeFlag='" + fullTimeFlag + '\'' +
                ", graduateSchool='" + graduateSchool + '\'' +
                ", beginDate='" + beginDate + '\'' +
                ", endDate='" + endDate + '\'' +
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

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
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

        Education education1 = (Education) o;

        if (id != null ? !id.equals(education1.id) : education1.id != null) return false;
        if (name != null ? !name.equals(education1.name) : education1.name != null) return false;
        if (identityNumber != null ? !identityNumber.equals(education1.identityNumber) : education1.identityNumber != null)
            return false;
        if (education != null ? !education.equals(education1.education) : education1.education != null) return false;
        if (degree != null ? !degree.equals(education1.degree) : education1.degree != null) return false;
        if (major != null ? !major.equals(education1.major) : education1.major != null) return false;
        if (fullTimeFlag != null ? !fullTimeFlag.equals(education1.fullTimeFlag) : education1.fullTimeFlag != null)
            return false;
        if (graduateSchool != null ? !graduateSchool.equals(education1.graduateSchool) : education1.graduateSchool != null)
            return false;
        if (beginDate != null ? !beginDate.equals(education1.beginDate) : education1.beginDate != null) return false;
        return !(endDate != null ? !endDate.equals(education1.endDate) : education1.endDate != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (identityNumber != null ? identityNumber.hashCode() : 0);
        result = 31 * result + (education != null ? education.hashCode() : 0);
        result = 31 * result + (degree != null ? degree.hashCode() : 0);
        result = 31 * result + (major != null ? major.hashCode() : 0);
        result = 31 * result + (fullTimeFlag != null ? fullTimeFlag.hashCode() : 0);
        result = 31 * result + (graduateSchool != null ? graduateSchool.hashCode() : 0);
        result = 31 * result + (beginDate != null ? beginDate.hashCode() : 0);
        result = 31 * result + (endDate != null ? endDate.hashCode() : 0);
        return result;
    }
}
