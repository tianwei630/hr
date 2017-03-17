package com.chinaLife.hr.service.dao;

import com.chinaLife.hr.service.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by tianwei on 2017/2/8.
 */
public interface PaymentInfoDao extends JpaRepository<PaymentInfo,Long> {
     List<PaymentInfo>  findByIdentityNumber(String identityNumber);

     @Query("select p from PaymentInfo p where identityNumber=:identityNumber and  :date between beginDate and endDate")
      List<PaymentInfo>  findPaymentInfoByDate(@Param("date") String date,@Param("identityNumber") String identityNumber);
}
