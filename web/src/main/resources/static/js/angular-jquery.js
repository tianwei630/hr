$(document).ready(function() {

    //返回顶部
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }




//自定义校验规则
    jQuery.validator.addMethod("numbercheck", function (value, element, param) {

        return this.optional(element) || ( value % 50 == 0);
    }, $.validator.format("请输入50的整数倍！"));
// 身份证号码验证
    jQuery.validator.addMethod("isIdCardNo", function (value, element) {
        // var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
        return this.optional(element) || isIdCardNo(value);
    }, "请输入正确的身份证号码");
//日期格式校验
    jQuery.validator.addMethod("formatDateCheck", function (value, element, param) {
        return this.optional(element) || formatDateCheck(value);
    }, $.validator.format("请输入正确的日期格式(yyyy-mm-dd)！"));

//日期格式校验
    function formatDateCheck(value) {
        var regPattern = /^(19|20)\d\d(-)(0[1-9]|1[012])(-)(0[1-9]|[12][0-9]|3[01])$/;
        var checkArray = value.match(regPattern);
        if (checkArray == null) {
            console.log('Please enter valid date.');
            return false;
        }
        return true;
    }

//获取当前浏览器类型
    function getBrowserInfo(){
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
        var m = ua.match(re);
        Sys.browser = m[1].replace(/version/, "'safari");
        Sys.ver = m[2];
        return Sys;
    }
// 身份证号码的验证规则
    function isIdCardNo(num) {
        var idcard = num;
        if (idcard == "") {
            return true;
        }
        var regex1 = /^[1-9][0-7]\d{4}((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))\d{3}(\d|X|x)?$/;
        /*身份号码位数及格式检验*/
        switch (idcard.length) {
            case 15:
                if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 )) {
                    var regex2 = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
                } else {
                    var regex2 = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
                }

                if (regex2.test(idcard))
                    return true;
                else
                    return false;
                break;
            case 18:
                if (regex1.test(idcard)) {
                    var S = (parseInt(idcard[0]) + parseInt(idcard[10])) * 7 + (parseInt(idcard[1]) + parseInt(idcard[11])) * 9 + (parseInt(idcard[2]) + parseInt(idcard[12])) * 10 + (parseInt(idcard[3]) + parseInt(idcard[13])) * 5 + (parseInt(idcard[4]) + parseInt(idcard[14])) * 8 + (parseInt(idcard[5]) + parseInt(idcard[15])) * 4 + (parseInt(idcard[6]) + parseInt(idcard[16])) * 2 + parseInt(idcard[7]) * 1 + parseInt(idcard[8]) * 6 + parseInt(idcard[9]) * 3;
                    var Y = S % 11;
                    var M = "F";
                    var JYM = "10X98765432";
                    M = JYM.substr(Y, 1);
                    /*判断校验位*/
                    if (M == idcard[17].toUpperCase()) {
                        //alert(Errors[0]+"18");
                        return true;
                    } else {
                        //alert(Errors[3]);
                        //showErrMsg = Errors[3];
                        return false;
                    }
                } else {
                    return false;
                }
                break;
            default:
                //alert(Errors[1]);
                //showErrMsg = Errors[1];
                return false;
        }
    };
// 表单验证
    var quicklyQueryValidate = $("form[name='quicklyQuery']").validate({
        rules: {
            licenseNo: {
                required: true,
                minlength: 6,
                maxlength: 11,

            }
        },
        errorClass: "help-inline",  //help-block
        errorElement: "span",
        highlight: function (element, errorClass, validClass) {
            $(element).tooltip({placement: 'bottom'});
            $(element).css({'background-color': '#FFED86', 'border-color': 'rgba(236, 168, 82, 0.8)'});
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).css({'background-color': '', 'border-color': ''});
        },
        messages: {
            licenseNo: {
                required: "车牌号不能为空",
                minlength: "车牌号不能小于6位",
                maxlength: "车牌号不能超过11位"
            }
        }
    });
//    车辆公允价值验证
    /* var fairMarketValueValidate = $("form[name='carForm']").validate({
     rules:{
     fairMarketValue:{

     min:function() {
     return parseFloat($('#actualValue').val())*0.7;
     },
     max:function() {
     return parseFloat($('#actualValue').val())*1.3;
     }

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
     fairMarketValue: {
     min: "市场公允价值必须大于{0}！",
     max: "市场公允价值必须小于{0}！"}
     }
     }); */


