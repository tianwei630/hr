package com.chinaLife.hr.service.controller;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.domain.*;
import com.chinaLife.hr.service.entity.Account;
import com.chinaLife.hr.service.entity.SalaryMonth;
import com.chinaLife.hr.service.service.CrudService;
import com.chinaLife.hr.service.service.ExcelService;
import com.chinaLife.hr.service.service.impl.GenerateEmployeePDFServiceImpl;
import com.chinaLife.hr.service.service.impl.PaymentStandardCrudServiceImpl;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by tianwei on 2017/2/14.
 */
@RestController
public class JsonController {
    @Resource
    private ExcelService employeeExcelService;
    @Resource
    private CrudService<EmployeeForm, EmployeeForm> employeeCrudService;
    @Resource
    private CrudService<EducationForm, EducationForm> educationCrudService;
    @Resource
    private CrudService<WorkForm, WorkForm> workCrudService;
    @Resource
    private CrudService<Account, Account> accountCrudService;
    @Resource
    private CrudService<PaymentForm, PaymentForm> paymentCrudService;
    @Resource
    private CrudService<SalaryMonth,SalaryMonth> salaryMonthCrudService;
    @Autowired
    private PaymentStandardCrudServiceImpl paymentStandardCrudService;

    @Resource
    private ExcelService educationExcelService;
    @Resource
    private ExcelService accountExcelService;
    @Resource
    private ExcelService workExcelService;
    @Resource
    private ExcelService paymentStandardExcelService;
    @Resource
    private ExcelService paymentInfoExcelService;
    @Resource
    private ExcelService socialInsuranceExcelService;
    @Autowired
    private GenerateEmployeePDFServiceImpl pdfService;


    //查找员工信息
    @RequestMapping(value = "/findEmployee", method = RequestMethod.GET)
    public EmployeeForm findEmployee(@RequestParam("identityNumber") String identityNumber) {
        EmployeeForm employeeForm = employeeCrudService.findByIdentityNumber(identityNumber);
        System.out.println(employeeForm);
        return employeeForm;

    }

    //保存员工
    @RequestMapping(value = "/saveEmployee", method = RequestMethod.POST)
    public ResultInfo saveEmployee(@RequestBody EmployeeForm employeeForm) {

        ResultInfo resultInfo = employeeCrudService.save(employeeForm);
        return resultInfo;
    }

    //查找教育信息
    @RequestMapping(value = "/findEducation", method = RequestMethod.GET)
    public EducationForm findEducation(@RequestParam("identityNumber") String identityNumber) {
        EducationForm educationForm = educationCrudService.findByIdentityNumber(identityNumber);
        System.out.println(educationForm);
        return educationForm;

    }

    //保存教育信息
    @RequestMapping(value = "/saveEducation", method = RequestMethod.POST)
    public ResultInfo saveEducation(@RequestBody EducationForm educationForm) {

        System.out.println(educationForm);
        ResultInfo resultInfo = educationCrudService.save(educationForm);
        return resultInfo;

    }

    //查找账号信息
    @RequestMapping(value = "/findAccount", method = RequestMethod.GET)
    public Account findAccount(@RequestParam("identityNumber") String identityNumber) {
        Account account = accountCrudService.findByIdentityNumber(identityNumber);
        System.out.println(account);
        return account;

    }

    //保存账号信息
    @RequestMapping(value = "/saveAccount", method = RequestMethod.POST)
    public ResultInfo saveAccount(@RequestBody Account account) {
        ResultInfo resultInfo = accountCrudService.save(account);
        return resultInfo;

    }

    //查找工作信息
    @RequestMapping(value = "/findWork", method = RequestMethod.GET)
    public WorkForm findWork(@RequestParam("identityNumber") String identityNumber) {
        WorkForm workForm = workCrudService.findByIdentityNumber(identityNumber);
        System.out.println(workForm);
        return workForm;

    }

    //保存工作信息
    @RequestMapping(value = "/saveWork", method = RequestMethod.POST)
    public ResultInfo saveWork(@RequestBody WorkForm workForm) {
        System.out.println(workForm);
        ResultInfo resultInfo = workCrudService.save(workForm);
        return resultInfo;

    }

    //查找薪酬信息
    @RequestMapping(value = "/findPayment", method = RequestMethod.GET)
    public PaymentForm findPayment(@RequestParam("identityNumber") String identityNumber) {
        PaymentForm paymentForm = paymentCrudService.findByIdentityNumber(identityNumber);

        return paymentForm;

    }

