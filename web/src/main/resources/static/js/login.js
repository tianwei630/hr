

$(function(){
	 
	
	var flag=1;
	//$("#wrongError").hide();
	//$('#emptyError').hide();
	
	// 登陆
	$("#btn_submit").click(function(event){
		if(!userlogin.form()) {
			return;
		}
		$.LoaderMask.loading({title:"登陆中...",isFlag:true});
		$.ajax({
			type:'post',
			url:'doLogin',
			dataType:'json',
			data:{
				userName:$.trim($("#j_userName").val()),
				passWord:$.trim($("#j_passWord").val()),
				validateCode:$.trim($("#verifycode").val())
			},
			success:function(data){
				$.LoaderMask.loading({title:"登陆中...",isFlag:false});
				$("#verifycodeimg").attr('src',"captcha.verifycode.action?"+ Math.random());
				flag=0;
				if(data.status==0){
					location.href="index.html";
				}
				else{
					swal("消息提示",data.loginMessage,"error");
				}
			},
			error:function(msg){
				$.LoaderMask.loading({title:"登陆中...",isFlag:false});
				flag=0;
				$("#verifycodeimg").attr('src',"captcha.verifycode.action?"+ Math.random());
				swal("消息提示","系统异常","error");
			}
			
		});
	});
	
	//回车提交表单
	$("body").keydown(function(event){
  		// window.event对象IE 兼容 Chrome 全局变量, Firefox 局部变量
  		if(event.keyCode) {
			if(event.keyCode == 13 ){
				if(flag==1){
					$("#btn_submit").click();
					flag=0;
				}
				else
					flag=1;
	  		} 
	  		else{
	  			if(event.which == 13){
	  				if(flag==1){
						$("#btn_submit").click();
						flag=0;
					}
	  				else
	  					flag=1;
	  			}
	  		} 			
  		}
	});
	
	var userlogin = $("form[name='user-login']").validate({
        rules:{
        	j_userName:{
                required:true
            },
            j_passWord:{
                required:true
            },
            verifycode:{
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
        	j_userName: {required: "用户名不能为空！"},
        	j_passWord: {required: "密码不能为空！"}, 
        	verifycode: {required: "验证码不能为空！"}
        }
    });
	
});

function refresh(obj){
	obj.src="captcha.verifycode.action?"+ Math.random();
	}

	function mouseover(obj){
		obj.style.cursor = "pointer";
	}