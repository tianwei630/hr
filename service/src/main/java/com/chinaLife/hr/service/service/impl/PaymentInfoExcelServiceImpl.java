package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.PaymentInfoDao;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.PaymentInfo;
import com.chinaLife.hr.service.serial.Serial;
import com.chinaLife.hr.service.serial.impl.PaymentInfoSerial;
import com.chinaLife.hr.service.service.ExcelService;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("paymentInfoExcelService")
public class PaymentInfoExcelServiceImpl implements ExcelService {
@Autowired
private PaymentInfoDao paymentInfoDao;

    @Override
    public ResultInfo<T> save(XSSFSheet sheet) {
        ResultInfo resultInfo=new ResultInfo();
        resultInfo.setRequestType(Constants.REQUEST_TYPE_UPLOAD_FILE);
        int rowNmuber = sheet.getPhysicalNumberOfRows();
        for (int i = 2; i < rowNmuber; i++) {
            XSSFRow row = sheet.getRow(i);
            Serial<PaymentInfo> serial = new PaymentInfoSerial();
            PaymentInfo paymentInfo = serial.serial(row);
            paymentInfoDao.save(paymentInfo);
        }
        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage("成功");
        return resultInfo;
    }
}

