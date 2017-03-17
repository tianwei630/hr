package com.chinaLife.hr.service.service;

import com.chinaLife.hr.service.domain.ResultInfo;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.xssf.usermodel.XSSFSheet;

/**
 * Created by tianwei on 2017/2/14.
 */
public interface ExcelService {
    ResultInfo<T> save(XSSFSheet sheet);
}
