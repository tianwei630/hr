/*
 * xiaoxiaosu
 */


$(function(){
	
	// ini 
	var isFound = false;
	
	/*
	 * 初始化日期控件
	 */ 
    $(".datetimepicker").datetimepicker({
        minView: "month",
        format: "yyyy-mm-dd",
        language: 'zh-CN',
        autoclose:true
    });	
    
    var roleCodeSelect = document.getElementById("roleCode");
    var roleCode = $.cookie('roleCode');
    if(roleCode == '000'){
    	roleCodeSelect.options.add(new Option("*","001:002:003"));
    	roleCodeSelect.options.add(new Option("分公司管理用户","001"));
    	roleCodeSelect.options.add(new Option("分公司渠道业管用户","002"));
    	roleCodeSelect.options.add(new Option("录单操作员","003"));
    }
    else if(roleCode == '001'){
    	roleCodeSelect.options.add(new Option("*","002:003"));
    	roleCodeSelect.options.add(new Option("分公司渠道业管用户","002"));
    	roleCodeSelect.options.add(new Option("录单操作员","003"));
    }
    else if(roleCode == '002'){
    	
    	roleCodeSelect.options.add(new Option("录单操作员","003"));
    }
    

});



$("#businessNatureCde1").click(function(){
	var businessNature=$("#businessNatureCde1").val();
	if(businessNature.indexOf("寿代产")>=0){
		$("#lifeHandler").css('display','block'); 
	}
	else{
		$("#lifeHandler").css('display','none'); 
	}
});

$("#userInfoFind").click(function(){
	$.LoaderMask.loading({title:"查询中...",isFlag:true});
	$.ajax({
		type:'post',
		url:'userInfo.find.action',
		dataType:'json',
		data:{
			userCode:$.trim($("#userCode").val()),
			userName:$.trim($("#userName").val()),
			createBegin:$.trim($("#createBegin").val()),
			createEnd:$.trim($("#createEnd").val()),
			dept:$.trim($("#dept").val()),
			handler1Cde:$.trim($("#handler1Cde").val()),
			handler1Nme:$.trim($("#handler1Nme").val()),
			roleCode:$.trim($("#roleCode").val()),
			page:'1'
		},
		success:function(data){
			$("#userInfoList").html("");
			$.LoaderMask.loading({title:"查询中...",isFlag:false});
			var status;
			if(data.dtoList.length==0){
				$("#userInfoList").append('<tr>');
				$("#userInfoList").append('<td style="text-align:center">未查询到符合条件的用户信息</td>');
				$("#userInfoList").append('</tr>');
			}
			else{
			$.each(data.dtoList,function(index,item){ 
				if(item.userStatus=='1')
					status="有效";
				else
					status="失效";
				$("#userInfoList").append('<tr>');
				$("#userInfoList").append('<td style="text-align:center">'+item.userCde+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.userNme+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.roleName+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.dept+'-'+item.deptNme+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.handler1Cde+'-'+item.handler1Nme+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.crtTime+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+status+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+'<a data-toggle="modal" href="#edit" class="btn btn-success span1" style="width:60px;" onclick=edit("'+item.userCde+'")>编辑</a>'+'<a data-toggle="modal" href="#updatePassword" class="btn btn-success span1" style="width:90px;" onclick=updatePassword("'+item.userCde+'","'+item.userNme+'")>重置密码</a>'+'</td>');
				$("#userInfoList").append('</tr>');
			
			});

				
			var pageCount = data.totalPages//总页数
				
			var options = {
						totalPages:pageCount,
						currentPage:1,
						itemTexts:function(type,page,current){
							switch(type){
							case "first":
								return "首页";
							case "prev":
								return "上一页";
							case "next":
								return "下一页";
							case "last":
								return "末页";
							case "page":
								return page;
							}
						}
						};
				$("#userPaginator").bootstrapPaginator(options);
				}
		},
		error:function(){
			$.LoaderMask.loading({title:"查询中...",isFlag:false});
			swal("消息提示",'系统异常',"error");
		}
		
				
	});
});

function paging(page){
	
	$.ajax({
		type:'post',
		url:'userInfo.find.action',
		dataType:'json',
		data:{
			userCode:$.trim($("#userCode").val()),
			userName:$.trim($("#userName").val()),
			createBegin:$.trim($("#createBegin").val()),
			createEnd:$.trim($("#createEnd").val()),
			dept:$.trim($("#dept").val()),
			handlerCde:$.trim($("#handlerCde").val()),
			handlerNme:$.trim($("#handlerNme").val()),
			roleCode:$.trim($("#roleCode").val()),
			page:page
		},
		success:function(data){
			$("#userInfoList").html("");
			var status;
			$.each(data.dtoList,function(index,item){ 
				if(item.userStatus=='1')
					status="有效";
				else
					status="失效";
				$("#userInfoList").append('<tr>');
				$("#userInfoList").append('<td style="text-align:center">'+item.userCde+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.userNme+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.roleName+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.dept+'-'+item.deptNme+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.handler1Cde+'-'+item.handler1Nme+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+item.crtTime+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+status+'</td>');
				$("#userInfoList").append('<td style="text-align:center">'+'<a data-toggle="modal" href="#edit" class="btn btn-success span1" style="width:60px;" onclick=edit("'+item.userCde+'")>编辑</a>'+'<a data-toggle="modal" href="#updatePassword" class="btn btn-success span1" style="width:90px;" onclick=updatePassword("'+item.userCde+'","'+item.userNme+'")>重置密码</a>'+'</td>');
				$("#userInfoList").append('</tr>');
			
			});

				
			var pageCount = data.totalPages//总页数
				
			var options = {
						totalPages:pageCount,
						currentPage:page,
						itemTexts:function(type,page,current){
							switch(type){
							case "first":
								return "首页";
							case "prev":
								return "上一页";
							case "next":
								return "下一页";
							case "last":
								return "末页";
							case "page":
								return page;
							}
						}
						};
				$("#userPaginator").bootstrapPaginator(options);
				},
				error:function(){
					swal("消息提示",'系统异常',"error");
				}
				
	});
}

