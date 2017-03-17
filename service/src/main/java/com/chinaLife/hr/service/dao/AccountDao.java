package com.chinaLife.hr.service.dao;

import com.chinaLife.hr.service.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by tianwei on 2017/2/7.
 */
public interface AccountDao extends JpaRepository<Account,Long> {

    Account findByIdentityNumber(String identityNumber);

}
