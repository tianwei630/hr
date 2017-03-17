package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.EmployeeDao;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.Employee;
import com.chinaLife.hr.service.serial.Serial;
import com.chinaLife.hr.service.serial.impl.EmployeeSerial;
import com.chinaLife.hr.service.service.ExcelService;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by tianwei on 2017/2/14.
 */
@Service("employeeExcelService")
public class EmployeeExcelServiceImpl implements ExcelService {
    @Autowired
    private EmployeeDao employeeDao;
    @Override
    @Transactional
    public ResultInfo save(XSSFSheet sheet) {
        ResultInfo resultInfo=new ResultInfo();
        resultInfo.setRequestType(Constants.REQUEST_TYPE_UPLOAD_FILE);
        int rowNmuber = sheet.getPhysicalNumberOfRows();
        for (int i = 2; i < rowNmuber; i++) {
            XSSFRow row = sheet.getRow(i);
            Serial<Employee> serial = new EmployeeSerial();
            Employee employee = serial.serial(row);
            Employee query = employeeDao.findByIdentityNumber(employee.getIdentityNumber());
            if(query!=null){
                resultInfo.setCode(Constants.ERROR_CODE);
                resultInfo.setMessage(Constants.ERROR_MSG);
                resultInfo.setErrorCode(Constants.REPEAT_CODE);
                resultInfo.setErrorMessage(Constants.REPEAT_MSG+"证件号"+query.getIdentityNumber()+"已存在");
                return resultInfo;
            }
            employeeDao.save(employee);
        }
        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage("成功");
        return resultInfo;
    }
    public static void main(String[] args){
//        System.out.println("证件号");
        throw new RuntimeException("证件号" +"已存在");
    }
}