    //保存薪酬信息
    @RequestMapping(value = "/savePayment", method = RequestMethod.POST)
    public ResultInfo savePayment(@RequestBody PaymentForm paymentForm) {
        ResultInfo resultInfo = paymentCrudService.save(paymentForm);
        return resultInfo;

    }

    //查找薪酬标准
    @RequestMapping(value = "/findPaymentStandard", method = RequestMethod.GET)
    public PaymentStandardForm findPaymentStandard(@RequestParam("jobLevel") String jobLevel, @RequestParam("jobGrade") String jobGrade) {
//        PaymentResponse paymentResponse = paymentCrudService.findByIdentityNumber(identityNumber);
//        System.out.println(paymentResponse);
//        return paymentResponse;
        PaymentStandardForm paymentStandardForm = paymentStandardCrudService.findPaymentStandard(jobLevel, jobGrade);
        return paymentStandardForm;
    }

    //查找月工资
    @RequestMapping(value = "/findSalaryMonth", method = RequestMethod.POST)
    public SalaryMonth findSalaryMonth(@RequestBody QueryForm queryForm) {
        SalaryMonth salaryMonth = salaryMonthCrudService.findByQueryForm(queryForm);
        return salaryMonth;
    }

    //	直接生成pdf
    @RequestMapping(value = "/generatePDF", method = RequestMethod.POST)
    public void generatePDF(@RequestBody MainInfoForm mainInfoForm, HttpServletResponse response) {
        System.out.println(mainInfoForm);
//		ByteArrayInputStream bis ;
//	Map<String,byte[]> map=new HashMap<String,byte[]>();
//
//	map=webUtils.submit(pdfInfo,id,map);
//	byte[] byteses = map.get(demandNo);
//	map.clear();
//	try {
//		ServletOutputStream outputStream = response.getOutputStream();
//		outputStream.write(byteses);
//		outputStream.flush();
//	} catch (IOException e) {
//		e.printStackTrace();
//	}
//	concurrentHashMap.put(demandNo,byteses);

//    response.setStatus(404);
        byte[] bytes = pdfService.generatePDF(mainInfoForm);
        try {
            ServletOutputStream outputStream = response.getOutputStream();
            outputStream.write(bytes);
            outputStream.flush();
        } catch (IOException e) {
            response.setStatus(460);
            e.printStackTrace();
        }
    }

    //上传文件
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public ResultInfo upload(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        ResultInfo resultInfo = new ResultInfo();
        int type = Integer.parseInt(request.getParameter("type"));

        if (!file.isEmpty()) {

            InputStream is = null;
            try {
                is = file.getInputStream();
                XSSFWorkbook workBook = new XSSFWorkbook(is);
                XSSFSheet sheet = workBook.getSheetAt(0);
                switch (type) {
                    case Constants.UPLOAD_EMPLOYEE:
                        resultInfo = employeeExcelService.save(sheet);
                        break;
                    case Constants.UPLOAD_EDUCATION:
                        resultInfo = educationExcelService.save(sheet);
                        break;
                    case Constants.UPLOAD_ACCOUNT:
                        resultInfo = accountExcelService.save(sheet);
                        break;
                    case Constants.UPLOAD_WORK:
                        resultInfo = workExcelService.save(sheet);
                        break;
                    case Constants.UPLOAD_PAYMENT:
                        resultInfo = paymentInfoExcelService.save(sheet);
                        break;
                    case Constants.UPLOAD_PAYMENT_STANDARD:
                        resultInfo = paymentStandardExcelService.save(sheet);
                        break;
                    case Constants.UPLOAD_SOCIAL_INSURANCE:
                        resultInfo = socialInsuranceExcelService.save(sheet);
                        break;

                    default:
                        resultInfo.setCode(Constants.ERROR_CODE);
                        resultInfo.setMessage(Constants.ERROR_MSG);
                        resultInfo.setErrorCode(Constants.UPLOAD_TYPE_MIS_MATCH_CODE);
                        resultInfo.setErrorMessage(Constants.UPLOAD_TYPE_MIS_MATCH_MSG);
                        return resultInfo;
                }


            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
        return resultInfo;
    }

    public static void main(String[] args) {

    }
}
