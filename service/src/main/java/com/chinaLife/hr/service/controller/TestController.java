package com.chinaLife.hr.service.controller;

import com.chinaLife.hr.service.dao.*;
import com.chinaLife.hr.service.entity.Account;
import com.chinaLife.hr.service.entity.HrCode;
import com.chinaLife.hr.service.entity.Work;
import com.chinaLife.hr.service.serial.Serial;
import com.chinaLife.hr.service.serial.impl.WorkSerial;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

/**
 * Created by tianwei on 2017/2/7.
 */
@RestController
public class TestController {
    @Autowired
    private AccountDao accountDao;
    @Autowired
    private PaymentInfoDao paymentInfoDao;
    @Autowired
    private EmployeeDao employeeDao;
    @Autowired
    private WorkDao workDao;

    @Autowired
    private HrCodeDao hrCodeDao;

    @RequestMapping("/save")
    private String save() {
        Account account = new Account();
        account.setAccountNo("123");
        account.setHouseNo("456");
        account.setIdentityNumber("33333");
        account.setName("tianwei");
        account.setOperatorNo("55555");
        account.setOperatorName("zhangsan");
        account.setInputDate(new Date());
        Account ss = accountDao.save(account);
        System.out.println(ss.getId());
        return "success";
    }

    @RequestMapping("/get")
    public List<HrCode> test(@RequestParam("remark") String remark) {

        List<HrCode> hrcodes = hrCodeDao.findByRemark(remark);
        return hrcodes;
    }

    @RequestMapping(value = "/upload1",method = RequestMethod.POST)
    public String upload1(HttpServletRequest request  ){
//        System.out.println(file.getOriginalFilename());
//        System.out.println("filename"+file.getOriginalFilename());
        System.out.println("type"+request.getParameter("type"));

        return "success";
    }
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String upload(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        System.out.println(request.getCharacterEncoding());

        System.out.println(file.getClass());
        if (!file.isEmpty()) {
            String filename = file.getOriginalFilename();
            System.out.println(filename);
            BufferedOutputStream out = null;
            InputStream is = null;
            try {
                is = file.getInputStream();
                XSSFWorkbook workBook = new XSSFWorkbook(is);
                XSSFSheet sheet = workBook.getSheetAt(0);
                int rowNmuber = sheet.getPhysicalNumberOfRows();

                for (int i = 2; i < rowNmuber; i++) {
                    XSSFRow row = sheet.getRow(i);
                    Serial<Work> serial = new WorkSerial();
                    Work work = serial.serial(row);
                    List<Work> works = workDao.findByIdentityNumberOrderByBeginDateDesc(work.getIdentityNumber());
                    if (works != null && works.size() > 0) {
                        Work oldWork = works.get(0);
                        System.out.println("endDate:" + oldWork.getEndDate());
                        if (oldWork.getEndDate() == null || "".equals(oldWork.getEndDate())) {
                            workDao.updateEndDateById(work.getBeginDate(), oldWork.getId());
                        }

                    }
                    Work save = workDao.save(work);
                    System.out.println(save.getId());
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
        return "success";
    }
}
