/**
 * 新增管理员用户js
 */

;$(function(){
	if($.cookie('roleCode') == '001'){
		$("#comcode").val($.cookie('comCode'));
		$("#comcodeNme").val($.cookie('comCodeNme'));
	}
	
	$("#roleCode").click(function(){
		var roleCode=$("#roleCode").val();
		if(roleCode == '002'){
			$("#ChannelType").css('display','block'); 
		}
		else{
			$("#ChannelType").css('display','none'); 
		}
	});
	
	
	/**
	 * 新增用户js
	 */

	$("#saveUser").click(function(){
//		console.log($("#userType").val());
			if(!userAdd.form()) {
				return;
			}
		
		var channelTypeList = "";
		$("input:checkbox[name='channelTypeList']:checked").each(function(){
			channelTypeList = channelTypeList + $(this).val() + ":";
		});
		if($("#roleCode").val() =='002')
			if(channelTypeList==""){
				swal("消息提示","请选择管理渠道范围","error");
				return;
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
							roleCode:$.trim($("#roleCode").val()),
							userCde:$.trim($("#userCde").val()),
							userNme:$.trim($("#userNme").val()),
							userStatus:$.trim($("#userStatus").val()),
							password:$.trim($("#password").val()),
							comcode:$.trim($("#comcode").val()),
							comcodeNme:$.trim($("#comcodeNme").val()),
							channelTypeList:channelTypeList,
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
								console.log(data.ERROR);
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
					swal("消息提示","改用户已存在","error");
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
            comcode:{
            	required:true
            },
            comcodeNme:{
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
        	comcode: {required: "代理许可证不能为空！"},
        	comcodeNme: {required: "代理协议号不能为空！"}
        }
    });
	
	
});

