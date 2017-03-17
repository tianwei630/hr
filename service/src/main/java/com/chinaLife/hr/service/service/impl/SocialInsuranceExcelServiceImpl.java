package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.SalaryMonthDao;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.SalaryMonth;
import com.chinaLife.hr.service.serial.Serial;
import com.chinaLife.hr.service.serial.impl.SocialInsuranceSerial;
import com.chinaLife.hr.service.service.ExcelService;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("socialInsuranceExcelService")
public class SocialInsuranceExcelServiceImpl implements ExcelService {
    @Autowired
    private SalaryMonthDao salaryMonthDao;

    @Override
    @Transactional
    public ResultInfo<T> save(XSSFSheet sheet) {
        ResultInfo resultInfo = new ResultInfo();
        resultInfo.setRequestType(Constants.REQUEST_TYPE_UPLOAD_FILE);
        int rowNmuber = sheet.getPhysicalNumberOfRows();
        String importDate = importDate(sheet);

        for (int i = 5; i < rowNmuber; i++) {
            XSSFRow row = sheet.getRow(i);
            Serial<SalaryMonth> serial = new SocialInsuranceSerial();
            SalaryMonth salaryMonth = serial.serial(row);
            salaryMonth.setYear(importDate.substring(0, 4));
            salaryMonth.setMonth(importDate.substring(4, importDate.length()));
            System.out.println(salaryMonth);
//            salaryMonthDao.save(salaryMonth);
            SalaryMonth salaryMonthDB = salaryMonthDao.findByIdentityNumberAndYearAndMonth(salaryMonth.getIdentityNumber(), salaryMonth.getYear(), salaryMonth.getMonth());
            if(salaryMonthDB!=null){
                SalaryMonth salaryMonth1 = assignToDB(salaryMonth, salaryMonthDB);
                System.out.println(salaryMonth1);
            }
        }
        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage("成功");
        return resultInfo;
    }


    public String importDate(XSSFSheet sheet) {
        XSSFRow dateRow = sheet.getRow(2);
        XSSFCell dateCell = dateRow.getCell(0);
        String dateCellStringCellValue = dateCell.getStringCellValue();
        String regEx = "[^0-9]";
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(dateCellStringCellValue);
        String trim = m.replaceAll("").trim();
        return trim;
    }

    private  SalaryMonth assignToDB(SalaryMonth salaryMonth,SalaryMonth salaryMonthDB){
        PropertyDescriptor[] pds = BeanUtils.getPropertyDescriptors(SalaryMonth.class);
        for(PropertyDescriptor pd:pds){
            if(pd.getReadMethod()!=null&&pd.getWriteMethod()!=null){
                try {
                    if(pd.getReadMethod().invoke(salaryMonth)!=null&&pd.getReadMethod().invoke(salaryMonthDB)==null){
                               pd.getWriteMethod().invoke(salaryMonthDB,pd.getReadMethod().invoke(salaryMonth));
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            }
        }
        return salaryMonthDB;
    }
}

