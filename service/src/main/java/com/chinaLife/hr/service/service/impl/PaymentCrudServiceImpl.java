package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.PaymentInfoDao;
import com.chinaLife.hr.service.domain.PaymentDetailForm;
import com.chinaLife.hr.service.domain.PaymentForm;
import com.chinaLife.hr.service.domain.QueryForm;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.PaymentInfo;
import com.chinaLife.hr.service.service.CrudService;
import com.chinaLife.hr.service.utils.ConfigUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("paymentCrudService")
public class PaymentCrudServiceImpl implements CrudService<PaymentForm,PaymentForm>{
    @Autowired
    private PaymentInfoDao paymentInfoDao;
    @Override
    public ResultInfo save(PaymentForm paymentForm) {

        ResultInfo resultInfo = new ResultInfo();
        String name = paymentForm.getName();
        String identityNumber = paymentForm.getIdentityNumber();
        PaymentDetailForm[] payments = paymentForm.getPayments();
        List<PaymentInfo>paymentInfodbs =paymentInfoDao.findByIdentityNumber(identityNumber);

//        数据修改插入
        for(PaymentDetailForm detail:payments){
            PaymentInfo paymentInfo = ConfigUtils.convertForm(detail, PaymentInfo.class);
            paymentInfo.setName(name);
            paymentInfo.setIdentityNumber(identityNumber);
            if(detail.getId()!=null){
                PaymentInfo paymentInfoDB = paymentInfoDao.findOne(detail.getId());
                if(paymentInfo.equals(paymentInfoDB)){
                    System.out.println("数据前后一致，不处理");
                }
                if(!paymentInfo.equals(paymentInfoDB)){
                    System.out.println("数据修改");
                    paymentInfoDao.save(paymentInfo);
                }
            }
            else {
                System.out.println("数据插入");

                paymentInfoDao.save(paymentInfo);
            }

        }

//        数据删除
        for(PaymentInfo paymentInfoDB:paymentInfodbs){
            if(!exists(paymentInfoDB,payments)){
                System.out.println("数据删除");
                paymentInfoDao.delete(paymentInfoDB.getId());
            }
        }
        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage(Constants.SUCCESS_MSG);
        return resultInfo;
    }

    public boolean exists(PaymentInfo paymentInfo,PaymentDetailForm[] details){
        boolean flag= false;
        for(int i=0;i<details.length;i++){
            if(paymentInfo.getId().equals(details[i].getId())){
                return true;
            }
        }
        return flag;

    }
    @Override
    public PaymentForm findByIdentityNumber(String identityNumber) {
        PaymentForm response = new PaymentForm();
        List<PaymentInfo> paymentInfos = paymentInfoDao.findByIdentityNumber(identityNumber);

        if(paymentInfos.size()>0){
            PaymentDetailForm[] details=new PaymentDetailForm[paymentInfos.size()];
            for(int i=0;i<paymentInfos.size();i++){
                PaymentDetailForm detail = ConfigUtils.FormConvert(paymentInfos.get(i), PaymentDetailForm.class);
                details[i]=detail;
            }
            response.setName(paymentInfos.get(0).getName());
            response.setIdentityNumber(paymentInfos.get(0).getIdentityNumber());
            response.setPayments(details);

        }
        else {
            return null;
        }
        return response;
    }

    @Override
    public PaymentForm findByQueryForm(QueryForm queryForm) {
        return null;
    }
}
