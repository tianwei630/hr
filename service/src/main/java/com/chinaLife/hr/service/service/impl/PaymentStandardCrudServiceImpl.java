package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.dao.PaymentStandardDao;
import com.chinaLife.hr.service.domain.PaymentStandardForm;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.PaymentStandard;
import com.chinaLife.hr.service.utils.ConfigUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("paymentStandardCrudService")
public class PaymentStandardCrudServiceImpl {
    @Autowired
    private PaymentStandardDao paymentStandardDao;

    public ResultInfo save(PaymentStandard obj) {
        return null;
    }

    public PaymentStandardForm findPaymentStandard(String jobLevel,String jobGrade){
        PaymentStandard paymentStandard = paymentStandardDao.findByJobLevelAndJobGrade(jobLevel, jobGrade);
        if(paymentStandard!=null){
            PaymentStandardForm paymentStandardForm = ConfigUtils.FormConvert(paymentStandard, PaymentStandardForm.class);
            return paymentStandardForm;
        }

        return null;
    }


}
