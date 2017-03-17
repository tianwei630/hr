package com.chinaLife.hr.service.scheduled;

import com.chinaLife.hr.service.dao.EmployeeDao;
import com.chinaLife.hr.service.dao.PaymentInfoDao;
import com.chinaLife.hr.service.dao.PaymentStandardDao;
import com.chinaLife.hr.service.dao.SalaryMonthDao;
import com.chinaLife.hr.service.entity.Employee;
import com.chinaLife.hr.service.entity.PaymentInfo;
import com.chinaLife.hr.service.entity.PaymentStandard;
import com.chinaLife.hr.service.entity.SalaryMonth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by tianwei on 2017/3/10.
 */
//每月执行一次工资计算
    @Component
public class ScheduledSalaryMonth {
@Autowired
  private   EmployeeDao employeeDao;
    @Autowired
    private PaymentInfoDao paymentInfoDao;
    @Autowired
    private PaymentStandardDao paymentStandardDao;
    @Autowired
    private SalaryMonthDao salaryMonthDao;
    /*
    * cron表达式  顺序为 秒 分 时  天(1-30) 月  天(周一-周日)
    * */
    @Scheduled(cron = "0 00 07 1 * ?")
    public void reportCurrentTime() {
        System.out.println("现在时间：" + LocalDateTime.now());
        System.out.println("开始计算工资");
        List<Employee> employees = employeeDao.findAll();
        for(Employee employee:employees){
            SalaryMonth salaryMonth = new SalaryMonth();
            salaryMonth.setYear(String.valueOf(LocalDateTime.now().getYear()));
            salaryMonth.setMonth(String.valueOf(LocalDateTime.now().getMonthValue()));
            salaryMonth.setName(employee.getName());
            salaryMonth.setIdentityNumber(employee.getIdentityNumber());
            salaryMonth.setComCode(employee.getComCode());
            List<PaymentInfo> paymentInfos = paymentInfoDao.findPaymentInfoByDate(  LocalDate.now().toString(),employee.getIdentityNumber());
            if(paymentInfos.size()>1){
                System.out.println(employee.getIdentityNumber()+"  同一时间存在多条薪酬标准");
                return;
            }
            PaymentInfo paymentInfo = paymentInfos.get(0);
            PaymentStandard paymentStandard = paymentStandardDao.findByJobLevelAndJobGrade(paymentInfo.getJobLevel(), paymentInfo.getJobGrade());
            salaryMonth.setBasicSalary(paymentStandard.getBasicSalary());   //基本
            salaryMonth.setPostSalary(paymentStandard.getPostSalary());     //岗位
            salaryMonth.setPerformanceSalary(paymentStandard.getPerformanceSalary());  //绩效
            salaryMonth.setTotalWelFare(paymentStandard.getWelFare());     //福利
            salaryMonthDao.save(salaryMonth);

        }
//        Employee employee=  employeeDao.findByIdentityNumberAndYearAndMonth("440301198811121000","2017","1");
        System.out.println("工资计算完成");
        System.out.println("现在时间:"+LocalDateTime.now());


    }
    public static void main(String[] args){
        String a="台帐年月：2016年9月";
        String regEx="[^0-9]";
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(a);
        String trim = m.replaceAll("").trim();
        System.out.println(trim.substring(0,4));
        System.out.println(trim.substring(4,5));
    }
}
