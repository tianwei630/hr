package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.EducationDao;
import com.chinaLife.hr.service.domain.EducationDetailForm;
import com.chinaLife.hr.service.domain.EducationForm;
import com.chinaLife.hr.service.domain.QueryForm;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.Education;
import com.chinaLife.hr.service.service.CrudService;
import com.chinaLife.hr.service.utils.ConfigUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("educationCrudService")
public class EducationCrudServiceImpl implements CrudService<EducationForm,EducationForm>{
    @Autowired
    private EducationDao educationDao;
    @Override
    public ResultInfo save(EducationForm educationForm) {
        ResultInfo resultInfo = new ResultInfo();
        String name = educationForm.getName();
        String identityNumber = educationForm.getIdentityNumber();
        EducationDetailForm[] educations = educationForm.getEducations();
        List<Education> educationdbs =educationDao.findByIdentityNumber(identityNumber);

//        数据修改插入
        for(EducationDetailForm detail:educations){
            Education education = ConfigUtils.convertForm(detail, Education.class);
            education.setName(name);
            education.setIdentityNumber(identityNumber);
            if(detail.getId()!=null){
                Education educationDB = educationDao.findOne(detail.getId());
                if(education.equals(educationDB)){
                    System.out.println("数据前后一致，不处理");
                }
                if(!education.equals(educationDB)){
                    System.out.println("数据修改");
                    educationDao.save(education);
                }
            }
            else {
                System.out.println("数据插入");

                educationDao.save(education);
            }

        }

//        数据删除
        for(Education educationDB:educationdbs){
            if(!exists(educationDB,educations)){
                System.out.println("数据删除");
                educationDao.delete(educationDB.getId());
            }
        }
        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage(Constants.SUCCESS_MSG);
        return resultInfo;
    }

    public boolean exists(Education education,EducationDetailForm[] details){
        boolean flag= false;
        for(int i=0;i<details.length;i++){
            if(education.getId().equals(details[i].getId())){
                return true;
            }
        }
        return flag;

    }

    @Override
    public EducationForm findByIdentityNumber(String identityNumber) {
        EducationForm response = new EducationForm();
        List<Education> educationList = educationDao.findByIdentityNumber(identityNumber);

        if(educationList.size()>0){
            EducationDetailForm[] details=new EducationDetailForm[educationList.size()];
            for(int i=0;i<educationList.size();i++){
//                EducationDetailForm detail =new EducationDetailForm();
//                BeanUtils.copyProperties(educationList.get(i),detail);
                EducationDetailForm detail = ConfigUtils.FormConvert(educationList.get(i), EducationDetailForm.class);
                details[i]=detail;
            }
            response.setName(educationList.get(0).getName());
            response.setIdentityNumber(educationList.get(0).getIdentityNumber());
            response.setEducations(details);
        }
        else {
            return null;
        }
        return response;
    }

    @Override
    public EducationForm findByQueryForm(QueryForm queryForm) {
        return null;
    }
}
