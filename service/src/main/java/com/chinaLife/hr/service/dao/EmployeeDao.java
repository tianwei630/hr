package com.chinaLife.hr.service.dao;

import com.chinaLife.hr.service.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by tianwei on 2017/2/9.
 */
public interface EmployeeDao extends JpaRepository<Employee,Long> {

    Employee  findByIdentityNumber(@Param("identityNumber") String identityNumber);

}
