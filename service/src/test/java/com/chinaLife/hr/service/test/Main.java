package com.chinaLife.hr.service.test;

import com.chinaLife.hr.service.ServiceApplication;
import com.chinaLife.hr.service.dao.*;
import com.chinaLife.hr.service.domain.EducationForm;
import com.chinaLife.hr.service.domain.WorkForm;
import com.chinaLife.hr.service.entity.*;
import com.chinaLife.hr.service.service.CrudService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.net.SocketException;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

/**
 * Created by tianwei on 2017/2/9.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = ServiceApplication.class)// 指定spring-boot的启动类
public class Main {
    @Autowired
    private HrCodeDao hrCodeDao;
    @Autowired
    private EmployeeDao employeeDao;
    @Autowired
    private PaymentInfoDao paymentInfoDao;
    @Autowired
    private AccountDao accountDao;
    @Autowired
    private WorkDao workDao;
    @Autowired
    private SalaryMonthDao salaryMonthDao;
    @Autowired
    private PaymentStandardDao paymentStandardDao;
@Autowired
private CrudService<EducationForm,EducationForm> educationCrudService;
@Resource
private CrudService<Work,WorkForm> workCrudService;
    @Autowired
    private JavaMailSender mailSender;
    //    @Resource
//    private CacheService hrCodeCacheService;
    public static void main(String[] args) throws SocketException {
//       Socket socket=new Socket();
//        System.out.println(socket.getSendBufferSize());
//        Map map = new HashMap<>();
        FutureTask futureTask = new FutureTask(new Callable() {
            @Override
            public Object call() throws Exception {
                return null;
            }
        });
        futureTask.run();


    }

    @Test
    public void testSalary(){
        Employee employee = employeeDao.findByIdentityNumber("440301198811121000");
//        Employee employee=  employeeDao.findByIdentityNumberAndYearAndMonth("440301198811121000","2017","1");
        System.out.println(employee.getName());
        SalaryMonth salaryMonth = new SalaryMonth();
        salaryMonth.setName(employee.getName());
        salaryMonth.setIdentityNumber(employee.getIdentityNumber());
        salaryMonth.setComCode(employee.getComCode());
        List<PaymentInfo> paymentInfos = paymentInfoDao.findPaymentInfoByDate("2017-01-01",employee.getIdentityNumber());
        PaymentInfo paymentInfo = paymentInfos.get(0);
        PaymentStandard paymentStandard = paymentStandardDao.findByJobLevelAndJobGrade(paymentInfo.getJobLevel(), paymentInfo.getJobGrade());
        salaryMonth.setBasicSalary(Double.valueOf("1843.6"));   //基本
        salaryMonth.setPostSalary(Double.valueOf("4301.72"));     //岗位
        salaryMonth.setPerformanceSalary(Double.valueOf("768.16"));  //绩效
        salaryMonth.setOtherIncome(Double.valueOf("6129.62"));
        salaryMonth.setTotalWelFare(Double.valueOf("1100.00"));     //福利

        salaryMonth.setPersonEndowmentInsuranceDeduction(Double.valueOf("540.24"));  //养老
        salaryMonth.setPersonMedicalInsuranceDeduction(Double.valueOf("135.06"));    //医疗
        salaryMonth.setPersonUnemploymentInsuranceDeduction(Double.valueOf("10.15"));  //失业
        salaryMonth.setPersonHouseFundDeduction(Double.valueOf("518.55"));    //住房公积金
        salaryMonth.setPersonEmployerAnnuityDeduction(Double.valueOf("103.71"));  //企业年金

        salaryMonth.setHouseFundExemptionsLimit(Double.valueOf("2431"));   //住房公积金上限
        salaryMonth.setSocialEmployerAnnuityExemptions(Double.valueOf("810.36"));   //企业年金免税额


        salaryMonth.setLaborFeeDeduction(paymentStandard.getLaborFee());    //会费


//        SalaryMonth month = salaryMonthDao.save(salaryMonth);

//        SalaryMonth month = salaryMonthDao.findOne(1L);
        SalaryMonth month=salaryMonthDao.findByIdentityNumberAndYearAndMonth("440301198811121000","2017","1");
        System.out.println(month.getPreTaxSalary());
        System.out.println(month.getExemptions());
        System.out.println(month.getOtherMergeIncome());
        System.out.println(month.getTaxableIncome());
        System.out.println(month.getTaxRate());
        System.out.println(month.getRapidCalculationDeduction());
        System.out.println(month.getTaxAmount());
        System.out.println(month.getTotalDeductionAmount());
        System.out.println(month.getTakeHomeAmount());

    }
//    @Test
//    public void testWork(){
//        Work work = workDao.findByIdentityNumberOrderByBeginDateAsc("410105195712032219").get(0);
//        System.out.println("version:"+work.getVersion());
//        WorkDetialForm workDetialForm = new WorkDetialForm();
//        BeanUtils.copyProperties(work,workDetialForm);
//        System.out.println("workDetialForm version:"+workDetialForm.getVersion());
//
//    }
//    @Test
//    public void sendSimpleMail() throws Exception {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("tianwei630@126.com");
//        message.setTo("630344747@qq.com");
//        message.setSubject("主题：简单邮件");
//        message.setText("测试邮件内容");
//        mailSender.send(message);
//    }
//    @Test
//    public void testAccount(){
//        Account account = accountDao.findByIdentityNumber("410105195712032219");
//        System.out.println(account.getName());
//        accountDao.save(account);
//    }

//    @Test
//    public void testPaymentStandard(){
//        PaymentStandard paymentStandard = paymentStandardDao.findByJobLevelAndJobGrade("R025", "S001");
//        System.out.println(paymentStandard.getBasicSalary());
//
//    }
//    @Test
//    public void testEmployee(){
////        Employee employee = employeeDao.findByIdentityNumber("410105195712032219");
////        System.out.println(employee.getName());
//        LocalDate now = LocalDate.now();
//        System.out.println(now.toString());
//
//
//    }

//    @Test
//    public void testPayment(){
//        List<PaymentInfo> paymentInfos = paymentInfoDao.findPaymentInfoByDate("2017-01-01");
//        System.out.println(paymentInfos.get(0).getName());
//
//    }
//    @Test
//    public void testEducation(){
//        EducationForm response = educationCrudService.findByIdentityNumber("350481198801033061");
//
//        String json = JSON.toJSONString(response, SerializerFeature.DisableCircularReferenceDetect);
//        System.out.println(json);
//
//    }

//    @Test
//    public void testWork(){
//        WorkForm response = workCrudService.findByIdentityNumber("350481198801033061");
//
//        String json = JSON.toJSONString(response, SerializerFeature.DisableCircularReferenceDetect);
//        System.out.println(json);
//
//    }

//    @Test
//    public void test() throws IOException, InvalidFormatException {
//        File parentFile =new File("C:\\Users\\tianwei\\Desktop\\人力资源系统\\新表\\标准\\码表");
//        if(parentFile.isDirectory()){
//            File[] files = parentFile.listFiles();
//            for(File file:files){
//                XSSFWorkbook workbook = new XSSFWorkbook(file);
//                XSSFSheet sheet = workbook.getSheetAt(0);
//                System.out.println(sheet.getPhysicalNumberOfRows());
//                for(int i=1;i<sheet.getPhysicalNumberOfRows();i++){
//                    XSSFRow row = sheet.getRow(i);
//                    XSSFCell code = row.getCell(0);
//                    XSSFCell name = row.getCell(1);
//                    XSSFCell remark = row.getCell(2);
//                    HrCode hrCode = new HrCode();
//                    hrCode.setCode(code.getStringCellValue());
//                    hrCode.setName(name.getStringCellValue());
//                    hrCode.setRemark(remark.getStringCellValue());
//                    hrCodeDao.save(hrCode);
//                }
//
//            }
//        }
//    }


}
