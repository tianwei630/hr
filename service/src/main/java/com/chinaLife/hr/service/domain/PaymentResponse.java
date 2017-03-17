package com.chinaLife.hr.service.domain;

import java.io.Serializable;
import java.util.Arrays;

/**
 * Created by tianwei on 2017/2/17.
 */
public class PaymentResponse implements Serializable {
    private static final long serialVersionUID = 3321346061791168446L;
    private String name;
    private String identityNumber;
    private PaymentDetailForm[] payments;

    @Override
    public String toString() {
        return "PaymentResponse{" +
                "name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", payments=" + Arrays.toString(payments) +
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

    public PaymentDetailForm[] getPayments() {
        return payments;
    }

    public void setPayments(PaymentDetailForm[] payments) {
        this.payments = payments;
    }
}
