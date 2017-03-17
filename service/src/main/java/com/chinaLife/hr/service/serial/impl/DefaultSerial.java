package com.chinaLife.hr.service.serial.impl;

import com.chinaLife.hr.service.entity.Employee;
import com.chinaLife.hr.service.serial.Serial;
import org.apache.poi.ss.formula.functions.T;
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
public  class DefaultSerial implements Serial<T> {
    private List<String> list = new ArrayList<String>();
    @Override
    public T serial(XSSFRow row) {
        T obj= new T();
        int i=1;
        for(String propertyName:list ){
            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(Employee.class, propertyName);
            try {
                row.getCell(i).setCellType(CellType.STRING);
                System.out.println(pd.getName()+":"+row.getCell(i).getStringCellValue());
                pd.getWriteMethod().invoke(obj,row.getCell(i).getStringCellValue());
                i++;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return obj;
    }
}
