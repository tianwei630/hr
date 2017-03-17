
var sys = {
	debug : (fy.server.isLocal===true) ,//是否打开调试模式，正式部署时亦可明确设为false
	rootPath : "" , //网站虚拟路径根，务必确认必须以斜杠开头和结尾
	timeZone : (new Date).getTimezoneOffset() ,  //时区偏移,自动值,中国是+8,不宜手工修改
	//系统小图标
	ico:{
		ok :  "img/flat_icons/Ok_check_yes_tick_accept_success_green_correct.png" ,
		error : "img/flat_icons/Error_warning_alert_attention_remove_dialog.png" ,
		warn :  "img/flat_icons/Danger_hanger_triangle_traffic_cone.png" ,
		info:  "img/flat_icons/Info_information_user_about_card_button_symbol.png" ,
		confirm :"img/flat_icons/Confirmation_verification_validation_testimony.png"
	},

	//系统级错误显示
	error : function(err , callBack , opt){
		fy.alert(sys.ico.error + '<div class="tipText">' + err + '</div>' , callBack , opt);
	},
	//系统级警告
	warn : function(err , callBack , opt){
		fy.alert(this.ico.warn + '<div class="tipText">' + err + '</div>' , callBack , opt);
	},
	//系统级成功
	ok : function(err , callBack , opt){
		fy.alert(this.ico.ok + '<div class="tipText">' + err + '</div>' , callBack , opt);
		alert($(".boxy-wrapper").html());
		$(".boxy-wrapper").css({"top":"900px","font-size":"20px"});
	},
	//系统级一般信息
	alert : function(err , callBack , opt){
		fy.alert(this.ico.info + '<div class="tipText">' + err + '</div>' , callBack , opt);
	},
	//系统级确认窗口
	confirm : function(err , callBack , opt){
		fy.confirm(this.ico.confirm + '<div class="tipText">' + err + '</div>' , callBack||fy.EMPTY_FN , opt);
	},
	//子窗口获得自己的fyWin句柄
	getMyBoxy:function(toWin){
		//var target = toWin || window.top;
		var win = toWin || window  , handler = null;
		if(win === top){
			handler = win.fy.popupManager.get(win.frameElement) ;
		}
		else if(win.frameElement && win.parent.window.fy){
			handler = win.parent.window.fy.popupManager.get(win.frameElement) ;
		}
		return handler ;
	} ,
	//ajax functions
	ajaxHandlers : 0 ,
	ajaxLoadingTimer : 0 ,
	ajaxLoadingShow : function(){
		sys.fyAjaxLoading.stop(true,true).fadeIn();
	} ,
	ajaxLoadingHide : function(){
		sys.fyAjaxLoading.stop(true,true).fadeOut();
	} ,
	init : function(){
		log(this.debug) ;

		this.fyAjaxLoading = $('<div id="fyAjaxLoading"><div id="fyAjaxLoadingText">数据传送中，请稍候...</div></div>').appendTo("body") ;


		//customize the ajax error message shower
		fy.onAjaxError = this.error;

		fy.serverRootPath = sys.rootPath ;


		for(var att in this.ico)
			this.ico[att] = '<img src="' + this.rootPath + this.ico[att].replace(/^['/']/ , '') +'" class="tipIco">' ;

	}
};

sys.init();


//jQuery ajax global setting
$.ajaxSetup({
	beforeSend:function(jqXHR, settings) {
		if(!sys.ajaxHandlers){
			if(self!=top) {
				if(sys.ajaxLoadingTimer) clearTimeout(sys.ajaxLoadingTimer) ;
				sys.ajaxLoadingTimer = 0 ;
				sys.ajaxLoadingShow();
			}
		}
		sys.ajaxHandlers++ ;
	},
	complete:function(jqXHR, textStatus) {
		sys.ajaxHandlers-- ;
		if(!sys.ajaxHandlers) {
			if(self!=top) sys.ajaxLoadingTimer = setTimeout(sys.ajaxLoadingHide , 50) ;
		}
	},
	cache : false,
	timeout : 30000 ,
	dataType: 'json' ,
	error : function(jqXHR, textStatus, errorThrown) {
		var code = jqXHR.status ;
		if(sys.debug){
			if (code === 0 || code === 200) return ;
			if(code === 401 || code === 403){
				sys.error("权限不足，您可能需要重新登录。", function() {
					top.window.location.replace(sys.loginPage);
				});
				//if(top.welcomeScreen) top.welcomeScreen.hide();
				setTimeout(function(){
					top.window.location.replace(sys.loginPage);
				} , 5000) ;
			}
			else sys.error("服务器错误：" + code + "，<br/>" + errorThrown);
		}
		else {
			//应某章要求，直接踢出系统
			if (code !== 0 && code !== 200) {
				top.window.location.replace(sys.loginPage);
			}
		}
	}
});
