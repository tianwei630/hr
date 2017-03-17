/**
 * 主页的js
 */
"use strict";
	//alert(1);
	//if($.cookie('roleCode')=='000'){
	//	var menuList = "json/mainMenu.json";
	//}
	//else if($.cookie('roleCode')=='001'){
	//	var menuList = "json/menuCom.json";
	//}
	//else if($.cookie('roleCode')=='002'){
	//	var menuList = "json/menuDept.json";
	//}
	//else if($.cookie('roleCode')=='003'){
	//	var menuList = "json/menuList.json";
	//}

var menuList = "json/menuList.json";

	/* var menuList = $.cookie('menu');
	menuList = $.parseJSON(menuList); */
	fy.server({"sysInfo" : menuList});
	
	$(document).ready(function ($) {
		
		//if($.cookie('roleCode') !='003'){
		//	$("#route").html("&gt; 系统配置");
		//	$("#mainFrame").attr("src","user-manager.html");
		//}
		//IE10- don't support full screen api
		if ($.browser.msie) {
			if ($.browser.version < 11) $('#liFullScr').hide();
			if ($.browser.version < 8) alert('您使用的IE版本过低，请使用IE8以上的浏览器，\n\n如果您打开了浏览器的兼容模式，亦请切换关闭之。\n\n如果您使用的是第三方浏览器，诸如：\n搜狗、金山、360、QQ、百度、世界之窗、遨游等，\n推荐使用这些浏览器的“极速模式”');
		}



		fy.server.sysInfo.getJSON(function(json){Page.init(json)});
		
		
		$("#username").html("您好,"+$.cookie('userName')+"!");
		
		
		
	//	console.log($.cookie('userInfo'));
	});

	var Page = {
		voidRapidClicks : 0 ,
		menuBar: $("#sysMenu"),
		mainFrame: $("#mainFrame"),
		route: $('#route'),
		currentLv1Menu: null,
		currentLv2Menu: null,
		sidebarHidden: false,
		addEventListeners: function () {
			//toggle lv2 subMenu pane
			Page.menuBar.delegate(".menu-lv1", "click", function (evt) {
				evt.stopImmediatePropagation();
				var $li = $(this),  link = $li.data("link") , sub = $li.next(".ulMenu-lv2");
				if(link){
					Page.mainFrame.attr("src", link);
				}
				if (sub.length) {
					if (Page.currentLv1Menu) {
						if (Page.currentLv1Menu[0] === this) {
							Page.currentLv1Menu.next(".ulMenu-lv2").slideToggle('fast');
							return;
						}
						Page.currentLv1Menu.removeClass("menu-lv1-active").next(".ulMenu-lv2").slideUp('fast');
					}
					sub.slideToggle('fast');
					Page.currentLv1Menu = $li.addClass("menu-lv1-active") ;
				}
			});

			//lv2 menu item click
			Page.menuBar.delegate(".menu-lv2", "click", function (evt) {
				evt.stopImmediatePropagation();
				var t = (new Date).getTime() ;
				//log(Page.voidRapidClicks , t - Page.voidRapidClicks) ;
				if(t - Page.voidRapidClicks > 500){
					Page.voidRapidClicks = t ;
					//var $li = $(this) , $p = $li.parents('.ulMenu-lv2').siblings('.menu-lv1');
					var $li = $(this) , $p = $li;

					Page.route.html(' > ' + $p.text()) ;// + ' > ' + $li.text()
					if (Page.currentLv2Menu) {
						Page.currentLv2Menu.removeClass("menu-lv2-active");
					} else { // 清除默认选项
						$("#sideBar").find(".menu-lv2").eq(0).removeClass("menu-lv2-active");						
					}
					Page.currentLv2Menu = $li.addClass("menu-lv2-active");
				}
				else return false ;
			});


			//sign out function
			$('#aSignout').click(function(){
				fy.confirm("<div style='margin: 0 30px 12px 30px;line-height: 22px;'><label><input name='iptSignOut' type='radio' value='logOff'>退出后自动关闭页面</label><br>" +
						"<label><input name='iptSignOut' type='radio' value='change' checked>重新登录</label></div>" ,
						function () {
							if($(':radio[name="iptSignOut"]:checked').val() !== 'change') {
								try {

									window.opener = null;
									window.open('' , '_self');
									window.close() ;
								}
								catch(e){
									$.ajax({
										type:'post',
										url:'session.update.action',
										dataType:'json',
										success:function(data){
											if(data.message=="success"){
												
											}else{
												swal("消息提示","系统错误","error");
											}
											
											
											
										},
										error:function(msg){
											swal("消息提示","系统错误","error");
										}
										
									});
									$.cookie('userName',null);
									$.cookie('userCode',null);
									$.cookie('market',null);
									window.location.replace("login.html");
								}
							}
							else{
								$.ajax({
									type:'post',
									url:'session.update.action',
									dataType:'json',
									success:function(data){
										if(data.message=="success"){
											
										}else{
											swal("消息提示","系统错误","error");
										}
										
										
										
									},
									error:function(msg){
										swal("消息提示","系统错误","error");
									}
									
								});
								$.cookie('userName',null);
								$.cookie('userCode',null);
								$.cookie('market',null);
								window.location.replace("login.html");
							} 
								
						},
						{
							title : "<img src='img/assets/shutdown.png' align='absmiddle'> 您确定要退出系统吗？"
						});
			});
		},
		bindMenu: function (data) {
			Page.menuBar.bindList({
				list: data,
				template: '<li><div class="menu-lv1" data-link="{link}"><i class="icon icon-{icon}"></i> {text}</div></li>',
				onBound: function (arr) {
					var l = arr.length , i = 0 , $lists = this.find('li');
					for (; i < l; i++) {
						var data = arr[i].children;
						if (data && data.length) {
							$('<ul class="ulMenu-lv2" style="display: block;"></ul>').appendTo($lists[i]).bindList({
								list: data,
								template: '<li class="menu-lv2"><a href="{link}" target="mainFrame">{text}</a></li>'
							});
							if (i==0) {
								var $result=$(this).find("li .menu-lv2");
								console.log($result[0]);

								$(this).find("li .menu-lv2:first").addClass("menu-lv2-active");
							} 
						}
					}
				}
			})
		},
		init: function (json) {
			$('#spanTasks').text(json.tasks) ;
			this.bindMenu(json.data);
			this.addEventListeners();
		},
		doFullScreen: (function () {
			var isFull = false;
			return function (src) {
				if (isFull) {
					fy.runPrefixMethod(document, "CancelFullScreen") || fy.runPrefixMethod(document, "ExitFullscreen");
					isFull = false;
					$(src).html('<i class="icon icon-share"></i> 全屏');
				}
				else {
					fy.runPrefixMethod(document.documentElement, "RequestFullScreen") || fy.runPrefixMethod(document.documentElement, "RequestFullscreen");
					isFull = true;
					$(src).html('<i class="icon icon-share"></i> 还原');
				}
			};
		})() ,
		changePassword : (function(){
			
			var form = $('<form style="width: 460px; padding-bottom: 10px;" id="passwordForm">' +
							'<label>原有密码： <input name="old_password" type="password" style="width:150px;"/></label><br/><br/>' +
							'<label>新设密码： <input name="new_password" type="password" style="width:150px;"/></label> <span class="fLightGray"> (密码建议6位以上，字母数字混合)</span><br/><br/>' +
							'<label>重新输入： <input name="again_password" type="password" style="width:150px;"/></label> <span class="fLightGray"> (再次确认您要修改的密码)</span>'+'<input style="display:none" id="userCode" name="userCode"/></form>') ,
					
					pop = fy.confirm(form , function(){
						$("#userCode").val($.cookie('userCode'));
						var obj = form.fieldsToJson();

						if (obj.new_password != obj.again_password)
							sys.warn("新密码两次输入不同！");

						else if (!obj.old_password)
							sys.warn("原密码不能为空！");

						else if (!obj.new_password)
							sys.warn("新密码不能为空！");

						else {
							
							delete obj.again_password;
							
							
							$.ajax({
								type:'post',
								url:'passWord.edit.action',
								dataType:'json',
								data: obj,
								success:function(data){
									if(data.responseCode=="S0002"){
//										var username = data.carCalculate.add.user.userNme
										pop.hide();
										swal("消息提示","修改成功","success");
										
									}
									else if(data.responseCode=="passError"){
										pop.hide();
										swal("消息提示","原密码错误","error");
										$("#passwordForm")[0].reset();
									}
									else{
										pop.hide();
										swal("消息提示","修改失败","error");
										$("#passwordForm")[0].reset();
									}
									
									
									
								},
								error:function(msg){
									swal("消息提示","系统异常","error");
								}
								
							});
							/* fy.server.editPassword.post(obj, function(){
								pop.hide();
								sys.ok('修改成功');
							}); */
						}
						return true;
					} , {
						title: '修改密码' ,
						closeable : true ,
						show : false ,
						unloadOnHide : false
					});

			return function(){
				form[0].reset() ;
				pop.show();
			}
		})()
	};
	
	
	
	/* var topBarApp = angular.module('topBarApp',['ngCookies']);
	topBarApp.controller("topBarController",function($scope,$cookieStore){
		$scope.start = function(){
			$scope.username = $cookieStore.get("userInfo");
			console.log($scope.username);
		}
	});  */
/* 	angular.bootstrap(document.getElementById("topBar"),['topBarApp']); */