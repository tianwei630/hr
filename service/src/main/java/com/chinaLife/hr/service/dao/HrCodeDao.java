package com.chinaLife.hr.service.dao;

import com.chinaLife.hr.service.entity.HrCode;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by tianwei on 2017/2/10.
 */
@CacheConfig(cacheNames = "hr")
public interface HrCodeDao extends JpaRepository<HrCode,Long> {
      @Cacheable(key = "#p0")
    List<HrCode>  findByRemark(@Param("remark") String remark);
}