$("#update").click(function(){
	$.LoaderMask.loading({title:"信息校验中...",isFlag:true});
	$("#roleCodeModal").removeAttr("disabled");
//	alert(1);
	var channelTypeList = "";
	$("input:checkbox[name='channelTypeList']:checked").each(function(){
		channelTypeList = channelTypeList + $(this).val() + ":";
	});
	$.ajax({
		type:'post',
		url:'userInfo.update.action',
		dataType:'json',
		data:{
			userCde:$.trim($("#userCde1").val()),
			userNme:$.trim($("#userNme1").val()),
			userStatus:$("#userStatus1").val(),
			roleCode:$("#roleCodeModal").val(),
			comcode:$.trim($("#comcode").val()),
			comcodeNme:$.trim($("#comcodeNme").val()),
			channelTypeList:channelTypeList,
			dept:$.trim($("#dept1").val()),
			deptNme:$.trim($("#deptNme1").val()),
			handler1Cde:$.trim($("#handler1Cde1").val()),
			handler1Nme:$.trim($("#handler1Nme1").val()),
			handlerCde:$.trim($("#handlerCde1").val()),
			handlerNme:$.trim($("#handlerNme1").val()),
			channelType:$("#ChannelType1").val(),
			businessNatureCde:$("#businessNatureCde1").val(),
			agentCde:$.trim($("#agentCde1").val()),
			agentNme:$.trim($("#agentNme1").val()),
			permitNo:$.trim($("#permitNo1").val()),
			agreementNo:$.trim($("#agreementNo1").val()),
			remark:$.trim($("#remark1").val()),
			updMan:$.cookie("userCode")
		},
		success:function(data){
			$("#edit").css({display:"none"});
			$.LoaderMask.loading({title:"信息校验中...",isFlag:false});
			if(data.responseCode=="S0002"){
//				var username = data.carCalculate.add.user.userNme
				swal("消息提示","修改用户成功","success");
			}else{
				console.log(data.ERROR);
				swal("消息提示",data.ERROR,"error");
			}
		}
	});
});

function edit(userCde){
	$.ajax({
		type:'post',
		url:'userInfo.findByUsercde.action',
		dataType:'json',
		data:{
			userCode:userCde
		},
		success:function(data){
			$("#roleCodeModal").attr("disabled");
			var roleCode = data.dto.roleCode;
			if(roleCode == '003'){
				$("#ChannelType").css('display','none');
				$("#admin").css('display','none'); 
				$("#nomal").css('display','block'); 
				var businessNature = data.dto.businessNatureCde;
				if(businessNature.indexOf("寿代产")>=0){
					$("#lifeHandler").css('display','block'); 
				}
				else{
					$("#lifeHandler").css('display','none'); 
				}
				$("#dept1").val(data.dto.dept);
				$("#deptNme1").val(data.dto.deptNme);
				$("#handler1Cde1").val(data.dto.handler1Cde);
				$("#handler1Nme1").val(data.dto.handler1Nme);
				$("#handlerCde1").val(data.dto.handlerCde);
				$("#handlerNme1").val(data.dto.handlerNme);
				$("#ChannelType1").val(data.dto.channelType);
				$("#businessNatureCde1").val(data.dto.businessNatureCde);
				$("#agentCde1").val(data.dto.agentCde);
				$("#agentNme1").val(data.dto.agentNme);
				$("#permitNo1").val(data.dto.permitNo);
				$("#agreementNo1").val(data.dto.agreementNo);
				
			}
			else{
				$("#nomal").css('display','none');
				$("#admin").css('display','block'); 
				if(roleCode == '002'){
					$("#ChannelType").css('display','block'); 
					var channelTypeList = data.dto.channelTypeList.split(':');
					for(var i in channelTypeList){
						$("input:checkbox[value='"+channelTypeList[i]+"']").attr('checked','true');
					}
					
				}
				else{
					$("#ChannelType").css('display','none'); 
				}
				$("#comcode").val(data.dto.comcode);
				$("#comcodeNme").val(data.dto.comcodeNme);
			}
			
			$("#userCde1").val(data.dto.userCde);
			$("#userNme1").val(data.dto.userNme);
			$("#userStatus1").val(data.dto.userStatus);
			$("#roleCodeModal").val(data.dto.roleCode);
			$("#remark1").val(data.dto.remark);
		}
	});
}

function updatePassword(userCde,userNme){
	swal({
			title: "重置密码",
			text: '请确认是否重置用户'+userCde+':'+userNme+'的密码，其密码将被重置为123456-7！',  
			type: "warning",  
			showCancelButton: true, 
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "确认重置",  
			cancelButtonText: "取消重置", 
			closeOnConfirm: false,   
			closeOnCancel: false },
			function(isConfirm){  
				if (isConfirm) { 
					$.ajax({
						type:'post',
						url:'passWord.reset.action',
						dataType:'json',
						data:{
							userCode:userCde,
							new_password:"123456-7"
						},
						success:function(data){
							if(data.responseCode=="S0002"){
							swal("成功!", "您已将用户"+userCde+":"+userNme+"的密码重置为123456-7", "success"); 
							}
							else{
								swal("失败！", "密码重置失败,请重试。", "error"); 
							}
						},
						error:function(data){
							swal("失败！", "密码重置失败,请重试。", "error"); 
						}
					});
					} else {   
						swal("取消！", "密码已取消重置 ", "error");  
						}
				});
	
}