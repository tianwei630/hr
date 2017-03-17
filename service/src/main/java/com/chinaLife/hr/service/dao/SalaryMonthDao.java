package com.chinaLife.hr.service.dao;

import com.chinaLife.hr.service.entity.SalaryMonth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by tianwei on 2017/3/2.
 */
public interface SalaryMonthDao extends JpaRepository<SalaryMonth,Long> {

    SalaryMonth findByIdentityNumberAndYearAndMonth(@Param("identityNumber") String identityNumber ,@Param("year") String year,@Param("month") String month);

}
