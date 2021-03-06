package com.chinaLife.hr.service.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by tianwei on 2017/2/16.
 * 薪酬标准
 */
@Entity
public class PaymentStandard {
    @Id
    @GeneratedValue
    private Long id;
    private String jobLevel;  //职级
    private String jobGrade;  //档次
    private Double yearSalaryStandard;  //年薪标准
    private Double basicSalary;  //基本工资
    private Double postSalary;   //岗位工资
    private Double  performanceSalary;  //绩效工资
    private Double preTaxSalary;   //每月税前工资
    private Double endYearPerformanceSalary;  //年终绩效工资
    private Double laborFee;   //工会会费
    private Double yearSalary;  //年收入
    private Double totalWelFare;  //福利合计
    private Double welFare;  //月度福利
    private Double trafficFee;  //交通费
    private Double communicationFee;  //通讯费
    private Double foodFee;  //伙食费
    private Double workProtectionFee;   //劳动保护费
    private Double  houseFee;  //居住管理费
    private Double  medicalFee;  //医疗包干费
    private Double clothesFee;  //工作置装费
    private Double washClothesFee;  //洗衣费
    private Double birthdayFee;  //生日费
    private Double totalHolidayFee;   //过节费
    private Double coolFee;  //清凉费

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
        return "PaymentStandard{" +
                "id=" + id +
                ", jobLevel='" + jobLevel + '\'' +
                ", jobGrade='" + jobGrade + '\'' +
                ", yearSalaryStandard=" + yearSalaryStandard +
                ", basicSalary=" + basicSalary +
                ", postSalary=" + postSalary +
                ", performanceSalary=" + performanceSalary +
                ", preTaxSalary=" + preTaxSalary +
                ", endYearPerformanceSalary=" + endYearPerformanceSalary +
                ", laborFee=" + laborFee +
                ", yearSalary=" + yearSalary +
                ", totalWelFare=" + totalWelFare +
                ", welFare=" + welFare +
                ", trafficFee=" + trafficFee +
                ", communicationFee=" + communicationFee +
                ", foodFee=" + foodFee +
                ", workProtectionFee=" + workProtectionFee +
                ", houseFee=" + houseFee +
                ", medicalFee=" + medicalFee +
                ", clothesFee=" + clothesFee +
                ", washClothesFee=" + washClothesFee +
                ", birthdayFee=" + birthdayFee +
                ", totalHolidayFee=" + totalHolidayFee +
                ", coolFee=" + coolFee +
                ", operatorNo='" + operatorNo + '\'' +
                ", operatorName='" + operatorName + '\'' +
                ", inputDate=" + inputDate +
                ", version=" + version +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Double getYearSalaryStandard() {
        return yearSalaryStandard;
    }

    public void setYearSalaryStandard(Double yearSalaryStandard) {
        this.yearSalaryStandard = yearSalaryStandard;
    }

    public Double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Double getPostSalary() {
        return postSalary;
    }

    public void setPostSalary(Double postSalary) {
        this.postSalary = postSalary;
    }

    public Double getPerformanceSalary() {
        return performanceSalary;
    }

    public void setPerformanceSalary(Double performanceSalary) {
        this.performanceSalary = performanceSalary;
    }

    public Double getPreTaxSalary() {
        return preTaxSalary;
    }

    public void setPreTaxSalary(Double preTaxSalary) {
        this.preTaxSalary = preTaxSalary;
    }

    public Double getEndYearPerformanceSalary() {
        return endYearPerformanceSalary;
    }

    public void setEndYearPerformanceSalary(Double endYearPerformanceSalary) {
        this.endYearPerformanceSalary = endYearPerformanceSalary;
    }

    public Double getLaborFee() {
        return laborFee;
    }

    public void setLaborFee(Double laborFee) {
        this.laborFee = laborFee;
    }

    public Double getYearSalary() {
        return yearSalary;
    }

    public void setYearSalary(Double yearSalary) {
        this.yearSalary = yearSalary;
    }

    public Double getTotalWelFare() {
        return totalWelFare;
    }

    public void setTotalWelFare(Double totalWelFare) {
        this.totalWelFare = totalWelFare;
    }

    public Double getWelFare() {
        return welFare;
    }

    public void setWelFare(Double welFare) {
        this.welFare = welFare;
    }

    public Double getTrafficFee() {
        return trafficFee;
    }

    public void setTrafficFee(Double trafficFee) {
        this.trafficFee = trafficFee;
    }

    public Double getCommunicationFee() {
        return communicationFee;
    }

    public void setCommunicationFee(Double communicationFee) {
        this.communicationFee = communicationFee;
    }

    public Double getFoodFee() {
        return foodFee;
    }

    public void setFoodFee(Double foodFee) {
        this.foodFee = foodFee;
    }

    public Double getWorkProtectionFee() {
        return workProtectionFee;
    }

    public void setWorkProtectionFee(Double workProtectionFee) {
        this.workProtectionFee = workProtectionFee;
    }

    public Double getHouseFee() {
        return houseFee;
    }

    public void setHouseFee(Double houseFee) {
        this.houseFee = houseFee;
    }

    public Double getMedicalFee() {
        return medicalFee;
    }

    public void setMedicalFee(Double medicalFee) {
        this.medicalFee = medicalFee;
    }

    public Double getClothesFee() {
        return clothesFee;
    }

    public void setClothesFee(Double clothesFee) {
        this.clothesFee = clothesFee;
    }

    public Double getWashClothesFee() {
        return washClothesFee;
    }

    public void setWashClothesFee(Double washClothesFee) {
        this.washClothesFee = washClothesFee;
    }

    public Double getBirthdayFee() {
        return birthdayFee;
    }

    public void setBirthdayFee(Double birthdayFee) {
        this.birthdayFee = birthdayFee;
    }

    public Double getTotalHolidayFee() {
        return totalHolidayFee;
    }

    public void setTotalHolidayFee(Double totalHolidayFee) {
        this.totalHolidayFee = totalHolidayFee;
    }

    public Double getCoolFee() {
        return coolFee;
    }

    public void setCoolFee(Double coolFee) {
        this.coolFee = coolFee;
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

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
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
}
