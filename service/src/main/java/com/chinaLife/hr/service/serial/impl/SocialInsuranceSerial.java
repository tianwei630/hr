package com.chinaLife.hr.service.serial.impl;

import com.chinaLife.hr.service.entity.SalaryMonth;
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
public class SocialInsuranceSerial implements Serial<SalaryMonth> {
    private List<String> list=new ArrayList<String>();

    public SocialInsuranceSerial() {
        list.add("name");
        list.add("identityNumber");
        list.add("");   //应收合计
        list.add("");  //个人合计
        list.add("");  //单位合计
        list.add("");  //养老保险缴费基数
        list.add("personEndowmentInsuranceDeduction");  //养老保险个人交
        list.add("socialEndowmentInsuranceDeduction");    //养老保险单位交
        list.add("");  //医疗保险缴费基数
        list.add("personMedicalInsuranceDeduction");  // 医疗保险个人交
        list.add("socialMedicalInsuranceDeduction");  //医疗保险单位交
        list.add("");  //工伤保险缴费基数
        list.add("socialWorkInjuryInsuranceDeduction");   //工伤保险单位交
        list.add("");  //失业保险缴费基数
        list.add("personUnemploymentInsuranceDeduction");  //失业保险个人交
        list.add("socialUnemploymentInsuranceDeduction");   //失业保险单位交
        list.add("");  //生育保险缴费基数
        list.add("socialMaternityInsuranceDeduction");  //生育保险单位交

    }

    @Override
    public SalaryMonth serial(XSSFRow row) {

        SalaryMonth salaryMonth=new SalaryMonth();
        int i=2;
        for(String propertyName:list ){

            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(SalaryMonth.class, propertyName);
            if(pd!=null){
                try {
                    if(row.getCell(i)!=null){

                        if(pd.getWriteMethod().getParameterTypes()[0].getSimpleName().equals("String")){
                            row.getCell(i).setCellType(CellType.STRING);
                            pd.getWriteMethod().invoke(salaryMonth,row.getCell(i).getStringCellValue());
                        }
                        if(pd.getWriteMethod().getParameterTypes()[0].getSimpleName().equals("Double")){
                            row.getCell(i).setCellType(CellType.NUMERIC);
                            pd.getWriteMethod().invoke(salaryMonth,row.getCell(i).getNumericCellValue());
                        }

                    }

                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            }


            i++;
        }
        return salaryMonth;
    }
}
