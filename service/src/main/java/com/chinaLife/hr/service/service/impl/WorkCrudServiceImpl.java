package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.WorkDao;
import com.chinaLife.hr.service.domain.QueryForm;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.domain.WorkDetialForm;
import com.chinaLife.hr.service.domain.WorkForm;
import com.chinaLife.hr.service.entity.Work;
import com.chinaLife.hr.service.service.CrudService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by tianwei on 2017/2/16.
 */
@Service("workCrudService")
public class WorkCrudServiceImpl implements CrudService<WorkForm, WorkForm> {
    @Autowired
    private WorkDao workDao;

    @Override
    @Transactional
    public ResultInfo save(WorkForm workForm) {
        ResultInfo resultInfo = new ResultInfo();
        String name = workForm.getName();
        String identityNumber = workForm.getIdentityNumber();
        WorkDetialForm[] works = workForm.getWorks();
        List<Work> workdbs = workDao.findByIdentityNumberOrderByBeginDateAsc(identityNumber);

//           数据修改插入
        for(WorkDetialForm detail:works){
            Work work = new Work();
            BeanUtils.copyProperties(detail,work);
            work.setName(name);
            work.setIdentityNumber(identityNumber);
            if(detail.getId()!=null){
                Work workDB = workDao.findOne(detail.getId());
                if(work.equals(workDB)){
                    System.out.println("数据前后一致，不处理");
                }
                if(!work.equals(workDB)){
                    System.out.println("数据修改");
//                    work.setVersion(workDB.getVersion());
                    workDao.save(work);
                }
            }
            else {
                System.out.println("数据插入");

                workDao.save(work);
            }

        }

//        数据删除
        for(Work workDB:workdbs){
               if(!exists(workDB,works)){
                   System.out.println("数据删除");
                   workDao.delete(workDB.getId());
               }
        }

        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage(Constants.SUCCESS_MSG);
        return resultInfo;
    }

    public boolean exists(Work work,WorkDetialForm[] details){
        boolean flag= false;
        for(int i=0;i<details.length;i++){
            if(work.getId().equals(details[i].getId())){
                return true;
            }
        }
        return flag;

    }
    @Override
    public WorkForm findByIdentityNumber(String identityNumber) {
        WorkForm response = new WorkForm();
        List<Work> workList = workDao.findByIdentityNumberOrderByBeginDateAsc(identityNumber);

        if (workList.size() > 0) {
            WorkDetialForm[] details = new WorkDetialForm[workList.size()];
            for (int i = 0; i < workList.size(); i++) {
//                WorkDetialForm detail = ConfigUtils.FormConvert(workList.get(i), EducationDetailForm.class);
                WorkDetialForm detail = new WorkDetialForm();
                BeanUtils.copyProperties(workList.get(i), detail);
                details[i] = detail;
            }
            response.setName(workList.get(0).getName());
            response.setIdentityNumber(workList.get(0).getIdentityNumber());
            response.setWorks(details);
            return response;
        } else {
            return null;
        }

    }

    @Override
    public WorkForm findByQueryForm(QueryForm queryForm) {
        return null;
    }
}
