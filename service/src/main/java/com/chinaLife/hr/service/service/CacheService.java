package com.chinaLife.hr.service.service;

import java.util.List;

/**
 * Created by tianwei on 2017/2/15.
 */
public interface CacheService<T> {
    List<T> findAll();
}
