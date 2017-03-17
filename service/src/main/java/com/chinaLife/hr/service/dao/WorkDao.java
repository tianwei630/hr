package com.chinaLife.hr.service.dao;

import com.chinaLife.hr.service.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


/**
 * Created by tianwei on 2017/2/9.
 */
public interface WorkDao extends JpaRepository<Work,Long> {

    List<Work> findByIdentityNumberOrderByBeginDateDesc(String identityNumber);
    List<Work> findByIdentityNumberOrderByBeginDateAsc(String identityNumber);
//    List<Work> findByIdentityNumber();
@Modifying
@Transactional
@Query("update Work w set w.endDate = :endDate where w.id =:id")
int updateEndDateById(@Param("endDate")String endDate,@Param("id")Long id);

    @Modifying
    @Transactional
    @Query("update Work w set w.endDate = :endDate where w.id =:id")
    int updateWork(@Param("endDate")String endDate,@Param("id")Long id);
}
