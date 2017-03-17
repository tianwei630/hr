package com.chinaLife.hr.service.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by tianwei on 2017/2/7.
 */
@Entity
@Table(indexes = {
        @Index(name="employee_sapNoIndex",columnList = "sapNo",unique = true),
        @Index(name="employee_identityNumberIndex",columnList = "identityNumber",unique = true)
})
public class Employee {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String sapNo;
    @Column(nullable = false)
    private String identityNumber;
    private String comCode;   //部门
    private String teamCode;  //二级部门
    private String channelType;  //渠道
    private String personType;   //人员清分
    private String position;    //职务
    private String post;     //岗位
    private String postType;  //岗位类别
    private String sex;     //性别
    private String birthday; //出生日期
    private String residence;  //户籍
    private String nativePlace;  //籍贯
    private String nation;  //民族
    private String enterDate;  //入司时间
    private String leaveDate;  //离司时间
    private String  politicalStatus;  //政治面貌
    private String joinGCDDate;   //入党时间
    private String education;   //学历
    private String degree;    //学位
    private String major;    //专业
    private String fullTimeFlag;  //是否全日制
    private String graduateSchool;  //毕业院校
    private String professionalName;  //专业技术职称
    private  String professionalLevel;  //职称级别
    private String contractTye;  //合同类型
    private String maritalStatus;  //婚姻状况
    private String mobilePhone;
    private String status;  //是否在司
    private String remark1;
    private String remark2;
    private String remark3;
    private String remark4;
    private String remark5;
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
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sapNo='" + sapNo + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", comCode='" + comCode + '\'' +
                ", teamCode='" + teamCode + '\'' +
                ", channelType='" + channelType + '\'' +
                ", personType='" + personType + '\'' +
                ", position='" + position + '\'' +
                ", post='" + post + '\'' +
                ", postType='" + postType + '\'' +
                ", sex='" + sex + '\'' +
                ", birthday='" + birthday + '\'' +
                ", residence='" + residence + '\'' +
                ", nativePlace='" + nativePlace + '\'' +
                ", nation='" + nation + '\'' +
                ", enterDate='" + enterDate + '\'' +
                ", leaveDate='" + leaveDate + '\'' +
                ", politicalStatus='" + politicalStatus + '\'' +
                ", joinGCDDate='" + joinGCDDate + '\'' +
                ", education='" + education + '\'' +
                ", degree='" + degree + '\'' +
                ", major='" + major + '\'' +
                ", fullTimeFlag='" + fullTimeFlag + '\'' +
                ", graduateSchool='" + graduateSchool + '\'' +
                ", professionalName='" + professionalName + '\'' +
                ", professionalLevel='" + professionalLevel + '\'' +
                ", contractTye='" + contractTye + '\'' +
                ", maritalStatus='" + maritalStatus + '\'' +
                ", mobilePhone='" + mobilePhone + '\'' +
                ", status='" + status + '\'' +
                ", remark1='" + remark1 + '\'' +
                ", remark2='" + remark2 + '\'' +
                ", remark3='" + remark3 + '\'' +
                ", remark4='" + remark4 + '\'' +
                ", remark5='" + remark5 + '\'' +
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

    public String getSapNo() {
        return sapNo;
    }

