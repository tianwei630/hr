package com.chinaLife.hr.service.service.impl;

import com.chinaLife.hr.service.dao.EmployeeDao;
import com.chinaLife.hr.service.domain.*;
import com.lowagie.text.*;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by tianwei on 2017/2/22.
 */
@Service
public class GenerateEmployeePDFServiceImpl {
    @Autowired
    private EmployeeDao employeeDao;


    public byte[] generatePDF(MainInfoForm mainInfoForm) {
        EmployeeForm employeeForm = mainInfoForm.getEmployee();
        Document document = new Document(PageSize.A4, 50, 50, 150, 50);
        ByteArrayOutputStream bos;
//        FileOutputStream bos;
        PdfWriter writer;
        try {
            bos = new ByteArrayOutputStream();
//            bos = new FileOutputStream("D:/test.pdf");
            writer = PdfWriter.getInstance(document, bos);
            document.open();
            PdfContentByte content = writer.getDirectContent();
//                Image image = new Image(ImageDataFactory.create(IMG));
            URL imageUrl = getClass().getClassLoader().getResource("jpg/logo.png");
            Image logo = Image.getInstance(imageUrl);
            logo.setAlignment(Image.ALIGN_CENTER);
            logo.scaleAbsoluteHeight(10);
            logo.scaleAbsoluteWidth(10);
//                logo.scalePercent(38);
            logo.scalePercent(42);
//            logo.setAbsolutePosition(50, 766);
            logo.setAbsolutePosition(51, 666);
            content.addImage(logo);

//            BaseFont bfChinese = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
//                使用宋体来展示
            BaseFont bfChinese = BaseFont.createFont("font/simsun.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            Font FontChinese = new Font(bfChinese, 10, Font.NORMAL);
            Font titleFontChinese = new Font(bfChinese, 14, Font.NORMAL);
            Font educationFontChinese = new Font(bfChinese, 10, Font.NORMAL);
            int widths[] = {25, 25, 25, 25};
//            定义标题
            Table titleTable = new Table(4);
            titleTable.setWidths(widths);
            titleTable.setWidth(100);
            titleTable.setPadding(2);

            Cell cell = new Cell(new Phrase(employeeForm.getName() + "--个人简历信息", titleFontChinese));
            cell.setUseBorderPadding(true);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setColspan(4);
            cell.setBorder(Rectangle.NO_BORDER);
            titleTable.addCell(cell);
            document.add(titleTable);

//            人员信息
            Table employeeTable = new Table(4);
            employeeTable.setWidths(widths);
            employeeTable.setWidth(100);
            employeeTable.setPadding(2);

            Cell name = new Cell(new Paragraph("姓名：" + employeeForm.getName(), FontChinese));
            name.setColspan(1);
            name.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(name);

            Cell sapNo = new Cell(new Paragraph("sap号：" + employeeForm.getSapNo(), FontChinese));
            sapNo.setColspan(1);
            sapNo.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(sapNo);
//
//            Cell identityNumber = new Cell(new Paragraph("身份证号：" + employeeForm.getIdentityNumber(), FontChinese));
//            identityNumber.setColspan(1);
//            identityNumber.setBorder(Rectangle.NO_BORDER);
//            employeeTable.addCell(identityNumber);

            Cell comCode = new Cell(new Paragraph("部门：" + employeeForm.getComCode().getName(), FontChinese));
            comCode.setColspan(1);
            comCode.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(comCode);

            if (employeeForm.getTeamCode() != null) {
                Cell teamCode = new Cell(new Paragraph("二级部门：" + employeeForm.getTeamCode().getName(), FontChinese));
                teamCode.setColspan(1);
                teamCode.setBorder(Rectangle.NO_BORDER);
                employeeTable.addCell(teamCode);
            }
            if (employeeForm.getChannelType() != null) {
                Cell channelType = new Cell(new Paragraph("渠道：" + employeeForm.getChannelType().getName(), FontChinese));
                channelType.setColspan(1);
                channelType.setBorder(Rectangle.NO_BORDER);
                employeeTable.addCell(channelType);
            }

//            Cell personType = new Cell(new Paragraph("人员清分：" + employeeForm.getPersonType().getName(), FontChinese));
//            personType.setColspan(1);
//            personType.setBorder(Rectangle.NO_BORDER);
//            employeeTable.addCell(personType);

            Cell position = new Cell(new Paragraph("现任职务：" + employeeForm.getPosition(), FontChinese));
            position.setColspan(1);
            position.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(position);

            Cell post = new Cell(new Paragraph("岗位：" + employeeForm.getPost(), FontChinese));
            post.setColspan(1);
            post.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(post);

//            Cell postType = new Cell(new Paragraph("岗位类别：" + employeeForm.getPostType().getName(), FontChinese));
//            postType.setColspan(1);
//            postType.setBorder(Rectangle.NO_BORDER);
//            employeeTable.addCell(postType);

            String sexValue = employeeForm.getSex().equals("1") ? "男" : "女";
            Cell sex = new Cell(new Paragraph("性别：" + sexValue, FontChinese));
            sex.setColspan(1);
            sex.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(sex);

            Cell birthday = new Cell(new Paragraph("出生日期：" + employeeForm.getBirthday(), FontChinese));
            birthday.setColspan(1);
            birthday.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(birthday);

            Cell residence = new Cell(new Paragraph("户籍：" + employeeForm.getResidence().getName(), FontChinese));
            residence.setColspan(1);
            residence.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(residence);

            Cell nativePlace = new Cell(new Paragraph("籍贯：" + employeeForm.getNativePlace(), FontChinese));
            nativePlace.setColspan(1);
            nativePlace.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(nativePlace);

            Cell nation = new Cell(new Paragraph("民族：" + employeeForm.getNation().getName(), FontChinese));
            nation.setColspan(1);
            nation.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(nation);

            Cell enterDate = new Cell(new Paragraph("入司时间：" + employeeForm.getEnterDate(), FontChinese));
            enterDate.setColspan(1);
            enterDate.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(enterDate);

            if (employeeForm.getLeaveDate() != null) {
                Cell leaveDate = new Cell(new Paragraph("离司时间：" + employeeForm.getLeaveDate(), FontChinese));
                leaveDate.setColspan(1);
                leaveDate.setBorder(Rectangle.NO_BORDER);
                employeeTable.addCell(leaveDate);

            }

            Cell politicalStatus = new Cell(new Paragraph("政治面貌：" + employeeForm.getPoliticalStatus().getName(), FontChinese));
            politicalStatus.setColspan(1);
            politicalStatus.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(politicalStatus);

            if (employeeForm.getJoinGCDDate() != null) {
                Cell joinGCDDate = new Cell(new Paragraph("入党时间：" + employeeForm.getJoinGCDDate(), FontChinese));
                joinGCDDate.setColspan(1);
                joinGCDDate.setBorder(Rectangle.NO_BORDER);
                employeeTable.addCell(joinGCDDate);
            }

            Cell education = new Cell(new Paragraph("学历：" + employeeForm.getEducation().getName(), FontChinese));
            education.setColspan(1);
            education.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(education);

            Cell degree = new Cell(new Paragraph("学位：" + employeeForm.getDegree().getName(), FontChinese));
            degree.setColspan(1);
            degree.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(degree);

            Cell major = new Cell(new Paragraph("专业：" + employeeForm.getMajor(), FontChinese));
            major.setColspan(1);
            major.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(major);

//            String fullTimeFlagValue = employeeForm.getFullTimeFlag().equals("1") ? "是" : "否";
//            Cell fullTimeFlag = new Cell(new Paragraph("是否全日制：" + fullTimeFlagValue, FontChinese));
//            fullTimeFlag.setColspan(1);
//            fullTimeFlag.setBorder(Rectangle.NO_BORDER);
//            employeeTable.addCell(fullTimeFlag);

            Cell graduateSchool = new Cell(new Paragraph("毕业院校：" + employeeForm.getGraduateSchool(), FontChinese));
            graduateSchool.setColspan(1);
            graduateSchool.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(graduateSchool);

            if (employeeForm.getProfessionalName() != null) {
                Cell professionalName = new Cell(new Paragraph("专业技术职称：" + employeeForm.getProfessionalName(), FontChinese));
                professionalName.setColspan(1);
                professionalName.setBorder(Rectangle.NO_BORDER);
                employeeTable.addCell(professionalName);
            }

            if (employeeForm.getProfessionalLevel() != null) {
                Cell professionalLevel = new Cell(new Paragraph("职称级别：" + employeeForm.getProfessionalLevel().getName(), FontChinese));
                professionalLevel.setColspan(1);
                professionalLevel.setBorder(Rectangle.NO_BORDER);
                employeeTable.addCell(professionalLevel);
            }

//            Cell contractTye = new Cell(new Paragraph("合同类别：" + employeeForm.getContractTye().getName(), FontChinese));
//            contractTye.setColspan(1);
//            contractTye.setBorder(Rectangle.NO_BORDER);
//            employeeTable.addCell(contractTye);

            Cell maritalStatus = new Cell(new Paragraph("婚姻状况：" + employeeForm.getMaritalStatus().getName(), FontChinese));
            maritalStatus.setColspan(1);
            maritalStatus.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(maritalStatus);

            Cell mobilePhone = new Cell(new Paragraph("手机号码：" + employeeForm.getMobilePhone(), FontChinese));
            mobilePhone.setColspan(1);
            mobilePhone.setBorder(Rectangle.NO_BORDER);
            employeeTable.addCell(mobilePhone);
//
//            Cell status = new Cell(new Paragraph("是否在司：" + employeeForm.getStatus().getName(), FontChinese));
//            status.setColspan(1);
//            status.setBorder(Rectangle.NO_BORDER);
//            employeeTable.addCell(status);

            document.add(employeeTable);


//            教育信息

            EducationForm educationInfo = mainInfoForm.getEducationInfo();
            if(educationInfo!=null){

                Table educationTable = new Table(7);
                int educationWiths[] = {15, 15, 20, 10, 10, 15, 15};
                educationTable.setWidths(educationWiths);
                educationTable.setWidth(100);
                educationTable.setPadding(5);

                Cell educationName = new Cell(new Paragraph("教育信息", FontChinese));
                educationName.setColspan(7);
                educationName.setHorizontalAlignment(Element.ALIGN_CENTER);
                educationTable.addCell(educationName);

                Cell educationBeginDate = new Cell(new Paragraph("开始时间", educationFontChinese));
                educationBeginDate.setColspan(1);
                educationTable.addCell(educationBeginDate);

                Cell educationEndDate = new Cell(new Paragraph("结束时间", educationFontChinese));
                educationEndDate.setColspan(1);
                educationTable.addCell(educationEndDate);

                Cell educationGraduateSchool = new Cell(new Paragraph("毕业院校", educationFontChinese));
                educationGraduateSchool.setColspan(1);
                educationTable.addCell(educationGraduateSchool);

                Cell educationEducation = new Cell(new Paragraph("学历", educationFontChinese));
                educationEducation.setColspan(1);
                educationTable.addCell(educationEducation);

                Cell educationDegree = new Cell(new Paragraph("学位", educationFontChinese));
                educationDegree.setColspan(1);
                educationTable.addCell(educationDegree);

                Cell educationMajor = new Cell(new Paragraph("专业", educationFontChinese));
                educationMajor.setColspan(1);
                educationTable.addCell(educationMajor);

                Cell educationFullTimeFlag = new Cell(new Paragraph("是否全日制", educationFontChinese));
                educationFullTimeFlag.setColspan(1);
                educationTable.addCell(educationFullTimeFlag);
                EducationDetailForm[] educations = educationInfo.getEducations();
                for (EducationDetailForm detailForm : educations) {
                    educationTable.addCell(new Paragraph(detailForm.getBeginDate(), educationFontChinese));
                    educationTable.addCell(new Paragraph(detailForm.getEndDate(), educationFontChinese));
                    educationTable.addCell(new Paragraph(detailForm.getGraduateSchool(), educationFontChinese));
                    educationTable.addCell(new Paragraph(detailForm.getEducation().getName(), educationFontChinese));
                    educationTable.addCell(new Paragraph(detailForm.getDegree().getName(), educationFontChinese));
                    educationTable.addCell(new Paragraph(detailForm.getMajor(), educationFontChinese));
                    String fullTimeFlagValue1 = employeeForm.getFullTimeFlag().equals("1") ? "是" : "否";
                    educationTable.addCell(new Paragraph(fullTimeFlagValue1, educationFontChinese));
                }


                document.add(educationTable);
            }


            // 工作信息

            WorkForm workInfo = mainInfoForm.getWorkInfo();
            if(workInfo!=null){
                Table workTable = new Table(5);
                int workWiths[] = {15, 15, 30, 20, 20};
                workTable.setWidths(workWiths);
                workTable.setWidth(100);
                workTable.setPadding(5);

                Cell workName = new Cell(new Paragraph("工作信息", FontChinese));
                workName.setColspan(5);
                workName.setHorizontalAlignment(Element.ALIGN_CENTER);
                workTable.addCell(workName);

                Cell workBeginDate = new Cell(new Paragraph("开始时间", FontChinese));
                workBeginDate.setColspan(1);
                workTable.addCell(workBeginDate);

                Cell workEndDate = new Cell(new Paragraph("结束时间", FontChinese));
                workEndDate.setColspan(1);
                workTable.addCell(workEndDate);

                Cell workCompany = new Cell(new Paragraph("工作单位", FontChinese));
                workCompany.setColspan(1);
                workTable.addCell(workCompany);

                Cell workDepartMent = new Cell(new Paragraph("工作部门", FontChinese));
                workDepartMent.setColspan(1);
                workTable.addCell(workDepartMent);

                Cell workPosition = new Cell(new Paragraph("工作职务", FontChinese));
                workPosition.setColspan(1);
                workTable.addCell(workPosition);

                WorkDetialForm[] works = workInfo.getWorks();
                for(WorkDetialForm detialForm:works){
                    workTable.addCell(new Paragraph(detialForm.getBeginDate(), FontChinese));
                    workTable.addCell(new Paragraph(detialForm.getEndDate(), FontChinese));
                    workTable.addCell(new Paragraph(detialForm.getWorkCompany(), FontChinese));
                    workTable.addCell(new Paragraph(detialForm.getWorkDepartMent(), FontChinese));
                    workTable.addCell(new Paragraph(detialForm.getWorkPosition(), FontChinese));
                }

                document.add(workTable);
            }


//            薪酬信息

//            PaymentForm paymentInfo = mainInfoForm.getPaymentInfo();
//            if(paymentInfo!=null){
//
//                Table paymentTable = new Table(5);
//                int paymentWiths[] = {20, 20, 20, 20, 20};
//                paymentTable.setWidths(paymentWiths);
//                paymentTable.setWidth(100);
//                paymentTable.setPadding(2);
//
//                Cell paymentName = new Cell(new Paragraph("薪酬信息", FontChinese));
//                paymentName.setColspan(5);
//                paymentName.setHorizontalAlignment(Element.ALIGN_CENTER);
//                paymentTable.addCell(paymentName);
//
//                Cell paymentBeginDate = new Cell(new Paragraph("开始时间", FontChinese));
//                paymentBeginDate.setColspan(1);
//                paymentTable.addCell(paymentBeginDate);
//
//                Cell paymentEndDate = new Cell(new Paragraph("结束时间", FontChinese));
//                paymentEndDate.setColspan(1);
//                paymentTable.addCell(paymentEndDate);
//
//                Cell paymentJobLevel = new Cell(new Paragraph("职务级别", FontChinese));
//                paymentJobLevel.setColspan(1);
//                paymentTable.addCell(paymentJobLevel);
//
//                Cell paymentJobGrade = new Cell(new Paragraph("职务档次", FontChinese));
//                paymentJobGrade.setColspan(1);
//                paymentTable.addCell(paymentJobGrade);
//
//                Cell paymentGrantRadio = new Cell(new Paragraph("发放比例", FontChinese));
//                paymentGrantRadio.setColspan(1);
//                paymentTable.addCell(paymentGrantRadio);
//
//                PaymentDetailForm[] payments = paymentInfo.getPayments();
//                for(PaymentDetailForm detailForm:payments){
//                    paymentTable.addCell(new Paragraph(detailForm.getBeginDate(), FontChinese));
//                    paymentTable.addCell(new Paragraph(detailForm.getEndDate(), FontChinese));
//                    paymentTable.addCell(new Paragraph(detailForm.getJobLevel().getName(), FontChinese));
//                    paymentTable.addCell(new Paragraph(detailForm.getJobGrade().getName(), FontChinese));
//                    paymentTable.addCell(new Paragraph(detailForm.getGrantRadio(), FontChinese));
//                }
//                document.add(paymentTable);
//            }


            document.close();

            byte[] bytes = bos.toByteArray();

            return bytes;
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public static void main(String[] args) {
        GenerateEmployeePDFServiceImpl service = new GenerateEmployeePDFServiceImpl();
        service.generatePDF(new MainInfoForm());
    }
}
