package com.chinaLife.hr.service.serial;

import org.apache.poi.xssf.usermodel.XSSFRow;

/**
 * Created by tianwei on 2017/2/9.
 */
public interface Serial<T> {
    T serial(XSSFRow row);
//    T serial(XSSFRow row,List<String> list);
}
