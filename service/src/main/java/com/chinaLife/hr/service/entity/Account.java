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
        @Index(name="account_identityNumberIndex",columnList = "identityNumber",unique = true)
})
public class Account {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @Column(nullable = false)
    private String identityNumber;
    private String accountNo;
    private String socialInsuranceNo;  //社保号
    private String houseNo;  //公积金账号
    private String email;
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
        return "Account{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", accountNo='" + accountNo + '\'' +
                ", socialInsuranceNo='" + socialInsuranceNo + '\'' +
                ", houseNo='" + houseNo + '\'' +
                ", email='" + email + '\'' +
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

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getSocialInsuranceNo() {
        return socialInsuranceNo;
    }

    public void setSocialInsuranceNo(String socialInsuranceNo) {
        this.socialInsuranceNo = socialInsuranceNo;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Account account = (Account) o;

        if (id != null ? !id.equals(account.id) : account.id != null) return false;
        if (name != null ? !name.equals(account.name) : account.name != null) return false;
        if (identityNumber != null ? !identityNumber.equals(account.identityNumber) : account.identityNumber != null)
            return false;
        if (accountNo != null ? !accountNo.equals(account.accountNo) : account.accountNo != null) return false;
        if (socialInsuranceNo != null ? !socialInsuranceNo.equals(account.socialInsuranceNo) : account.socialInsuranceNo != null)
            return false;
        if (houseNo != null ? !houseNo.equals(account.houseNo) : account.houseNo != null) return false;
        return !(email != null ? !email.equals(account.email) : account.email != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (identityNumber != null ? identityNumber.hashCode() : 0);
        result = 31 * result + (accountNo != null ? accountNo.hashCode() : 0);
        result = 31 * result + (socialInsuranceNo != null ? socialInsuranceNo.hashCode() : 0);
        result = 31 * result + (houseNo != null ? houseNo.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        return result;
    }
}
