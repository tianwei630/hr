package com.chinaLife.hr.service.dao;

import com.chinaLife.hr.service.entity.PaymentStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by tianwei on 2017/2/20.
 */
public interface PaymentStandardDao extends JpaRepository<PaymentStandard,Long> {

    PaymentStandard findByJobLevelAndJobGrade(@Param("jobLevel") String jobLevel,@Param("jobGrade") String jobGrade);
}
