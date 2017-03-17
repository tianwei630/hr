package com.chinaLife.hr.service.serial.impl;

import com.chinaLife.hr.service.entity.PaymentStandard;
import com.chinaLife.hr.service.serial.Serial;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.springframework.beans.BeanUtils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by tianwei on 2017/2/20.
 */
public class PaymentStandardSerial implements Serial<PaymentStandard> {
    private List<String> list=new ArrayList<String>();

    public PaymentStandardSerial() {
        list.add("jobLevel");
        list.add("jobGrade");
        list.add("yearSalaryStandard");
        list.add("basicSalary");
        list.add("postSalary");
        list.add("performanceSalary");
        list.add("preTaxSalary");
        list.add("endYearPerformanceSalary");
        list.add("laborFee");
        list.add("yearSalary");
        list.add("totalWelFare");
        list.add("welFare");
        list.add("trafficFee");
        list.add("communicationFee");
        list.add("foodFee");
        list.add("workProtectionFee");
        list.add("houseFee");
        list.add("medicalFee");
        list.add("clothesFee");
        list.add("washClothesFee");
        list.add("birthdayFee");
        list.add("totalHolidayFee");
        list.add("coolFee");

    }

    @Override
    public PaymentStandard serial(XSSFRow row) {

        PaymentStandard paymentStandard=new PaymentStandard();
        int i=1;
        for(String propertyName:list ){
            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(PaymentStandard.class, propertyName);
            try {
                if(row.getCell(i)!=null){
//                    if(pd.getName().equals("totalHolidayFee")){
//                        System.out.println("totalHolidayFee"+row.getCell(i).getStringCellValue());
//                    }

                    if(pd.getWriteMethod().getParameterTypes()[0].getSimpleName().equals("String")){
                        row.getCell(i).setCellType(CellType.STRING);
                        pd.getWriteMethod().invoke(paymentStandard,row.getCell(i).getStringCellValue());
                    }
                   if(pd.getWriteMethod().getParameterTypes()[0].getSimpleName().equals("Double")){
                       row.getCell(i).setCellType(CellType.NUMERIC);
                       pd.getWriteMethod().invoke(paymentStandard,row.getCell(i).getNumericCellValue());
                   }
//                    System.out.println("属性名称:"+pd.getName()+"      "+"参数类型："+pd.getWriteMethod().getParameterTypes()[0].getSimpleName());
//                    System.out.println("propertyName:"+pd.getName()+");

                }
                i++;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return paymentStandard;
    }
}
