package com.chinaLife.hr.service.serial.impl;

import com.chinaLife.hr.service.entity.Account;
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
public class AccountSerial implements Serial<Account>{
    private List<String> list = new ArrayList<String>();

    public AccountSerial() {
         list.add("name");
        list.add("identityNumber");
        list.add("accountNo");
        list.add("socialInsuranceNo");
        list.add("houseNo");
    }


    @Override
    public Account serial(XSSFRow row) {
        Account account =new Account();
        int i=1;
        for(String propertyName:list ){
            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(Account.class, propertyName);
            try {
                if(row.getCell(i)!=null){
                    row.getCell(i).setCellType(CellType.STRING);
                    pd.getWriteMethod().invoke(account,row.getCell(i).getStringCellValue());
                }

                i++;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return account;
    }
}