    public void setSapNo(String sapNo) {
        this.sapNo = sapNo;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public String getComCode() {
        return comCode;
    }

    public void setComCode(String comCode) {
        this.comCode = comCode;
    }

    public String getTeamCode() {
        return teamCode;
    }

    public void setTeamCode(String teamCode) {
        this.teamCode = teamCode;
    }

    public String getChannelType() {
        return channelType;
    }

    public void setChannelType(String channelType) {
        this.channelType = channelType;
    }

    public String getPersonType() {
        return personType;
    }

    public void setPersonType(String personType) {
        this.personType = personType;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public String getPostType() {
        return postType;
    }

    public void setPostType(String postType) {
        this.postType = postType;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getResidence() {
        return residence;
    }

    public void setResidence(String residence) {
        this.residence = residence;
    }

    public String getNativePlace() {
        return nativePlace;
    }

    public void setNativePlace(String nativePlace) {
        this.nativePlace = nativePlace;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getEnterDate() {
        return enterDate;
    }

    public void setEnterDate(String enterDate) {
        this.enterDate = enterDate;
    }

    public String getLeaveDate() {
        return leaveDate;
    }

    public void setLeaveDate(String leaveDate) {
        this.leaveDate = leaveDate;
    }

    public String getPoliticalStatus() {
        return politicalStatus;
    }

    public void setPoliticalStatus(String politicalStatus) {
        this.politicalStatus = politicalStatus;
    }

    public String getJoinGCDDate() {
        return joinGCDDate;
    }

    public void setJoinGCDDate(String joinGCDDate) {
        this.joinGCDDate = joinGCDDate;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getProfessionalName() {
        return professionalName;
    }

    public void setProfessionalName(String professionalName) {
        this.professionalName = professionalName;
    }

    public String getProfessionalLevel() {
        return professionalLevel;
    }

    public void setProfessionalLevel(String professionalLevel) {
        this.professionalLevel = professionalLevel;
    }

    public String getContractTye() {
        return contractTye;
    }

    public void setContractTye(String contractTye) {
        this.contractTye = contractTye;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemark1() {
        return remark1;
    }

    public void setRemark1(String remark1) {
        this.remark1 = remark1;
    }

    public String getRemark2() {
        return remark2;
    }

    public void setRemark2(String remark2) {
        this.remark2 = remark2;
    }

    public String getRemark3() {
        return remark3;
    }

    public void setRemark3(String remark3) {
        this.remark3 = remark3;
    }

    public String getRemark4() {
        return remark4;
    }

    public void setRemark4(String remark4) {
        this.remark4 = remark4;
    }

    public String getRemark5() {
        return remark5;
    }

    public void setRemark5(String remark5) {
        this.remark5 = remark5;
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

    public String getFullTimeFlag() {
        return fullTimeFlag;
    }

    public void setFullTimeFlag(String fullTimeFlag) {
        this.fullTimeFlag = fullTimeFlag;
    }

    public String getGraduateSchool() {
        return graduateSchool;
    }

    public void setGraduateSchool(String graduateSchool) {
        this.graduateSchool = graduateSchool;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Employee employee = (Employee) o;

        if (id != null ? !id.equals(employee.id) : employee.id != null) return false;
        if (name != null ? !name.equals(employee.name) : employee.name != null) return false;
        if (sapNo != null ? !sapNo.equals(employee.sapNo) : employee.sapNo != null) return false;
        if (identityNumber != null ? !identityNumber.equals(employee.identityNumber) : employee.identityNumber != null)
            return false;
        if (comCode != null ? !comCode.equals(employee.comCode) : employee.comCode != null) return false;
        if (teamCode != null ? !teamCode.equals(employee.teamCode) : employee.teamCode != null) return false;
        if (channelType != null ? !channelType.equals(employee.channelType) : employee.channelType != null)
            return false;
        if (personType != null ? !personType.equals(employee.personType) : employee.personType != null) return false;
        if (position != null ? !position.equals(employee.position) : employee.position != null) return false;
        if (post != null ? !post.equals(employee.post) : employee.post != null) return false;
        if (postType != null ? !postType.equals(employee.postType) : employee.postType != null) return false;
        if (sex != null ? !sex.equals(employee.sex) : employee.sex != null) return false;
        if (birthday != null ? !birthday.equals(employee.birthday) : employee.birthday != null) return false;
        if (residence != null ? !residence.equals(employee.residence) : employee.residence != null) return false;
        if (nativePlace != null ? !nativePlace.equals(employee.nativePlace) : employee.nativePlace != null)
            return false;
        if (nation != null ? !nation.equals(employee.nation) : employee.nation != null) return false;
        if (enterDate != null ? !enterDate.equals(employee.enterDate) : employee.enterDate != null) return false;
        if (leaveDate != null ? !leaveDate.equals(employee.leaveDate) : employee.leaveDate != null) return false;
        if (politicalStatus != null ? !politicalStatus.equals(employee.politicalStatus) : employee.politicalStatus != null)
            return false;
        if (joinGCDDate != null ? !joinGCDDate.equals(employee.joinGCDDate) : employee.joinGCDDate != null)
            return false;
        if (education != null ? !education.equals(employee.education) : employee.education != null) return false;
        if (degree != null ? !degree.equals(employee.degree) : employee.degree != null) return false;
        if (major != null ? !major.equals(employee.major) : employee.major != null) return false;
        if (fullTimeFlag != null ? !fullTimeFlag.equals(employee.fullTimeFlag) : employee.fullTimeFlag != null)
            return false;
        if (graduateSchool != null ? !graduateSchool.equals(employee.graduateSchool) : employee.graduateSchool != null)
            return false;
        if (professionalName != null ? !professionalName.equals(employee.professionalName) : employee.professionalName != null)
            return false;
        if (professionalLevel != null ? !professionalLevel.equals(employee.professionalLevel) : employee.professionalLevel != null)
            return false;
        if (contractTye != null ? !contractTye.equals(employee.contractTye) : employee.contractTye != null)
            return false;
        if (maritalStatus != null ? !maritalStatus.equals(employee.maritalStatus) : employee.maritalStatus != null)
            return false;
        if (mobilePhone != null ? !mobilePhone.equals(employee.mobilePhone) : employee.mobilePhone != null)
            return false;
        return !(status != null ? !status.equals(employee.status) : employee.status != null);

    }

    public List<String> findDifferentPropertyName(Employee employee){
          List<String> list = new ArrayList<String>();
        if (id != null ? !id.equals(employee.id) : employee.id != null) list.add("id");
        if (name != null ? !name.equals(employee.name) : employee.name != null) list.add("name");
        if (sapNo != null ? !sapNo.equals(employee.sapNo) : employee.sapNo != null) list.add("sapNo");
        if (identityNumber != null ? !identityNumber.equals(employee.identityNumber) : employee.identityNumber != null)
            list.add("identityNumber");
        if (comCode != null ? !comCode.equals(employee.comCode) : employee.comCode != null)   list.add("comCode");
        if (teamCode != null ? !teamCode.equals(employee.teamCode) : employee.teamCode != null) list.add("teamCode");
        if (channelType != null ? !channelType.equals(employee.channelType) : employee.channelType != null)
            list.add("channelType");
        if (personType != null ? !personType.equals(employee.personType) : employee.personType != null)    list.add("personType");
        if (position != null ? !position.equals(employee.position) : employee.position != null) list.add("position");
        if (post != null ? !post.equals(employee.post) : employee.post != null) list.add("post");
        if (postType != null ? !postType.equals(employee.postType) : employee.postType != null) list.add("postType");
        if (sex != null ? !sex.equals(employee.sex) : employee.sex != null) list.add("sex");
        if (birthday != null ? !birthday.equals(employee.birthday) : employee.birthday != null) list.add("birthday");
        if (residence != null ? !residence.equals(employee.residence) : employee.residence != null) list.add("residence");
        if (nativePlace != null ? !nativePlace.equals(employee.nativePlace) : employee.nativePlace != null)
            list.add("nativePlace");
        if (nation != null ? !nation.equals(employee.nation) : employee.nation != null) list.add("nation");
        if (enterDate != null ? !enterDate.equals(employee.enterDate) : employee.enterDate != null)  list.add("enterDate");
        if (leaveDate != null ? !leaveDate.equals(employee.leaveDate) : employee.leaveDate != null) list.add("leaveDate");
        if (politicalStatus != null ? !politicalStatus.equals(employee.politicalStatus) : employee.politicalStatus != null)
            list.add("politicalStatus");
        if (joinGCDDate != null ? !joinGCDDate.equals(employee.joinGCDDate) : employee.joinGCDDate != null)
            list.add("joinGCDDate");
        if (education != null ? !education.equals(employee.education) : employee.education != null) list.add("education");
        if (degree != null ? !degree.equals(employee.degree) : employee.degree != null) list.add("degree");
        if (major != null ? !major.equals(employee.major) : employee.major != null)  list.add("major");
        if (fullTimeFlag != null ? !fullTimeFlag.equals(employee.fullTimeFlag) : employee.fullTimeFlag != null)
            list.add("fullTimeFlag");
        if (graduateSchool != null ? !graduateSchool.equals(employee.graduateSchool) : employee.graduateSchool != null)
            list.add("graduateSchool");
        if (professionalName != null ? !professionalName.equals(employee.professionalName) : employee.professionalName != null)
            list.add("professionalName");
        if (professionalLevel != null ? !professionalLevel.equals(employee.professionalLevel) : employee.professionalLevel != null)
            list.add("professionalLevel");
        if (contractTye != null ? !contractTye.equals(employee.contractTye) : employee.contractTye != null)
            list.add("contractTye");
        if (maritalStatus != null ? !maritalStatus.equals(employee.maritalStatus) : employee.maritalStatus != null)
            list.add("maritalStatus");
        if (mobilePhone != null ? !mobilePhone.equals(employee.mobilePhone) : employee.mobilePhone != null)
            list.add("mobilePhone");
        if (status != null ? !status.equals(employee.status) : employee.status != null)
            list.add("status");
        return list;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (sapNo != null ? sapNo.hashCode() : 0);
        result = 31 * result + (identityNumber != null ? identityNumber.hashCode() : 0);
        result = 31 * result + (comCode != null ? comCode.hashCode() : 0);
        result = 31 * result + (teamCode != null ? teamCode.hashCode() : 0);
        result = 31 * result + (channelType != null ? channelType.hashCode() : 0);
        result = 31 * result + (personType != null ? personType.hashCode() : 0);
        result = 31 * result + (position != null ? position.hashCode() : 0);
        result = 31 * result + (post != null ? post.hashCode() : 0);
        result = 31 * result + (postType != null ? postType.hashCode() : 0);
        result = 31 * result + (sex != null ? sex.hashCode() : 0);
        result = 31 * result + (birthday != null ? birthday.hashCode() : 0);
        result = 31 * result + (residence != null ? residence.hashCode() : 0);
        result = 31 * result + (nativePlace != null ? nativePlace.hashCode() : 0);
        result = 31 * result + (nation != null ? nation.hashCode() : 0);
        result = 31 * result + (enterDate != null ? enterDate.hashCode() : 0);
        result = 31 * result + (leaveDate != null ? leaveDate.hashCode() : 0);
        result = 31 * result + (politicalStatus != null ? politicalStatus.hashCode() : 0);
        result = 31 * result + (joinGCDDate != null ? joinGCDDate.hashCode() : 0);
        result = 31 * result + (education != null ? education.hashCode() : 0);
        result = 31 * result + (degree != null ? degree.hashCode() : 0);
        result = 31 * result + (major != null ? major.hashCode() : 0);
        result = 31 * result + (fullTimeFlag != null ? fullTimeFlag.hashCode() : 0);
        result = 31 * result + (graduateSchool != null ? graduateSchool.hashCode() : 0);
        result = 31 * result + (professionalName != null ? professionalName.hashCode() : 0);
        result = 31 * result + (professionalLevel != null ? professionalLevel.hashCode() : 0);
        result = 31 * result + (contractTye != null ? contractTye.hashCode() : 0);
        result = 31 * result + (maritalStatus != null ? maritalStatus.hashCode() : 0);
        result = 31 * result + (mobilePhone != null ? mobilePhone.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }
}
