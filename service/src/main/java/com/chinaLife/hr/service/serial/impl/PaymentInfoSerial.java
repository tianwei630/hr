package com.chinaLife.hr.service.serial.impl;

import com.chinaLife.hr.service.entity.PaymentInfo;
import com.chinaLife.hr.service.serial.Serial;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.springframework.beans.BeanUtils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by tianwei on 2017/2/8.
 */
public class PaymentInfoSerial implements Serial<PaymentInfo> {
    private List<String> list=new ArrayList<String>();

    public PaymentInfoSerial() {
        list.add("name");
        list.add("identityNumber");
        list.add("beginDate");
        list.add("endDate");
        list.add("jobLevel");
        list.add("jobGrade");
        list.add("grantRadio");
    }
    @Override
    public PaymentInfo  serial(XSSFRow row){
        PaymentInfo paymentInfo=new PaymentInfo();
        int i=1;
        for(String propertyName:list ){
            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(PaymentInfo.class, propertyName);
            try {
                if(row.getCell(i)!=null){
                    row.getCell(i).setCellType(CellType.STRING);
                    pd.getWriteMethod().invoke(paymentInfo,row.getCell(i).getStringCellValue());
                }
                i++;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return paymentInfo;

    }
}