//    浮动系数 checkProtection  repairRate

    var combosValidate = $("form[name='checkProtection']").validate({
        rules: {
            repairRate: {

                min: function () {
                    if ($('#importFlag').val() == 'A') {
                        return 15;
                    }
                    else {
                        return 10;
                    }
                },
                max: function () {
                    if ($('#importFlag').val() == 'A') {
                        return 60;
                    }
                    else {
                        return 30;
                    }
                }
            },
            repairQuantity: {
                min: 0,
                max: 90
            },
            repairUnitAmount: {
                min: 0,
                max: 300
            },
            dqAmount: {
                min: 0,
                max: function () {
                    return $('#csAmount').val();
                }
            },
            zrAmount: {
                min: 0,
                max: function () {
                    return $('#csAmount').val();
                }
            },
            thirdAmount: {
                min: 150,
                numbercheck: true
            },
            cargoAmount: {
                range: [10000, 200000]
            },
            mentalAmount: {
                range: [10000, 200000]
            }
        },
        errorClass: "help-inline",  //help-block
        errorElement: "span",
        highlight: function (element, errorClass, validClass) {
            $(element).tooltip({placement: 'bottom'});
            $(element).css({'background-color': '#FFED86', 'border-color': 'rgba(236, 168, 82, 0.8)'});
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).css({'background-color': '', 'border-color': ''});
        },
        messages: {
            repairRate: {
                min: "浮动系数必须大于{0}！",
                max: "浮动系数必须小于{0}！"
            },
            repairQuantity: {
                min: "天数必须大于{0}！",
                max: "天数必须小于{0}！"
            },
            repairUnitAmount: {
                min: "金额必须大于{0}！",
                max: "金额必须小于{0}！"
            },
            dqAmount: {
                min: "金额必须大于{0}!",
                max: "金额必须小于车损险金额{0}!"
            },
            zrAmount: {
                min: "金额必须大于{0}!",
                max: "金额必须小于车损险金额{0}!"
            },
            thirdAmount: {
                min: "金额必须大于{0}!",
                numbercheck: "请输入50的整数倍！"
            },
            cargoAmount: {
                range: "金额必须在{0}和{1}之间！"
            },
            mentalAmount: {
                range: "金额必须在{0}和{1}之间！"
            }
        }
    });
    var insuredFormValidate = $("form[name='insuredForm']").validate({
        rules: {
            insuredName: {
                required: true,
                rangelength: [2, 40]
            },
            idCard: {
                required: true,
                isIdCardNo: {
                    depends: function () {
                        if ($('#insuredIdentifyType').val() == 'string:01') {
                            return true;
                        }
                        return false;
                    }
                }
            }
        },
        errorClass: "help-inline",  //help-block
        errorElement: "span",
        highlight: function (element, errorClass, validClass) {
            $(element).tooltip({placement: 'bottom'});
            $(element).css({'background-color': '#FFED86', 'border-color': 'rgba(236, 168, 82, 0.8)'});
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).css({'background-color': '', 'border-color': ''});
        },
        messages: {
            insuredName: {
                required: "名称不能为空",
                rangelength: "名称输入长度必须介于 2和 40 之间"
            },
            idCard: {
                required: "证件号不能为空"

            }
        }
    });

    var ownerFormValidate = $("form[name='ownerForm']").validate({
        rules: {
            username: {
                required: true,
                rangelength: [2, 40]
            },
            idCard: {
                required: true
            }
        },
        errorClass: "help-inline",  //help-block
        errorElement: "span",
        highlight: function (element, errorClass, validClass) {
            $(element).tooltip({placement: 'bottom'});
            $(element).css({'background-color': '#FFED86', 'border-color': 'rgba(236, 168, 82, 0.8)'});
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).css({'background-color': '', 'border-color': ''});
        },
        messages: {
            username: {
                required: "名称不能为空",
                rangelength: "名称输入长度必须介于 2和 40 之间"
            },
            idCard: {required: "证件号不能为空"}
        }
    });

    var insuranceDeadlineValidate = $("form[name='insuranceDeadline']").validate({
        rules: {
            bzStartDate: {
                required: {
                    depends: function () {
                        var _checked = $('#isCompulsoryInsurance')[0].checked;
                        return _checked
                    }
                },
                date: true
            },
            bzEndDate: {
                required: {
                    depends: function () {
                        var _checked = $('#isCompulsoryInsurance')[0].checked;
                        return _checked
                    }
                },
                date: true
            },
            startDate: {
                required: {
                    depends: function () {
                        var _checked = $('#isCommercialInsurance')[0].checked;
                        return _checked
                    }
                },
                date: true
            },
            endDate: {
                required: {
                    depends: function () {
                        var _checked = $('#isCommercialInsurance')[0].checked;
                        return _checked
                    }
                },
                date: true
            }
        },
        errorClass: "help-inline",  //help-block
        errorElement: "span",
        highlight: function (element, errorClass, validClass) {
            $(element).tooltip({placement: 'bottom'});
            $(element).css({'background-color': '#FFED86', 'border-color': 'rgba(236, 168, 82, 0.8)'});
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).css({'background-color': '', 'border-color': ''});
        },
        messages: {
            bzStartDate: {
                required: "交强险起保日期不能为空",
                date: "请输入正确格式的日期"
            },
            bzEndDate: {
                required: "交强险终保日期不能为空",
                date: "请输入正确格式的日期"
            },
            startDate: {
                required: "商业险起保日期不能为空",
                date: "请输入正确格式的日期"
            },
            endDate: {
                required: "商业险终保日期不能为空",
                date: "请输入正确格式的日期"
            }
        }
    });



    var carFormValidate = $("form[name='carForm']").validate({
        rules: {
            carKindCode: {
                required: true
            }, useNatureCode: {
                required: true
            }, enrollDate: {
                required: true
            }, carModel: {
                required: true
            }, licenseNo: {
                required: function () {
                    var _checked = $("#newCarFlag")[0].checked;
                    return !(_checked);
                },
                minlength: 6,
                maxlength: 11
            }, engineNo: {
                required: true
            }, frameNo: {
                required: true,
                rangelength: [11, 17]
            }, purchasePrice: {
                required: true
            }, actualValue: {
                required: true
            }, seatCount: {
                required: true
            }, vehicleTonnage: {
                required: true
            }, exhaustCapacity: {
                required: true
            }, fairMarketValue: {
                min: function () {
                    return $('#actualValue').val() * 0.6;
                },
                max: function () {
                    return $('#actualValue').val() * 1.3;
                }
            },
            transferDate: {
                required: {
                    depends: function () {

                        if ($('#specialCarFlag').val() == '1') {
                            return true;
                        }
                        return false;
                    }
                },
                formatDateCheck: true
            }
        },
        errorClass: "help-inline",  //help-block
        errorElement: "span",
        highlight: function (element, errorClass, validClass) {
            $(element).tooltip({placement: 'bottom'});
            $(element).css({'background-color': '#FFED86', 'border-color': 'rgba(236, 168, 82, 0.8)'});
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).css({'background-color': '', 'border-color': ''});
        },
        messages: {
            carKindCode: {required: "车辆种类不能为空"},
            useNatureCode: {required: "使用性质不能为空"},
            enrollDate: {required: "初次登记日期不能为空"},
            carModel: {required: "厂牌型号不能为空"},
            licenseNo: {
                required: "车牌号不能为空",
                minlength: "车牌号不能小于6位",
                maxlength: "车牌号不能超过11位"
            },
            engineNo: {required: "发动机号不能为空"},
            frameNo: {
                required: "车架号不能为空",
                rangelength: "车架号只允许录入17位"
            },
            purchasePrice: {required: "新车购置价不能为空"},
            actualValue: {required: "车辆实际价值不能为空"},
            seatCount: {required: "核定座位数不能为空"},
            vehicleTonnage: {required: "核定载重量不能为空"},
            exhaustCapacity: {required: "排气量不能为空"},
            fairMarketValue: {
                min: "市场公允价值不能小于{0}!",
                max: "市场公允价值不能大于{0}!"
            },
            transferDate: {
                required: "过户日期不能为空",
                date: "日期格式不正确"
            }
        }
    });

});