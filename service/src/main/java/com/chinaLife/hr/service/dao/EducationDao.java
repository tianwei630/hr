package com.chinaLife.hr.service.dao;

import com.chinaLife.hr.service.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by tianwei on 2017/2/9.
 */
public interface EducationDao extends JpaRepository<Education,Long> {

    List<Education>  findByIdentityNumber(String identityNumber);
}
