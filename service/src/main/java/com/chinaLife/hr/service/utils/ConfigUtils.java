package com.chinaLife.hr.service.utils;

import com.chinaLife.hr.service.domain.EmployeeForm;
import com.chinaLife.hr.service.entity.Employee;
import com.chinaLife.hr.service.entity.HrCode;
import com.chinaLife.hr.service.service.impl.HrCodeCacheServiceImpl;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.BeanUtils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by tianwei on 2017/2/14.
 */
public class ConfigUtils {


    //    将前台表单对象转换为数据库对象
    public static <T> T convertForm(Object source, Class<T> clazz) {

        T dest = null;
        try {
            dest = clazz.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        PropertyDescriptor[] sourcePds = BeanUtils.getPropertyDescriptors(source.getClass());
        PropertyDescriptor[] destPds = BeanUtils.getPropertyDescriptors(clazz);
        for (PropertyDescriptor spd : sourcePds) {
            String spdName = spd.getName();
            for (PropertyDescriptor dpd : destPds) {
                if (spdName.equals(dpd.getName())) {
                    if (spd.getPropertyType() == HrCode.class) {
                        try {
                            HrCode hrCode = (HrCode) spd.getReadMethod().invoke(source);
                            if (hrCode != null) {
                                dpd.getWriteMethod().invoke(dest, hrCode.getCode());
                            }


                        } catch (InvocationTargetException e) {
                            e.printStackTrace();
                        } catch (IllegalAccessException e) {
                            e.printStackTrace();
                        }

                        break;
                    } else {
                        if (spd.getReadMethod() != null && dpd.getWriteMethod() != null) {
                            try {
                                dpd.getWriteMethod().invoke(dest, spd.getReadMethod().invoke(source));
                            } catch (IllegalAccessException e) {
                                e.printStackTrace();
                            } catch (InvocationTargetException e) {
                                e.printStackTrace();
                            }
                        }

                        break;
                    }

                }
            }

        }


        return dest;
    }

//    找出相同两个对象不同值的字段
    public List<String> findDifferentPropertyName(T obj1,T obj2){
        List<String> list = new ArrayList<String>();
        PropertyDescriptor[] pds1 = BeanUtils.getPropertyDescriptors(obj1.getClass());
        PropertyDescriptor[] pds2 = BeanUtils.getPropertyDescriptors(obj2.getClass());
        for(PropertyDescriptor pd1:pds1){
            String pd1Name = pd1.getName();
            for(int i=0;i<pds2.length;i++){
                  if(pd1Name.equals(pds2[i].getName())){
                      if(pd1.getReadMethod()!=null){
                          try {
                              String  propertyValue1 = (String)pd1.getReadMethod().invoke(obj1);
                              String  propertyValue2  =(String) pds2[i].getReadMethod().invoke(obj2);
                          } catch (IllegalAccessException e) {
                              e.printStackTrace();
                              return null;
                          } catch (InvocationTargetException e) {
                              e.printStackTrace();
                              return null;
                          }
                      }
                  }
            }
        }

        return null;
    }

    //将数据库对象转换为前台表单对象
    public static <T> T FormConvert(Object source, Class<T> clazz) {
        T dest = null;
        try {
            dest = clazz.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        PropertyDescriptor[] sourcePds = BeanUtils.getPropertyDescriptors(source.getClass());
        PropertyDescriptor[] destPds = BeanUtils.getPropertyDescriptors(clazz);
        for (PropertyDescriptor dpd : destPds) {
            String dpdName = dpd.getName();
            for (PropertyDescriptor spd : sourcePds) {
                if (dpdName.equals(spd.getName())) {
                    if (dpd.getPropertyType() == HrCode.class) {
                        try {
                            String code = (String) spd.getReadMethod().invoke(source);
                            HrCode hrcode = findByCode(code);
                            dpd.getWriteMethod().invoke(dest, hrcode);
                            break;
                        } catch (IllegalAccessException e) {
                            e.printStackTrace();

                        } catch (InvocationTargetException e) {
                            e.printStackTrace();

                        }
                        break;
                    } else {
                        if (spd.getReadMethod() != null && dpd.getWriteMethod() != null) {
                            try {
                                dpd.getWriteMethod().invoke(dest, spd.getReadMethod().invoke(source));
                            } catch (IllegalAccessException e) {
                                e.printStackTrace();
                            } catch (InvocationTargetException e) {
                                e.printStackTrace();
                            }
                            break;
                        }
                    }

                }
            }
        }
        return dest;
    }

    private static HrCode findByCode(String code) {
        List<HrCode> hrCodes = HrCodeCacheServiceImpl.hrCodes;
        for (HrCode hrcode : hrCodes) {
            if (code == null) {
                return null;
            }
            if (hrcode.getCode().equals(code)) {
                return hrcode;
            }
        }
        return null;
    }

    public static void main(String[] args) throws InvocationTargetException, IllegalAccessException, InstantiationException {
//        EmployeeRequest employeeRequest = new EmployeeRequest();
//        HrCode hrcode = new HrCode();
//        hrcode.setCode("123");
//        employeeRequest.setComCode(hrcode);
//        employeeRequest.setName("田伟");
//        Employee employee = convertForm(employeeRequest, Employee.class);
//        System.out.println(employee);
//        throw new RuntimeException("乱码");
        Employee employee = new Employee();
        employee.setComCode("A001");
        employee.setMobilePhone("15914116216");
        employee.setContractTye("N001");
        EmployeeForm employeeForm = FormConvert(employee, EmployeeForm.class);
        System.out.println(employeeForm);
    }
}
