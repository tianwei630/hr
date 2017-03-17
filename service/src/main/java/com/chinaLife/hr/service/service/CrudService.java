package com.chinaLife.hr.service.service;

import com.chinaLife.hr.service.domain.QueryForm;
import com.chinaLife.hr.service.domain.ResultInfo;

/**
 * Created by tianwei on 2017/2/14.
 */
public interface CrudService<T,O> {
    ResultInfo save(T obj);
    O findByIdentityNumber(String identityNumber);
    O findByQueryForm(QueryForm queryForm);
}
