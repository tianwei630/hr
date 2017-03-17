package com.chinaLife.hr.service.domain;

import java.io.Serializable;
import java.util.Arrays;

/**
 * Created by tianwei on 2017/2/21.
 */
public class PaymentForm implements Serializable {
    private static final long serialVersionUID = -3205240981025741539L;
    private String name;
    private String identityNumber;
    private PaymentDetailForm[] payments;

    @Override
    public String toString() {
        return "PaymentForm{" +
                "name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", payments=" + Arrays.toString(payments) +
                '}';
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
