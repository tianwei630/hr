package com.chinaLife.hr.service.beanPost;

import com.chinaLife.hr.service.service.impl.HrCodeCacheServiceImpl;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

/**
 * Created by tianwei on 2017/2/15.
 */
public class CacheBeanPost implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object o, String s) throws BeansException {

        return o;
    }

    @Override
    public Object postProcessAfterInitialization(Object o, String s) throws BeansException {
         if(o instanceof HrCodeCacheServiceImpl){
             ((HrCodeCacheServiceImpl)o).findAll();
         }
        return o;
    }
}
