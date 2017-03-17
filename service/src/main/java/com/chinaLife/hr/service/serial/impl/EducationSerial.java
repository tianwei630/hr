package com.chinaLife.hr.service.serial.impl;

import com.chinaLife.hr.service.entity.Education;
import com.chinaLife.hr.service.serial.Serial;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.springframework.beans.BeanUtils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by tianwei on 2017/2/16.
 */
public class EducationSerial implements Serial<Education> {
    private List<String> list=new ArrayList<String>();
    public EducationSerial() {
        list.add("name");
        list.add("identityNumber");
        list.add("beginDate");
        list.add("endDate");
        list.add("graduateSchool");
        list.add("education");
        list.add("degree");
        list.add("major");
        list.add("fullTimeFlag");
    }

    @Override
    public Education serial(XSSFRow row) {
        Education education=new Education();
        int i=1;
        for(String propertyName:list ){
            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(Education.class, propertyName);
            try {
                if(row.getCell(i)!=null){
                    row.getCell(i).setCellType(CellType.STRING);
                    pd.getWriteMethod().invoke(education,row.getCell(i).getStringCellValue());
                }
                i++;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return education;
    }
}
