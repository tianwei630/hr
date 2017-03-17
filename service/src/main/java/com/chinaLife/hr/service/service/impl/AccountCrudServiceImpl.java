package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.AccountDao;
import com.chinaLife.hr.service.domain.QueryForm;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.Account;
import com.chinaLife.hr.service.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("accountCrudService")
public class AccountCrudServiceImpl implements CrudService<Account,Account>{
    @Autowired
    private AccountDao accountDao;
    @Override
    public ResultInfo save(Account account) {
        System.out.println("version:"+account.getVersion());
        accountDao.save(account);
        ResultInfo resultInfo = new ResultInfo();
        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage(Constants.SUCCESS_MSG);
        return resultInfo;
    }

    @Override
    public Account findByIdentityNumber(String identityNumber) {
        Account account = accountDao.findByIdentityNumber(identityNumber);
        return account;
    }

    @Override
    public Account findByQueryForm(QueryForm queryForm) {
        return null;
    }
}
