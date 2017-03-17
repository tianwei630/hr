/*
 * xiaoxiaosu
 */

$(function(){
	// ini 
	var isFound = false;
	
	/*
	 * 初始化日期控件
	 */
	
	

					

	// 选择保障  交强险
	//$("#isCompulsoryInsurance").click(function(){
	//	if($("#isCompulsoryInsurance").attr("checked")) {
	//		$("#compulsoryInsuranceInfo").removeClass("hide").addClass("show");
	//	} else {
	//		$("#compulsoryInsuranceInfo").removeClass("show").addClass("hide");
	//	}
	//});
	$("#ctrl_isShowForceFactor").live("click",function(){
		if(!isFound) {
			isFound = true;
			$("#ctrl_isShowForceFactor span:first").removeClass("plus").addClass("minus");
			$("#addInsuranceTypeInfo").removeClass("hide").addClass("show");
		} else {   
			isFound = false;
			$("#ctrl_isShowForceFactor span:first").removeClass("minus").addClass("plus");
			$("#addInsuranceTypeInfo").removeClass("show").addClass("hide");
		}
		// event.preventDefault()
	});	
	$("#ctrl_isShowTaxInfo").live("click",function(){
		if(!isFound) {
			isFound = true;
			$("#ctrl_isShowTaxInfo span:first").removeClass("plus").addClass("minus");
			$("#addTaxInfo").removeClass("hide").addClass("show");
		} else {   
			isFound = false;
			$("#ctrl_isShowTaxInfo span:first").removeClass("minus").addClass("plus");
			$("#addTaxInfo").removeClass("show").addClass("hide");
		}
		// event.preventDefault()
	});

	$("#jqxDetail").live("click",function(){
		if(!isFound) {
			isFound = true;
			$("#jqxDetail span:first").removeClass("plus").addClass("minus");
			$("#showjqxInfo").removeClass("hide").addClass("show");
		} else {
			isFound = false;
			$("#jqxDetail span:first").removeClass("minus").addClass("plus");
			$("#showjqxInfo").removeClass("show").addClass("hide");
		}
		// event.preventDefault()
	});

	$("#taxType").find("input[type='radio']").click(function(){
		// checked  3M 1N 2W 4J 免税  缴税 已完税 减税
		var temp = $(this).val();
		if(temp == "3M" || temp == "2W" || temp == "4J") {
			$("#addTaxItemInfo").show();
		} else {
			$("#addTaxItemInfo").hide();
		}
	});
	// 商业险
	//$("#isCommercialInsurance").click(function(){
	//	if($("#isCommercialInsurance").attr("checked")) {
	//		$("#commercialInsuranceInfo").removeClass("hide").addClass("show");
	//		$("#addPremiumInfo").removeClass("hide").addClass("show");
	//	} else {
	//		$("#commercialInsuranceInfo").removeClass("show").addClass("hide");
	//		$("#addPremiumInfo").removeClass("hide").addClass("show");
	//	}
	//});
	$("#ctrl_isSYShowForceFactor").live("click",function(){
		if(!isFound) {
			isFound = true;
			$("#ctrl_isSYShowForceFactor span:first").removeClass("plus").addClass("minus");
			$("#addSYRateInfo").removeClass("hide").addClass("show");
			$("#claimInfo").removeClass("hide").addClass("show");
		} else {   
			isFound = false;
			$("#ctrl_isSYShowForceFactor span:first").removeClass("minus").addClass("plus");
			$("#addSYRateInfo").removeClass("show").addClass("hide");
			$("#claimInfo").removeClass("show").addClass("hide");
		}
	});		
	$("#ctrl_isShowOtherInfo").live("click",function(){
		if(!isFound) {
			isFound = true;
			$("#ctrl_isShowOtherInfo span:first").removeClass("plus").addClass("minus");
			$("#addOtherInsInfo").removeClass("hide").addClass("show");
		} else {   
			isFound = false;
			$("#ctrl_isShowOtherInfo span:first").removeClass("minus").addClass("plus");
			$("#addOtherInsInfo").removeClass("show").addClass("hide");
		}
	});	
	/*$("#tabInsSYType tr").each(function(index, element) {
        $(this).children("td:first").find("input[type='checkbox']").click(function(){
			var typeNum = $(this).val();
			var isFlag = $(this).attr("checked");
			if(typeNum == "001" && isFlag) {
				$("#tabInsSYType").find(".add-temp").removeClass("hide");
				$("#tabInsSYType").find(".add-temp tr").addClass("show");
				$("#addOtherInsInfo").find(".add-temp").removeClass("hide");
				$("#addOtherInsInfo").find(".add-temp tr").addClass("show");
			} else if(typeNum = "001" && !isFlag) { 
				$("#tabInsSYType").find(".add-temp").removeClass("show").addClass("hide");
				$("#addOtherInsInfo").find(".add-temp").removeClass("show").addClass("hide");
			}
			if(typeNum == "002" && isFlag) {
				$("#addOtherInsInfo").find(".add-tempB").removeClass("hide");
				$("#addOtherInsInfo").find(".add-tempB tr").addClass("show");
			} else if(typeNum = "002" && !isFlag) { 
				$("#addOtherInsInfo").find(".add-tempB").removeClass("show").addClass("hide");
			}			
			
		});
    });*/

});