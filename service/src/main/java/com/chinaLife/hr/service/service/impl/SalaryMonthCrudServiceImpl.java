package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.dao.SalaryMonthDao;
import com.chinaLife.hr.service.domain.QueryForm;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.SalaryMonth;
import com.chinaLife.hr.service.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("salaryMonthCrudService")
public class SalaryMonthCrudServiceImpl implements CrudService<SalaryMonth,SalaryMonth>{
    @Autowired
    private SalaryMonthDao salaryMonthDao;
    @Override
    public ResultInfo save(SalaryMonth salaryMonth) {

        return null;
    }

    @Override
    public SalaryMonth findByIdentityNumber(String identityNumber) {
        return null;
    }

    @Override
    public SalaryMonth findByQueryForm(QueryForm queryForm) {
        String identityNumber = queryForm.getIdentityNumber();
        String year = queryForm.getYear();
        String month = queryForm.getMonth();
        SalaryMonth salaryMonth = salaryMonthDao.findByIdentityNumberAndYearAndMonth(identityNumber, year, month);
        return salaryMonth;
    }


}
