/*=========== by sutanwei@purple-river.com ===========*/
/* dependencies: Jquery, Jquery.blockui
/*=================================================*/
/**
 * 加载Mask定义
 */
;(function($) {
    $.LoaderMask = {
    	option: {
    		title: "数据传送中,请稍后...",
    		isFlag: false
    	},	
        loading: function(options) {
        	var option = $.extend({}, $.LoaderMask.option, options);
    		if (option.isFlag) {
    			$.blockUI({
    				message: option.title, 
    				css: { 
    					width: '16%',
    					left: '40%',
    					height:'30px',
    					backgroundColor: '#fff', 
    					'-webkit-border-radius': '6px', 
    					'-moz-border-radius': '6px', 
    					opacity: .8, 
    					color: '#51a351',   
    					border: '2px solid #5bb75b'
    				},overlayCSS:  {
    					backgroundColor: '#777',
    					opacity: 0.3
    				}
    			}); 
    			$(".blockUI").css({"padding-top":"8px"});
    		} else {
    			$.unblockUI();
    		}
    	}
    };
})(jQuery); 