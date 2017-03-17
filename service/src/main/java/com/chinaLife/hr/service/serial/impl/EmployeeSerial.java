package com.chinaLife.hr.service.serial.impl;

import com.chinaLife.hr.service.entity.Employee;
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
public class EmployeeSerial implements Serial<Employee> {
    private List<String> list=new ArrayList<String>();

    public EmployeeSerial() {
        list.add("name");
        list.add("sapNo");
        list.add("identityNumber");
        list.add("comCode");
        list.add("teamCode");
        list.add("channelType");
        list.add("personType");
        list.add("position");
        list.add("post");
        list.add("postType");
        list.add("sex");
        list.add("birthday");
        list.add("residence");
        list.add("nativePlace");
        list.add("nation");
        list.add("enterDate");
        list.add("leaveDate");
        list.add("politicalStatus");
        list.add("joinGCDDate");
        list.add("education");
        list.add("degree");
        list.add("major");
        list.add("fullTimeFlag");
        list.add("graduateSchool");
        list.add("professionalName");
        list.add("professionalLevel");
        list.add("contractTye");
        list.add("maritalStatus");
        list.add("mobilePhone");
        list.add("status");
    }

    @Override
    public Employee serial(XSSFRow row) {
        Employee employee=new Employee();
        int i=1;
        for(String propertyName:list ){
            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(Employee.class, propertyName);
            try {
                if(row.getCell(i)!=null){
                    row.getCell(i).setCellType(CellType.STRING);
                    System.out.println(pd.getName()+":"+row.getCell(i).getStringCellValue());
                    pd.getWriteMethod().invoke(employee,row.getCell(i).getStringCellValue());
                }
                i++;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return employee;
    }
}
