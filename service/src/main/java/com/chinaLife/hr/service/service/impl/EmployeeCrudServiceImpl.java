package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.dao.EmployeeDao;
import com.chinaLife.hr.service.dao.EmployeeModifyDao;
import com.chinaLife.hr.service.domain.EmployeeForm;
import com.chinaLife.hr.service.domain.QueryForm;
import com.chinaLife.hr.service.domain.ResultInfo;
import com.chinaLife.hr.service.entity.Employee;
import com.chinaLife.hr.service.entity.EmployeeModify;
import com.chinaLife.hr.service.service.CrudService;
import com.chinaLife.hr.service.utils.ConfigUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

/**
 * Created by tianwei on 2017/2/14.
 */
@Service("employeeCrudService")
public class EmployeeCrudServiceImpl implements CrudService<EmployeeForm, EmployeeForm> {
    @Autowired
    private EmployeeDao employeeDao;
    @Autowired
    private EmployeeModifyDao employeeModifyDao;

    @Override
    @Transactional
    public ResultInfo save(EmployeeForm employeeForm) {
        Employee employeeDB = employeeDao.findOne(employeeForm.getId());
        Employee employee = ConfigUtils.convertForm(employeeForm, Employee.class);
        if (!employeeDB.equals(employee)) {
            List<String> differentPropertyName = employee.findDifferentPropertyName(employeeDB);
            System.out.println("不同属性：");
            saveEmployeeModify(differentPropertyName, employee, employeeDB);
            employeeDao.save(employee);
        }

        ResultInfo resultInfo = new ResultInfo();
        resultInfo.setCode(Constants.SUCCESS_CODE);
        resultInfo.setMessage(Constants.SUCCESS_MSG);
        resultInfo.setRequestType("A01");
        return resultInfo;
    }

    private void saveEmployeeModify(List<String> differentPropertyName, Employee employee, Employee employeeDB) {
        for (String propertypeName : differentPropertyName) {
//                 批改部门信息
            if (propertypeName.equals(Constants.UPDATE_COMCODE_MSG)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_COMCODE_TYPE);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getComCode());
                modify.setNewValue(employee.getComCode());
//                modify.setEffectiveDate("2017-03-01");
                employeeModifyDao.save(modify);
                continue;
            }
//            批改岗位
            if (propertypeName.equals(Constants.UPDATE_POST_MSG)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_POST_TYPE);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getPost());
                modify.setNewValue(employee.getPost());
                employeeModifyDao.save(modify);
                continue;
            }
//            批改学历
            if (propertypeName.equals(Constants.UPDATE_EDUCATION_MSG)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_EDUCATION_TYPE);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getEducation());
                modify.setNewValue(employee.getEducation());
                employeeModifyDao.save(modify);
                continue;
            }
            //            批改户籍
            if (propertypeName.equals(Constants.UPDATE_RESIDENCE_MSG)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_RESIDENCE_TYPE);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getResidence());
                modify.setNewValue(employee.getResidence());
                employeeModifyDao.save(modify);
                continue;
            }
            //            批改政治面貌
            if (propertypeName.equals(Constants.UPDATE_POLITICALSTATUS_TYPE)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_POLITICALSTATUS_MSG);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getPoliticalStatus());
                modify.setNewValue(employee.getPoliticalStatus());
                employeeModifyDao.save(modify);
                continue;
            }
            //            批改学位
            if (propertypeName.equals(Constants.UPDATE_DEGREE_TYPE)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_DEGREE_MSG);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getDegree());
                modify.setNewValue(employee.getDegree());
                employeeModifyDao.save(modify);
                continue;
            }
            //            批改二级部门
            if (propertypeName.equals(Constants.UPDATE_TEAMCODE_TYPE)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_TEAMCODE_MSG);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getTeamCode());
                modify.setNewValue(employee.getTeamCode());
                employeeModifyDao.save(modify);
                continue;
            }
            //            批改渠道
            if (propertypeName.equals(Constants.UPDATE_CHANNELTYPE_TYPE)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_CHANNELTYPE_MSG);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getChannelType());
                modify.setNewValue(employee.getChannelType());
                employeeModifyDao.save(modify);
                continue;
            }
            //            批改合同类别
            if (propertypeName.equals(Constants.UPDATE_CONTRACTTYPE_TYPE)) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_CONTRACTTYPE_MSG);
                modify.setModifyColumn(propertypeName);
                modify.setOldValue(employeeDB.getContractTye());
                modify.setNewValue(employee.getContractTye());
                employeeModifyDao.save(modify);
                continue;
            }
//         批改其他信息
            PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(Employee.class, propertypeName);
            if (pd != null) {
                EmployeeModify modify = new EmployeeModify();
                modify.setIdentityNumber(employee.getIdentityNumber());
                modify.setModifyType(Constants.UPDATE_OTHER_TYPE);
                modify.setModifyColumn(propertypeName);

                try {
                    modify.setOldValue((String) pd.getReadMethod().invoke(employeeDB));
                    modify.setNewValue((String) pd.getReadMethod().invoke(employee));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }

                employeeModifyDao.save(modify);
            }

        }

    }

    @Override
    public EmployeeForm findByIdentityNumber(String identityNumber) {
        Employee employee = employeeDao.findByIdentityNumber(identityNumber);
        if (employee != null) {
            EmployeeForm employeeForm = ConfigUtils.FormConvert(employee, EmployeeForm.class);
            return employeeForm;
        } else {
            return null;
        }

    }

    @Override
    public EmployeeForm findByQueryForm(QueryForm queryForm) {
        return null;
    }

}
