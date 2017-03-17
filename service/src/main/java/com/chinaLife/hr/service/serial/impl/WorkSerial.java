package com.chinaLife.hr.service.serial.impl;

import com.chinaLife.hr.service.entity.Work;
import com.chinaLife.hr.service.serial.Serial;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.springframework.beans.BeanUtils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by tianwei on 2017/2/9.
 */
public class WorkSerial implements Serial<Work> {

    private List<String> list = new ArrayList<String>();

    public WorkSerial() {
        list.add("name");
        list.add("identityNumber");
        list.add("beginDate");
        list.add("endDate");
        list.add("workCompany");
        list.add("workDepartMent");
        list.add("workPosition");

    }

    @Override
    public Work serial(XSSFRow row) {
        Work work=new Work();
        int i=1;
        for(String propertyName:list ){
            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(Work.class, propertyName);
            try {
                if(row.getCell(i)!=null){
                    System.out.println(propertyName+":"+row.getCell(i).getStringCellValue());
                    row.getCell(i).setCellType(CellType.STRING);
                    pd.getWriteMethod().invoke(work,row.getCell(i).getStringCellValue());
                }
                i++;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return work;
    }
}
