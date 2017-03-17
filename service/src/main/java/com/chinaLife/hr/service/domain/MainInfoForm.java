package com.chinaLife.hr.service.domain;

import com.chinaLife.hr.service.entity.Account;

/**
 * Created by tianwei on 2017/2/22.
 */
public class MainInfoForm {
    private EmployeeForm employee;
    private EducationForm educationInfo;
    private WorkForm workInfo;
    private Account accountInfo;
    private PaymentForm paymentInfo;

    @Override
    public String toString() {
        return "MainInfoForm{" +
                "employee=" + employee +
                ", educationInfo=" + educationInfo +
                ", workInfo=" + workInfo +
                ", accountInfo=" + accountInfo +
                ", paymentInfo=" + paymentInfo +
                '}';
    }

    public EmployeeForm getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeForm employee) {
        this.employee = employee;
    }

    public EducationForm getEducationInfo() {
        return educationInfo;
    }

    public void setEducationInfo(EducationForm educationInfo) {
        this.educationInfo = educationInfo;
    }

    public WorkForm getWorkInfo() {
        return workInfo;
    }

    public void setWorkInfo(WorkForm workInfo) {
        this.workInfo = workInfo;
    }

    public Account getAccountInfo() {
        return accountInfo;
    }

    public void setAccountInfo(Account accountInfo) {
        this.accountInfo = accountInfo;
    }

    public PaymentForm getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(PaymentForm paymentInfo) {
        this.paymentInfo = paymentInfo;
    }
}
