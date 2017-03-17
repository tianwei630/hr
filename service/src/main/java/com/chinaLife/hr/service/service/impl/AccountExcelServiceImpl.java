package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.AccountDao;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.Account;
import com.chinaLife.hr.service.serial.Serial;
import com.chinaLife.hr.service.serial.impl.AccountSerial;
import com.chinaLife.hr.service.service.ExcelService;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("accountExcelService")
public class AccountExcelServiceImpl implements ExcelService {
    @Autowired
    private AccountDao accountDao;

    @Override
    public ResultInfo<T> save(XSSFSheet sheet) {
        ResultInfo resultInfo = new ResultInfo();
        resultInfo.setRequestType(Constants.REQUEST_TYPE_UPLOAD_FILE);
        int rowNmuber = sheet.getPhysicalNumberOfRows();
        for (int i = 2; i < rowNmuber; i++) {
            XSSFRow row = sheet.getRow(i);
            Serial<Account> serial = new AccountSerial();
            Account account = serial.serial(row);
            Account query = accountDao.findByIdentityNumber(account.getIdentityNumber());
            if (query != null) {
                resultInfo.setCode(Constants.ERROR_CODE);
                resultInfo.setMessage(Constants.ERROR_MSG);
                resultInfo.setErrorCode(Constants.REPEAT_CODE);
                resultInfo.setMessage(Constants.REPEAT_MSG+":证件号"+query.getIdentityNumber()+"已存在");
                return resultInfo;
            }
            accountDao.save(account);

        }
        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage("成功");
        return resultInfo;
    }
}

