package com.chinaLife.hr.service.domain;

import com.chinaLife.hr.service.entity.HrCode;

import java.io.Serializable;

/**
 * Created by tianwei on 2017/2/15.
 */
public class EmployeeForm implements Serializable {

    private Long id;
    private String name;
    private String sapNo;

    private String identityNumber;
    private HrCode comCode;   //部门
    private HrCode teamCode;  //二级部门
    private HrCode channelType;  //渠道
    private HrCode personType;   //人员清分
    private String position;    //职务
    private String post;     //岗位
    private HrCode postType;  //岗位类别
    private String sex;     //性别
    private String birthday; //出生日期
    private HrCode residence;  //户籍
    private String nativePlace;  //籍贯
    private HrCode nation;  //民族
    private String enterDate;  //入司时间
    private String leaveDate;  //离司时间
    private HrCode politicalStatus;  //政治面貌
    private String joinGCDDate;   //入党时间
    private HrCode education;   //学历
    private HrCode degree;    //学位
    private String major;    //专业
    private String fullTimeFlag;  //是否全日制
    private String graduateSchool;  //毕业院校
    private String professionalName;  //专业技术职称
    private HrCode professionalLevel;  //职称级别
    private HrCode contractTye;  //合同类型
    private HrCode maritalStatus;  //婚姻状况
    private String mobilePhone;
    private HrCode status;  //是否在司
    private int version;

    @Override
    public String toString() {
        return "EmployeeForm{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sapNo='" + sapNo + '\'' +
                ", identityNumber='" + identityNumber + '\'' +
                ", comCode=" + comCode +
                ", teamCode=" + teamCode +
                ", channelType=" + channelType +
                ", personType=" + personType +
                ", position='" + position + '\'' +
                ", post='" + post + '\'' +
                ", postType=" + postType +
                ", sex='" + sex + '\'' +
                ", birthday='" + birthday + '\'' +
                ", residence=" + residence +
                ", nativePlace='" + nativePlace + '\'' +
                ", nation=" + nation +
                ", enterDate='" + enterDate + '\'' +
                ", leaveDate='" + leaveDate + '\'' +
                ", politicalStatus=" + politicalStatus +
                ", joinGCDDate='" + joinGCDDate + '\'' +
                ", education=" + education +
                ", degree=" + degree +
                ", major='" + major + '\'' +
                ", fullTimeFlag='" + fullTimeFlag + '\'' +
                ", graduateSchool='" + graduateSchool + '\'' +
                ", professionalName='" + professionalName + '\'' +
                ", professionalLevel=" + professionalLevel +
                ", contractTye=" + contractTye +
                ", maritalStatus=" + maritalStatus +
                ", mobilePhone='" + mobilePhone + '\'' +
                ", status=" + status +
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

    public HrCode getComCode() {
        return comCode;
    }

    public void setComCode(HrCode comCode) {
        this.comCode = comCode;
    }

    public HrCode getTeamCode() {
        return teamCode;
    }

    public void setTeamCode(HrCode teamCode) {
        this.teamCode = teamCode;
    }

    public HrCode getChannelType() {
        return channelType;
    }

    public void setChannelType(HrCode channelType) {
        this.channelType = channelType;
    }

    public HrCode getPersonType() {
        return personType;
    }

    public void setPersonType(HrCode personType) {
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

    public HrCode getPostType() {
        return postType;
    }

    public void setPostType(HrCode postType) {
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

    public HrCode getResidence() {
        return residence;
    }

    public void setResidence(HrCode residence) {
        this.residence = residence;
    }

    public String getNativePlace() {
        return nativePlace;
    }

    public void setNativePlace(String nativePlace) {
        this.nativePlace = nativePlace;
    }

    public HrCode getNation() {
        return nation;
    }

    public void setNation(HrCode nation) {
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

    public HrCode getPoliticalStatus() {
        return politicalStatus;
    }

    public void setPoliticalStatus(HrCode politicalStatus) {
        this.politicalStatus = politicalStatus;
    }

    public String getJoinGCDDate() {
        return joinGCDDate;
    }

    public void setJoinGCDDate(String joinGCDDate) {
        this.joinGCDDate = joinGCDDate;
    }

    public HrCode getEducation() {
        return education;
    }

    public void setEducation(HrCode education) {
        this.education = education;
    }

    public HrCode getDegree() {
        return degree;
    }

    public void setDegree(HrCode degree) {
        this.degree = degree;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
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

    public String getProfessionalName() {
        return professionalName;
    }

    public void setProfessionalName(String professionalName) {
        this.professionalName = professionalName;
    }

    public HrCode getProfessionalLevel() {
        return professionalLevel;
    }

    public void setProfessionalLevel(HrCode professionalLevel) {
        this.professionalLevel = professionalLevel;
    }

    public HrCode getContractTye() {
        return contractTye;
    }

    public void setContractTye(HrCode contractTye) {
        this.contractTye = contractTye;
    }

    public HrCode getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(HrCode maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public HrCode getStatus() {
        return status;
    }

    public void setStatus(HrCode status) {
        this.status = status;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
