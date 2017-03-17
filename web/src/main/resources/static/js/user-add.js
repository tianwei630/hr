;$(function(){
	
	$.ajax({
		type:'post',
		url:'getChannelType',
		dataType:'json',
		data:{
			userCode:$.trim($("#userCde").val())
		},
		success:function(data){
			var ChannelType = document.getElementById("ChannelType");
			$.each(data,function(key,value){
				ChannelType.options.add(new Option(value,key));
			});
			},
		error:function(msg){
			
		}	
		});
	
	$("#businessNatureCde").click(function(){
		var businessNature=$("#businessNatureCde").val();
		if(businessNature.indexOf("寿代产")>=0){
			$("#lifeHandler").css('display','block'); 
		}
		else{
			$("#lifeHandler").css('display','none'); 
		}
	});
	
	/**
	 * 新增用户js
	 */

	$("#saveUser").click(function(){
//		console.log($("#userType").val());
		if($("#userType").val()=="1"){
			if($.trim($("#userCde").val())==""){
				swal("消息提示","用户名不能为空","warning");
				return;
			}
			if($.trim($("#password").val())==""){
				swal("消息提示","密码不能为空","warning");
				return;
			}
		}
		else{
			if(!userAdd.form()) {
				return;
			}
		}
		
		
		$.LoaderMask.loading({title:"信息校验中...",isFlag:true});
		
		$.ajax({
			type:'post',
			url:'user.check.action',
			dataType:'json',
			data:{
				userCode:$.trim($("#userCde").val())
			},
			success:function(data){
				if(data.checkInfo=='false'){
					$.ajax({
						type:'post',
						url:'user.add.action',
						dataType:'json',
						data:{
							userCde:$.trim($("#userCde").val()),
							userNme:$.trim($("#userNme").val()),
							roleCode:'003', //录单操作员
							userStatus:$.trim($("#userStatus").val()),
							password:$.trim($("#password").val()),
							dept:$.trim($("#dept").val()),
							deptNme:$.trim($("#deptNme").val()),
							handler1Cde:$.trim($("#handler1Cde").val()),
							handler1Nme:$.trim($("#handler1Nme").val()),
							handlerCde:$.trim($("#handlerCde").val()),
							handlerNme:$.trim($("#handlerNme").val()),
							ChannelType:$.trim($("#ChannelType").val()),
							businessNatureCde:$.trim($("#businessNatureCde").val()),
							agentCde:$.trim($("#agentCde").val()),
							agentNme:$.trim($("#agentNme").val()),
							permitNo:$.trim($("#permitNo").val()),
							agreementNo:$.trim($("#agreementNo").val()),
							remark:$.trim($("#remark").val()),
							crtMan:$.cookie('userCode')	
						},
						success:function(data){
//							console.log(data.responseCode);
							$.LoaderMask.loading({title:"信息校验中...",isFlag:false});
							if(data.responseCode=="S0001"){
//								var username = data.carCalculate.add.user.userNme
								swal("消息提示","新增用户成功","success");
								$("#form-wizard")[0].reset();
							}else{
								swal("消息提示",data.ERROR,"error");
							}				
							
						},
						error:function(msg){
							$.LoaderMask.loading({title:"信息校验中...",isFlag:false});
							swal("消息提示","系统异常， 请重试","error");
						}
						
					});
				}
				else{
					$.LoaderMask.loading({title:"信息校验中...",isFlag:false});
					swal("消息提示","该用戶已存在","error");
				}
			},
			error:function(msg){
				$.LoaderMask.loading({title:"信息校验中...",isFlag:false});
				swal("消息提示","系统异常， 请重试","error");
			}
		});
		
	});

	$("#back").click(function(){
		$("#form-wizard")[0].reset();
	});



	if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder 

	    $('[placeholder]').focus(function() { 

	        var input = $(this); 

	        if (input.val() == input.attr('placeholder')) { 

	            input.val(''); 

	            input.removeClass('placeholder'); 

	        } 

	    }).blur(function() { 

	        var input = $(this); 

	        if (input.val() == '' || input.val() == input.attr('placeholder')) { 

	            input.addClass('placeholder'); 

	            input.val(input.attr('placeholder')); 

	        } 

	    }).blur(); 

	};
	
	function placeholderSupport() { 
 		
	    return 'placeholder' in document.createElement('input'); 

	} 
	

	
	var userAdd = $("form[name='form-wizard']").validate({
        rules:{
        	userCde:{
                required:true
            },
            password:{
                required:true
            },
            dept:{
                required:true
            },
            deptNme:{
                required:true
            },
            handler1Cde:{
                required:true
            },
            handler1Nme:{
                required:true
            },
            agentCde:{
                required:true
            },
            agentNme:{
                required:true
            },
            permitNo:{
                required:true
            },
            agreementNo:{
                required:true
            }
        },
        errorClass: "help-inline",  //help-block
        errorElement: "span",
        highlight:function(element, errorClass, validClass) {
	        $( element ).tooltip({ placement: 'bottom' });
        	$( element ).css({'background-color': '#FFED86','border-color':'rgba(236, 168, 82, 0.8)'});
        },
        unhighlight: function(element, errorClass, validClass) {
        	$( element ).css({'background-color': '','border-color':''});
        },
        messages: {
        	userCde: {required: "用户代码不能为空！"},
        	password: {required: "密码不能为空！"}, 
        	dept: {required: "机构代码不能为空！"},
        	deptNme: {required: "机构名称不能为空！"},
        	handler1Cde: {required: "业务员代码不能为空！"},
        	handler1Nme: {required: "业务员名称不能为空！"},
        	agentCde: {required: "代理人代码不能为空！"},
        	agentNme: {required: "代理人名称不能为空！"},
        	permitNo: {required: "代理许可证不能为空！"},
        	agreementNo: {required: "代理协议号不能为空！"}
        }
    });
	
	
	

});