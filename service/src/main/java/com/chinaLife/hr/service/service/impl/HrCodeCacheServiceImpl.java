package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.dao.HrCodeDao;
import com.chinaLife.hr.service.entity.HrCode;
import com.chinaLife.hr.service.service.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tianwei on 2017/2/15.
 */
@Service("hrCodeCacheService")
public class HrCodeCacheServiceImpl implements CacheService<HrCode> {
    public static List<HrCode> hrCodes = new ArrayList<HrCode>();
    @Autowired
    private HrCodeDao hrCodeDao;

    @Override
    public List<HrCode> findAll() {
        hrCodes = hrCodeDao.findAll();
        return hrCodes;
    }
}
