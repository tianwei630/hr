package com.chinaLife.hr.service.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by tianwei on 2017/2/22.
 */
@Entity
@Table(indexes = {
        @Index(columnList = "identityNumber", name = "salary_identityNumberIndex",unique = true)
})
public class SalaryMonth {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @Column(nullable = true)
    private String identityNumber;
    private String year;   //年份
    private String month;   //月份
    private String comCode;
    private Double basicSalary;    //基本工资
    private Double postSalary;   //岗位工资
    private Double performanceSalary;  //绩效工资
    private Double otherIncome;      //其他工资收入
    private Double totalWelFare;   //福利合计
    @Formula("ROUND(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0),2)")
    private Double preTaxSalary;    //应发税前工资
    private Double personEndowmentInsuranceDeduction;   //扣减个人养老保险
    private Double personMedicalInsuranceDeduction;   //扣减个人医疗保险
    private Double personUnemploymentInsuranceDeduction;   //扣减个人失业保险
    private Double personHouseFundDeduction;   //扣减个人住房公积金
    private Double personEmployerAnnuityDeduction;   //扣减个人企业年金
    private Double otherDeduction;     //其他扣款项
    private Double laborFeeDeduction;    //扣减工会会费
    private Double otherMergeIncome;     //合并计税金额
    private Double overtimePay;    //加班工资
    private Double reissuePay;    //补发补扣
    @Formula("ROUND(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)"+
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)"+
            "+3500,2)")
    private Double exemptions;    //免税额
    @Formula("ROUND(" +
            "IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)"+
            "+IFNULL(other_merge_income,0)-"+
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)"+
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)"+
            "+3500)" +
            ",2)"
    )
    private Double taxableIncome;   //应纳税所得额
    @Formula("ROUND(" +
            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)"+
            "+IFNULL(other_merge_income,0)-"+
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)"+
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)"+
            "+3500))*"+

            "(CASE WHEN  "+
            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=0   THEN 0 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=1500   THEN 0.03  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=4500   THEN  0.1 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=9000   THEN 0.2  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=35000   THEN 0.25   WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=55000   THEN 0.3   WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=80000   THEN 0.35    "+

            "else 0.45 end)  "+

            "-(CASE WHEN  "+
            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=1500   THEN 0 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=4500   THEN 105  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=9000   THEN  555 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=35000   THEN 1005  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=55000   THEN 2755 WHEN   "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=80000   THEN 5505     "+

            "else 13505  end )" +
            ",2)"

    )
    private Double taxAmount;    //本月扣税

    @Formula("ROUND(" +
            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)"+
            "+IFNULL(other_merge_income,0)-"+
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)"+
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)"+
            "+3500))*"+

            "(CASE WHEN  "+
            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=0   THEN 0 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=1500   THEN 0.03  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=4500   THEN  0.1 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=9000   THEN 0.2  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=35000   THEN 0.25   WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=55000   THEN 0.3   WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=80000   THEN 0.35    "+

            "else 0.45 end)  "+

            "-(CASE WHEN  "+
            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=1500   THEN 0 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=4500   THEN 105  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=9000   THEN  555 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=35000   THEN 1005  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=55000   THEN 2755 WHEN   "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=80000   THEN 5505     "+

            "else 13505  end ) " +
            "+IFNULL(person_endowment_insurance_deduction,0)"+
            "+IFNULL(person_medical_insurance_deduction,0)"+
            "+IFNULL(person_unemployment_insurance_deduction,0)"+
            "+IFNULL(person_house_fund_deduction,0)"+
            "+IFNULL(person_employer_annuity_deduction,0)"+
            "+IFNULL(other_deduction,0)"+
            "+IFNULL(labor_fee_deduction,0)" +
            ",2)"

    )
    private Double totalDeductionAmount;    //扣款小计
    @Formula(
            "ROUND(" +
                    "IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)"+

                    "-((IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)"+
                    "+IFNULL(other_merge_income,0)-"+
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)"+
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)"+
                    "+3500))*"+

                    "(CASE WHEN  "+
                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=0   THEN 0 WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=1500   THEN 0.03  WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=4500   THEN  0.1 WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=9000   THEN 0.2  WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=35000   THEN 0.25   WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=55000   THEN 0.3   WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=80000   THEN 0.35    "+

                    "else 0.45 end)  "+

                    "-(CASE WHEN  "+
                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=1500   THEN 0 WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=4500   THEN 105  WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=9000   THEN  555 WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=35000   THEN 1005  WHEN "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=55000   THEN 2755 WHEN   "+

                    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
                    "+IFNULL(other_merge_income,0)-" +
                    "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
                    "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
                    "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
                    "+3500))<=80000   THEN 5505     "+

                    "else 13505  end ) " +
                    "+IFNULL(person_endowment_insurance_deduction,0)"+
                    "+IFNULL(person_medical_insurance_deduction,0)"+
                    "+IFNULL(person_unemployment_insurance_deduction,0)"+
                    "+IFNULL(person_house_fund_deduction,0)"+
                    "+IFNULL(person_employer_annuity_deduction,0)"+
                    "+IFNULL(other_deduction,0)"+
                    "+IFNULL(labor_fee_deduction,0))" +
                    ",2)"

    )
    private Double takeHomeAmount;    //实发金额
    private Double socialEndowmentInsuranceDeduction;   //扣减社会养老保险
    private Double socialMedicalInsuranceDeduction;   //扣减社会医疗保险
    private Double socialUnemploymentInsuranceDeduction;   //扣减社会失业保险
    private Double socialWorkInjuryInsuranceDeduction;    //扣减社会工伤保险
    private Double socialMaternityInsuranceDeduction;    //扣减社会生育保险
    private Double socialHouseFundAmount;   //单位住房公积金
    private Double socialEmployerAnnuityAmount;   //单位企业年金
    private Double socialEmployerAnnuityExemptions;   //企业年金免税额
    @Formula("ROUND(" +
            "CASE WHEN  "+
    "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=0   THEN 0 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=1500   THEN 0.03  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=4500   THEN  0.1 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=9000   THEN 0.2  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=35000   THEN 0.25   WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=55000   THEN 0.3   WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=80000   THEN 0.35    "+

            "else 45 end " +
            ",2)"
    )
    private Double taxRate;    // 税率
    @Formula("ROUND(" +
            "CASE WHEN  "+
            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=1500   THEN 0 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=4500   THEN 105  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=9000   THEN  555 WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=35000   THEN 1005  WHEN "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=55000   THEN 2755 WHEN   "+

            "(IFNULL(basic_salary,0)+IFNULL(post_salary,0)+IFNULL(performance_salary,0)+IFNULL(other_income,0)+IFNULL(total_wel_fare,0)" +
            "+IFNULL(other_merge_income,0)-" +
            "(IFNULL(person_Endowment_insurance_deduction,0)+IFNULL(person_medical_insurance_deduction,0)+IFNULL(person_unemployment_insurance_deduction,0)" +
            "+IFNULL((CASE WHEN person_house_fund_deduction>house_fund_exemptions_limit  then house_fund_exemptions_limit else person_house_fund_deduction end ),0)" +
            "+IFNULL((CASE WHEN  person_employer_annuity_deduction>social_employer_annuity_exemptions then social_employer_annuity_exemptions else  person_employer_annuity_deduction end),0)" +
            "+3500))<=80000   THEN 5505     "+

            "else 13505  end " +
            ",2)"
    )
    private Double rapidCalculationDeduction;    //速算扣除数
    private Double HouseFundExemptionsLimit;    //住房公积金上限

    private String operatorNo;
    private String operatorName;
    private Date inputDate;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateTime;

    @Version
    private int version;

    @Override
    public String toString() {
        return "SalaryMonth{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", year='" + year + '\'' +
                ", month='" + month + '\'' +
                ", comCode='" + comCode + '\'' +
                ", basicSalary='" + basicSalary + '\'' +
                ", postSalary=" + postSalary +
                ", performanceSalary=" + performanceSalary +
                ", otherIncome=" + otherIncome +
                ", totalWelFare=" + totalWelFare +
                ", preTaxSalary=" + preTaxSalary +
                ", personEndowmentInsuranceDeduction=" + personEndowmentInsuranceDeduction +
                ", personMedicalInsuranceDeduction=" + personMedicalInsuranceDeduction +
                ", personUnemploymentInsuranceDeduction=" + personUnemploymentInsuranceDeduction +
                ", personHouseFundDeduction=" + personHouseFundDeduction +
                ", personEmployerAnnuityDeduction=" + personEmployerAnnuityDeduction +
                ", otherDeduction=" + otherDeduction +
                ", laborFeeDeduction=" + laborFeeDeduction +
                ", otherMergeIncome=" + otherMergeIncome +
                ", overtimePay=" + overtimePay +
                ", reissuePay=" + reissuePay +
                ", exemptions=" + exemptions +
                ", taxableIncome=" + taxableIncome +
                ", taxAmount=" + taxAmount +
                ", totalDeductionAmount=" + totalDeductionAmount +
                ", takeHomeAmount=" + takeHomeAmount +
                ", socialEndowmentInsuranceDeduction=" + socialEndowmentInsuranceDeduction +
                ", socialMedicalInsuranceDeduction=" + socialMedicalInsuranceDeduction +
                ", socialUnemploymentInsuranceDeduction=" + socialUnemploymentInsuranceDeduction +
                ", socialWorkInjuryInsuranceDeduction=" + socialWorkInjuryInsuranceDeduction +
                ", socialMaternityInsuranceDeduction=" + socialMaternityInsuranceDeduction +
                ", socialHouseFundAmount=" + socialHouseFundAmount +
                ", socialEmployerAnnuityAmount=" + socialEmployerAnnuityAmount +
                ", socialEmployerAnnuityExemptions=" + socialEmployerAnnuityExemptions +
                ", taxRate=" + taxRate +
                ", rapidCalculationDeduction=" + rapidCalculationDeduction +
                ", HouseFundExemptionsLimit=" + HouseFundExemptionsLimit +
                ", operatorNo='" + operatorNo + '\'' +
                ", operatorName='" + operatorName + '\'' +
                ", inputDate=" + inputDate +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", version=" + version +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getComCode() {
        return comCode;
    }

    public void setComCode(String comCode) {
        this.comCode = comCode;
    }

    public Double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Double getPostSalary() {
        return postSalary;
    }

    public void setPostSalary(Double postSalary) {
        this.postSalary = postSalary;
    }

    public Double getPerformanceSalary() {
        return performanceSalary;
    }

    public void setPerformanceSalary(Double performanceSalary) {
        this.performanceSalary = performanceSalary;
    }

    public Double getOtherIncome() {
        return otherIncome;
    }

    public void setOtherIncome(Double otherIncome) {
        this.otherIncome = otherIncome;
    }

    public Double getTotalWelFare() {
        return totalWelFare;
    }

    public void setTotalWelFare(Double totalWelFare) {
        this.totalWelFare = totalWelFare;
    }

    public Double getPreTaxSalary() {
        return preTaxSalary;
    }

    public void setPreTaxSalary(Double preTaxSalary) {
        this.preTaxSalary = preTaxSalary;
    }

    public Double getPersonEndowmentInsuranceDeduction() {
        return personEndowmentInsuranceDeduction;
    }

    public void setPersonEndowmentInsuranceDeduction(Double personEndowmentInsuranceDeduction) {
        this.personEndowmentInsuranceDeduction = personEndowmentInsuranceDeduction;
    }

    public Double getPersonMedicalInsuranceDeduction() {
        return personMedicalInsuranceDeduction;
    }

    public void setPersonMedicalInsuranceDeduction(Double personMedicalInsuranceDeduction) {
        this.personMedicalInsuranceDeduction = personMedicalInsuranceDeduction;
    }

    public Double getPersonUnemploymentInsuranceDeduction() {
        return personUnemploymentInsuranceDeduction;
    }

    public void setPersonUnemploymentInsuranceDeduction(Double personUnemploymentInsuranceDeduction) {
        this.personUnemploymentInsuranceDeduction = personUnemploymentInsuranceDeduction;
    }

    public Double getPersonHouseFundDeduction() {
        return personHouseFundDeduction;
    }

    public void setPersonHouseFundDeduction(Double personHouseFundDeduction) {
        this.personHouseFundDeduction = personHouseFundDeduction;
    }

    public Double getPersonEmployerAnnuityDeduction() {
        return personEmployerAnnuityDeduction;
    }

    public void setPersonEmployerAnnuityDeduction(Double personEmployerAnnuityDeduction) {
        this.personEmployerAnnuityDeduction = personEmployerAnnuityDeduction;
    }

    public Double getOtherDeduction() {
        return otherDeduction;
    }

    public void setOtherDeduction(Double otherDeduction) {
        this.otherDeduction = otherDeduction;
    }

    public Double getLaborFeeDeduction() {
        return laborFeeDeduction;
    }

    public void setLaborFeeDeduction(Double laborFeeDeduction) {
        this.laborFeeDeduction = laborFeeDeduction;
    }

    public Double getOtherMergeIncome() {
        return otherMergeIncome;
    }

    public void setOtherMergeIncome(Double otherMergeIncome) {
        this.otherMergeIncome = otherMergeIncome;
    }

    public Double getOvertimePay() {
        return overtimePay;
    }

    public void setOvertimePay(Double overtimePay) {
        this.overtimePay = overtimePay;
    }

    public Double getReissuePay() {
        return reissuePay;
    }

    public void setReissuePay(Double reissuePay) {
        this.reissuePay = reissuePay;
    }

    public Double getExemptions() {
        return exemptions;
    }

    public void setExemptions(Double exemptions) {
        this.exemptions = exemptions;
    }

    public Double getTaxableIncome() {
        return taxableIncome;
    }

    public void setTaxableIncome(Double taxableIncome) {
        this.taxableIncome = taxableIncome;
    }

    public Double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(Double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public Double getTotalDeductionAmount() {
        return totalDeductionAmount;
    }

    public void setTotalDeductionAmount(Double totalDeductionAmount) {
        this.totalDeductionAmount = totalDeductionAmount;
    }

    public Double getTakeHomeAmount() {
        return takeHomeAmount;
    }

    public void setTakeHomeAmount(Double takeHomeAmount) {
        this.takeHomeAmount = takeHomeAmount;
    }

    public Double getSocialEndowmentInsuranceDeduction() {
        return socialEndowmentInsuranceDeduction;
    }

    public void setSocialEndowmentInsuranceDeduction(Double socialEndowmentInsuranceDeduction) {
        this.socialEndowmentInsuranceDeduction = socialEndowmentInsuranceDeduction;
    }

    public Double getSocialMedicalInsuranceDeduction() {
        return socialMedicalInsuranceDeduction;
    }

    public void setSocialMedicalInsuranceDeduction(Double socialMedicalInsuranceDeduction) {
        this.socialMedicalInsuranceDeduction = socialMedicalInsuranceDeduction;
    }

    public Double getSocialUnemploymentInsuranceDeduction() {
        return socialUnemploymentInsuranceDeduction;
    }

    public void setSocialUnemploymentInsuranceDeduction(Double socialUnemploymentInsuranceDeduction) {
        this.socialUnemploymentInsuranceDeduction = socialUnemploymentInsuranceDeduction;
    }

    public Double getSocialWorkInjuryInsuranceDeduction() {
        return socialWorkInjuryInsuranceDeduction;
    }

    public void setSocialWorkInjuryInsuranceDeduction(Double socialWorkInjuryInsuranceDeduction) {
        this.socialWorkInjuryInsuranceDeduction = socialWorkInjuryInsuranceDeduction;
    }

    public Double getSocialMaternityInsuranceDeduction() {
        return socialMaternityInsuranceDeduction;
    }

    public void setSocialMaternityInsuranceDeduction(Double socialMaternityInsuranceDeduction) {
        this.socialMaternityInsuranceDeduction = socialMaternityInsuranceDeduction;
    }

    public Double getSocialHouseFundAmount() {
        return socialHouseFundAmount;
    }

    public void setSocialHouseFundAmount(Double socialHouseFundAmount) {
        this.socialHouseFundAmount = socialHouseFundAmount;
    }

    public Double getSocialEmployerAnnuityAmount() {
        return socialEmployerAnnuityAmount;
    }

    public void setSocialEmployerAnnuityAmount(Double socialEmployerAnnuityAmount) {
        this.socialEmployerAnnuityAmount = socialEmployerAnnuityAmount;
    }

    public Double getSocialEmployerAnnuityExemptions() {
        return socialEmployerAnnuityExemptions;
    }

    public void setSocialEmployerAnnuityExemptions(Double socialEmployerAnnuityExemptions) {
        this.socialEmployerAnnuityExemptions = socialEmployerAnnuityExemptions;
    }

    public Double getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(Double taxRate) {
        this.taxRate = taxRate;
    }

    public Double getRapidCalculationDeduction() {
        return rapidCalculationDeduction;
    }

    public void setRapidCalculationDeduction(Double rapidCalculationDeduction) {
        this.rapidCalculationDeduction = rapidCalculationDeduction;
    }

    public Double getHouseFundExemptionsLimit() {
        return HouseFundExemptionsLimit;
    }

    public void setHouseFundExemptionsLimit(Double houseFundExemptionsLimit) {
        HouseFundExemptionsLimit = houseFundExemptionsLimit;
    }

    public String getOperatorNo() {
        return operatorNo;
    }

    public void setOperatorNo(String operatorNo) {
        this.operatorNo = operatorNo;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public Date getInputDate() {
        return inputDate;
    }

    public void setInputDate(Date inputDate) {
        this.inputDate = inputDate;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
