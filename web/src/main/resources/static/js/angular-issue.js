var app = angular.module('myApp', ['ngCookies', 'ui.bootstrap']);


app.controller('myController', function ($scope, $http, $modal, $log, $filter, $cookieStore) {
    //var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    //// Firefox 1.0+
    //var isFirefox = typeof InstallTrigger !== 'undefined';
    //// At least Safari 3+: "[object HTMLElementConstructor]"
    //var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    //// Internet Explorer 6-11
    //var isIE = /*@cc_on!@*/false || !!document.documentMode;
    //// Edge 20+
    //var isEdge = !isIE && !!window.StyleMedia;
    //// Chrome 1+
    //var isChrome = !!window.chrome && !!window.chrome.webstore;
    //// Blink engine detection
    //var isBlink = (isChrome || isOpera) && !!window.CSS;
    //
    //var output = 'Detecting browsers by ducktyping:<hr>';
    //output += 'isFirefox: ' + isFirefox + '<br>';
    //output += 'isChrome: ' + isChrome + '<br>';
    //output += 'isSafari: ' + isSafari + '<br>';
    //output += 'isOpera: ' + isOpera + '<br>';
    //output += 'isIE: ' + isIE + '<br>';
    //output += 'isEdge: ' + isEdge + '<br>';
    //output += 'isBlink: ' + isBlink + '<br>';
    //alert(output);


    //主要信息
    //$scope.mainInfo={
    //    "applicant": {
    //        "age": 0,
    //        "appliName": "",
    //        "identifyNumber": "",
    //        "identifyType": "",
    //        "insuredNature": "",
    //        "insuredType": ""
    //    },
    //    "bZRelationMain": {
    //        "carShipTaxFlag": "",
    //        "endDate_bz": "",
    //        "isEffectFlag": "",
    //        "premium_bz": "",
    //        "startDate_bz": ""
    //    },
    //    "carInfo": {
    //        "actualValue": "",
    //        "agreeDriverFlag": "",
    //        "areaCode": "",
    //        "areaName": "",
    //        "brandName": "",
    //        "carInsureRelation": "",
    //        "carKindCode": "",
    //        "carOwner": "",
    //        "carOwnerIdentifyNumber": "",
    //        "carOwnerIdentifyType": "",
    //        "carOwnerNature": "",
    //        "carPriceType": "",
    //        "carType": "",
    //        "clauseType": "",
    //        "completeKerbMass": 0,
    //        "ecdemicFlag": "",
    //        "engineNo": "",
    //        "enrollDate": "",
    //        "exhaustScale": 0,
    //        "frameNo": "",
    //        "fuleType": "",
    //        "importFlag": "",
    //        "licenseNo": "",
    //        "licenseType": "",
    //        "loanVehicleFlag": "",
    //        "newCarFlag": "",
    //        "noDamageYears": 0,
    //        "platmodelCode": "",
    //        "platmodelname": "",
    //        "purchasePrice": 0,
    //        "rbCode": "",
    //        "runMileRate": 0,
    //        "runMilers": 0,
    //        "seatCount": 0,
    //        "specialCarFlag": "",
    //        "tonCount": 0,
    //        "useNatureCode": "",
    //        "useYears": 0,
    //        "vehicleStyle": "",
    //        "wholeWeight": 0
    //    },
    //    "main": {
    //        "agentCode": "",
    //        "agentName": "",
    //        "agreementNo": "-01",
    //        "areaCode": "",
    //        "businessNature": "",
    //        "businessNatureName": "",
    //        "bzEndDate": "",
    //        "bzStartDate": "",
    //        "channelCode": "",
    //        "channelName": "",
    //        "classCode": "",
    //        "comCode": "",
    //        "combosFlag": "",
    //        "endDate": "",
    //        "endHour": "",
    //        "handler1Code": "",
    //        "handler1Name": "",
    //        "ilogRequestFlag": "",
    //        "inputDate": "",
    //        "isEffectFlag": "",
    //        "isSaveCombo": "",
    //        "isSaveSSProposal": "",
    //        "makeCom": "",
    //        "makeComName": "",
    //        "operateDate": "",
    //        "operateType": "",
    //        "operatorCode": "",
    //        "operatorName": "",
    //        "policySort": "",
    //        "premiumCalAgain": "",
    //        "relationFlag": "",
    //        "riskCode": "",
    //        "saveType": "",
    //        "startDate": "",
    //        "startHour": "",
    //        "tmkFlag": ""
    //    }
    //};


    $scope.mainInfo = {
        "insuredList": [{
            "insuredName": "",
            "insuredType": "1",
            "identifyType": "01",
            "identifyNumber": "",
            "mobile": "",
            "sex": null,
            "email": "",
            "postCode": "",
            "addressName": "",
            "linkerName": "",
            "customerCName": ""
        }, {
            "insuredName": "",
            "insuredType": "1",
            "identifyType": "01",
            "identifyNumber": "",
            "mobile": "",
            "sex": null,
            "email": "",
            "postCode": "",
            "addressName": "",
            "linkerName": "",
            "customerCName": ""
        }]
    };

    //日期
    var currentDate = new Date();
    var d = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    ;
    var day = d.getDate();
    var tomorrow = day
    if (tomorrow < 10) {
        tomorrow = "0" + tomorrow;
    }
    var today = year + "-" + month + "-" + tomorrow;

    $scope.getNextYearDay = function (lastdate) {

    }
    //$scope.mainInfo.main = {
    //    "startDate": today,
    //    //"endDate":nextYearDate,
    //    "bzStartDate": today
    //    //"bzEndDate":nextYearDate
    //}
    //$scope.mainInfo.main.startDate=today;
    //$scope.mainInfo.main.bzStartDate=today;
    //$scope.person = $cookieStore.get("haha");
    //alert($.cookie('userCode'));
    var userCode = $.cookie('userCode');
    var userName = $.cookie('userName');
    var agentCode = null;
    var agentName = null;
    var agreementNo = null;
    var operateDate = null;
    var operatorCode = null;
    var operatorName = null;
    //alert( $scope.person);
    var marketInfo = {
        "userCde": userCode,
        "operatorCode": userCode,
        "operatorName": userName
    }


    $scope.isInputchange = false;
    var personIdentifyType = [
        {"id": "01", "name": "居民身份证"},
        {"id": "02", "name": "居民户口簿"},
        {"id": "03", "name": "中国因公护照"},
        {"id": "04", "name": "军官证/警官证"},
        {"id": "05", "name": "驾驶证"},
        {"id": "06", "name": "台湾居民来往大陆通行证"},
        {"id": "08", "name": "士兵证"},
        {"id": "10", "name": "外国人永久居留证"},
        {"id": "12", "name": "香港身份证"},
        {"id": "14", "name": "往来港澳通行证"},
        {"id": "15", "name": "大陆居民往来台湾通行证"},
        {"id": "16", "name": "军官离退休证"},
        {"id": "17", "name": "港澳居民来往内地通行证"},
        {"id": "18", "name": "中国因私护照"},
        {"id": "19", "name": "外国护照"},
        {"id": "22", "name": "统一社会信用代码"},
        {"id": "99", "name": "其他个人证件"},

    ]
    var groupIdentifyType = [
        {"id": "07", "name": "组织机构代码证"}
    ]
    $scope.identifyTypeArr = personIdentifyType;


    // 初始化下拉框数据
    $scope.cusRadio = function (e) {
        if (e == 1) {
            $scope.identifyTypeArr = personIdentifyType;
            $scope.mainInfo.insuredList[1].identifyType = $scope.identifyTypeArr[0].id;
        } else {
            $scope.identifyTypeArr = groupIdentifyType;
            $scope.mainInfo.insuredList[1].identifyType = $scope.identifyTypeArr[0].id;
        }
    };
    //设置车主证件类型显示
    $scope.ownerIdentifyTypeArr = personIdentifyType;
    $scope.setOwnerIdentifyType = function (value) {
        if (value == '7') {
            $scope.ownerIdentifyTypeArr = personIdentifyType;
            $scope.mainInfo.insuredList[0].identifyType = $scope.ownerIdentifyTypeArr[0].id;
        }
        else {
            $scope.ownerIdentifyTypeArr = groupIdentifyType;
            $scope.mainInfo.insuredList[0].identifyType = $scope.ownerIdentifyTypeArr[0].id;
        }
    }
    //客车
    $scope.busarr = [
        {"id": "K11", "name": "大型双层客车"},
        {"id": "K12", "name": "大型普通客车"},
        {"id": "K13", "name": "大型卧铺客车"},
        {"id": "K14", "name": "大型铰接客车"},
        {"id": "K15", "name": "大型越野客车"},
        {"id": "K21", "name": "中型普通客车"},
        {"id": "K22", "name": "中型双层客车"},
        {"id": "K23", "name": "中型卧铺客车"},
        {"id": "K24", "name": "中型铰接客车"},
        {"id": "K25", "name": "中型越野客车"},
        {"id": "K31", "name": "小型普通客车"},
        {"id": "K32", "name": "小型越野客车"},
        {"id": "K33", "name": "轿车"}
    ]
    //货车
    $scope.cargoCararr = [
        {"id": "H11", "name": "重型普通货车"},
        {"id": "H12", "name": "重型厢式货车"},
        {"id": "H13", "name": "重型封闭货车"},
        {"id": "H14", "name": "重型罐式货车"},
        {"id": "H15", "name": "重型平板货车"},
        {"id": "H16", "name": "重型集装箱车"},
        {"id": "H17", "name": "重型自卸货车"},
        {"id": "H18", "name": "重型特殊结构货车"},
        {"id": "H21", "name": "中型普通货车"},
        {"id": "H22", "name": "中型厢式货车"},
        {"id": "H23", "name": "中型封闭货车"},
        {"id": "H24", "name": "中型罐式货车"},
        {"id": "H25", "name": "中型平板货车"},
        {"id": "H26", "name": "中型集装箱车"},
        {"id": "H27", "name": "中型自卸货车"},
        {"id": "H28", "name": "中型特殊结构货车"},
        {"id": "H31", "name": "轻型普通货车"},
        {"id": "H32", "name": "轻型厢式货车"},
        {"id": "H33", "name": "轻型封闭货车"},
        {"id": "H34", "name": "轻型罐式货车"},
        {"id": "H35", "name": "轻型平板货车"},
        {"id": "H37", "name": "轻型自卸货车"},
        {"id": "H38", "name": "轻型特殊结构货车"},
        {"id": "H41", "name": "微型普通货车"},
        {"id": "H42", "name": "微型厢式货车"},
        {"id": "H43", "name": "微型封闭货车"},
        {"id": "H44", "name": "微型罐式货车"},
        {"id": "H45", "name": "微型自卸货车"},
        {"id": "H46", "name": "微型特殊结构货车"}
    ]
    $scope.carArr = $scope.busarr;
    $scope.setCarArr = function (carKind) {
        if (carKind == 'A0') {
            $scope.carArr = $scope.busarr;
            $scope.mainInfo.carInfo.carType = $scope.busarr[12].id;
        }
        if (carKind == 'H0') {
            $scope.carArr = $scope.cargoCararr;
            $scope.mainInfo.carInfo.carType = $scope.cargoCararr[0].id;
        }
    }
    //$scope.groupCert =


    // 时间
    /* var bzStartDateChange = function (){
     alert(1);
     var datetime = $("#insuranceDeadline").find("input[name='bzStartDate']").val();
     alert(datetime);
     $scope.mainInfo.main.bzStartDate =datetime;
     }; */

//        $scope.mainInfo.insuredList[1].identifyType='02';
    /**
     * 险别列表，报价模块
     */
    $scope.mainInfo.combosList = [];
//        $scope.mainInfo.combosList[0].itemKindList[0].amount="";
    $scope.mainInfo.combosList[0] = {
        "itemKindList": [{
            "KindCode": "",
            "amount": "",
            "m1Value": "",
            "deductableFlag": "",
            "rateFactor": "",
            "benchMarkPremium": "",
            "premium": ""
        }]
    };
//日期
//    var d = new Date();
//    var year = d.getFullYear();
//    var month = d.getMonth() + 1;
//    if (month < 10) {
//        month = "0" + month;
//    }
//    ;
//    var day = d.getDate();
//    var tomorrow = day + 1
//    if (tomorrow < 10) {
//        tomorrow = "0" + tomorrow;
//    }
//    var today = year + "-" + month + "-" + tomorrow;


    //$scope.mainInfo.main = {
    //    "startDate": today,
    //    //"endDate":nextYearDate,
    //    "bzStartDate": today
    //    //"bzEndDate":nextYearDate
    //}
    //$scope.mainInfo.main.startDate=today;
    //$scope.mainInfo.main.bzStartDate=today;
    //标记是否选中对应险种
    $scope.kind = [];

    $scope.carDeviceList = [
        {"deviceName": "", "actualValue": ""},
        {"deviceName": "", "actualValue": ""},
        {"deviceName": "", "actualValue": ""},
        {"deviceName": "", "actualValue": ""}
    ]


    $scope.temp = [];
    $scope.temp[0] = {
        "itemKindList": [{
            "kindCode": "",
            "amount": "",
            "m1Value": "",
            "deductableFlag": "",
            "rateFactor": ""


        }]
    };
    $scope.temp[1] = {
        "itemKindList": [{
            "kindCode": "",
            "amount": "",
            "m1Value": "",
            "deductableFlag": "",
            "rateFactor": ""


        }]
    };
//返回险种信息
    $scope.combosData = {};

    //基本险种
    $scope.temp[0].itemKindList = [
        {"kindCode": "001", "kindName": "机动车损失保险", "deductableFlag": "0"},
        {"kindCode": "002", "kindName": "机动车第三者责任保险", "deductableFlag": "0"},
        {"kindCode": "007", "kindName": "机动车全车盗抢保险", "deductableFlag": "0"},
        {"kindCode": "003", "kindName": "机动车车上人员责任保险（司机）", "deductableFlag": "0"},
        {"kindCode": "006", "kindName": "机动车车上人员责任保险（乘客）", "deductableFlag": "0"},
        {"kindCode": "205", "kindName": "机动车划痕损失险", "deductableFlag": "0"},
        {"kindCode": "201", "kindName": "玻璃单独破碎险", "deductableFlag": "0"},
        {"kindCode": "202", "kindName": "自燃损失险", "deductableFlag": "0"},
        {"kindCode": "206", "kindName": "发动机涉水损失险", "deductableFlag": "0"},
        {"kindCode": "210", "kindName": "机动车损失保险无法找到第三方特约险", "deductableFlag": "0"},
        {"kindCode": "211", "kindName": "指定修理厂险", "deductableFlag": "0"},
        {"kindCode": "203", "kindName": "新增设备损失保险", "deductableFlag": "0"},
        {"kindCode": "208", "kindName": "车上货物责任险", "deductableFlag": "0"},
        {"kindCode": "215", "kindName": "精神损害抚慰金责任险", "deductableFlag": "0"},
        {"kindCode": "207", "kindName": "修理期间费用补偿险", "deductableFlag": "0"}

    ];


    //不计免赔险种
    $scope.temp[1].itemKindList = [
        {"kindCode": "301", "kindName": "不计免赔率险（机动车损失保险）", "deductableFlag": "0"},
        {"kindCode": "302", "kindName": "不计免赔率险（第三者责任保险）", "deductableFlag": "0"},
        {"kindCode": "306", "kindName": "不计免赔率险（全车盗抢保险）", "deductableFlag": "0"},
        {"kindCode": "303", "kindName": "不计免赔率险（机动车车上人员责任保险（司机））", "deductableFlag": "0"},
        {"kindCode": "305", "kindName": "不计免赔率险（机动车车上人员责任保险（乘客））", "deductableFlag": "0"},
        {"kindCode": "309", "kindName": "不计免赔率险（车身划痕损失险）", "deductableFlag": "0"},
        null,
        {"kindCode": "307", "kindName": "不计免赔率险（自燃损失险）", "deductableFlag": "0"},
        {"kindCode": "310", "kindName": "不计免赔率险（发动机涉水损失险）", "deductableFlag": "0"},
        null,
        null,
        {"kindCode": "308", "kindName": "不计免赔率险（新增设备损失保险）", "deductableFlag": "0"},
        {"kindCode": "311", "kindName": "不计免赔率险（车上货物责任险）", "deductableFlag": "0"},
        {"kindCode": "315", "kindName": "不计免赔率险（精神损害抚慰金责任险）", "deductableFlag": "0"},
        null
    ];

//       alert(JSON.stringify(all));

    $scope.mainInfo.carInfo = {
        "newCarFlag": "0",
        "carPriceType": "1"
    };


    $scope.selected = [];
    $scope.checkVal = function (queryInfo) {
        //if ($scope.quicklyQuery.$invalid) {
        //    //sys.alert('未录入检索条件');
        //    swal("", "未录入检索条件", "warning");
        //    return false;
        //}
        if (queryInfo === undefined || queryInfo == '') {
            swal("", "未录入检索条件", "warning");
            return false;
        }
        return true;
    };
//        设置不计免赔
    $scope.setDeductable = function (i) {
        if ($scope.kind[i] == 1) {
            $scope.temp[0].itemKindList[i].deductableFlag = 1;
        }
        if ($scope.kind[i] == 0) {
            $scope.temp[0].itemKindList[i].deductableFlag = 0;
            if (i == 0) {
                $scope.kind[5] = 0;
                $scope.kind[6] = 0;
                $scope.kind[7] = 0;
                $scope.kind[8] = 0;
                $scope.kind[9] = 0;
                $scope.temp[0].itemKindList[5].deductableFlag = 0;
                $scope.temp[0].itemKindList[6].deductableFlag = 0;
                $scope.temp[0].itemKindList[7].deductableFlag = 0;
                $scope.temp[0].itemKindList[8].deductableFlag = 0;
                $scope.temp[0].itemKindList[9].deductableFlag = 0;
            }
        }
    }
//    设置商业险和交强险的依赖关系
    $scope.setRiskCode = function (name) {
        //if($scope.syx==0){
        //    $scope.jqx=0
        //}
        if (name == 'jqx') {
            $scope.syx = 1;
            //$("#isCommercialInsurance").click();
        }
        if (name == 'syx') {
            if ($scope.syx == 0) {
                $scope.jqx = 0;
            }
            else {
                $scope.jqx = 1;
            }
        }
    }
//    计算性别
    $scope.calSex = function (identifyCode) {

        if (isIdCardNo(identifyCode)) {
            if (parseInt(identifyCode.substr(16, 1)) % 2 == 1) {
                $scope.mainInfo.insuredList[1].sex = 1;
            }
            else {
                $scope.mainInfo.insuredList[1].sex = 2;
            }

        }

    }

//  设置玻璃类型
//    $scope.getImportFlag=function(carInfo){
//
//        if($scope.temp[0].itemKindList[6].modeCode){
//             return parseInt($scope.temp[0].itemKindList[6].modeCode);
//            console.log('*********'+$scope.temp[0].itemKindList[6].modeCode);
//        }
//        else {
//            if(carInfo!==undefined&&carInfo!=null){
//                if(carInfo.importFlag=='A'){
//                    return '2';
//                }
//                else {
//                    return '1';
//                }
//            }
//            else {
//                return null;
//            }
//            console.log('##########'+$scope.temp[0].itemKindList[6].modeCode);
//        }
//
//    }
//    设置车损费率浮动系数
    $scope.setDefaultRepairRate = function (carInfo) {
        if (carInfo !== undefined && carInfo != null) {
            if (carInfo.importFlag == 'A') {
                //$scope.repairRate='60';
                return '60';
            }
            else {
                //$scope.repairRate='30';
                return '30';
            }
        }
    }

//    设置过户标志
    $scope.transfer = function (flag) {
        if (flag == '1') {
            $scope.mainInfo.carInfo.transferFlag = '1';
            $scope.mainInfo.carInfo.chgowerFlag = '1';
        }
        if (flag == '0') {
            $scope.mainInfo.carInfo.transferFlag = '0';
            $scope.mainInfo.carInfo.chgowerFlag = '0';
            $scope.mainInfo.carInfo.transferDate = null;
        }
    }


//        新增设备
    $scope.addDevice = function () {

        var modalInstance = $modal.open({
            templateUrl: 'addDevice.html',  //指向上面创建的视图
            controller: 'ModalDeviceCtrl',// 初始化模态范围
            size: 16, //大小配置
            resolve: {
                myModalCarDeviceList: function () {
                    return $scope.carDeviceList;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.carDeviceList = selectedItem;
        }, function (initialCarDeviceList) {
            $scope.carDeviceList = angular.fromJson(initialCarDeviceList);
            $log.info('Modal dismissed at: ' + new Date());
        });

    }
    //日期发生变化后对车型进行重新查询
    $scope.reQueryVehicleModel = function (flag) {
        if ($scope.carInfo !== undefined && $scope.carInfo.rBCode !== undefined && $scope.carInfo.rBCode != "") {
            if (!($scope.startDateOldValue == $scope.mainInfo.main.startDate && ($scope.enrollDateOldValue == $scope.mainInfo.carInfo.enrollDate))) {
                $.LoaderMask.loading({title: "重新计算车辆实际价值...", isFlag: true});
                $scope.startDateOldValue = $scope.mainInfo.main.startDate;
                $scope.enrollDateOldValue = $scope.mainInfo.carInfo.enrollDate
                //                                    重新进行一次车型查询

                var carInfoQuery = {
                    "busiStartDate": $scope.mainInfo.main.startDate,
                    "carKindCode": $scope.mainInfo.carInfo.carKindCode,
                    "newVehicleFlag": $scope.mainInfo.carInfo.newCarFlag,
                    "brandName": $scope.mainInfo.carInfo.brandName,
                    "useNatureCode": $scope.mainInfo.carInfo.useNatureCode,
                    "enrollDate": $scope.mainInfo.carInfo.enrollDate,
                    "rBCode": $scope.carInfo.rBCode
                };
                var seatCount = $scope.carInfo.seatCount;
                $scope.autoVehicleModelQuery(carInfoQuery, seatCount);
            }
        }


    }
    $scope.dateOnblur = function () {
        if ($scope.carInfo !== undefined && $scope.carInfo.rBCode !== undefined && $scope.carInfo.rBCode != "") {
            if ($scope.startDateOldValue != $scope.mainInfo.main.startDate) {
                $.LoaderMask.loading({title: "重新计算车辆实际价值...", isFlag: true});
                $scope.startDateOldValue = $scope.mainInfo.main.startDate;
                var carInfoQuery = {
                    "busiStartDate": $scope.mainInfo.main.startDate,
                    "carKindCode": $scope.mainInfo.carInfo.carKindCode,
                    "newVehicleFlag": $scope.mainInfo.carInfo.newCarFlag,
                    "brandName": $scope.mainInfo.carInfo.brandName,
                    "useNatureCode": $scope.mainInfo.carInfo.useNatureCode,
                    "enrollDate": $scope.mainInfo.carInfo.enrollDate,
                    "rBCode": $scope.carInfo.rBCode
                };

                var seatCount = $scope.carInfo.seatCount;
                $scope.autoVehicleModelQuery(carInfoQuery, seatCount);
            }
        }

        //$.LoaderMask.loading({title: "加载中...", isFlag: false});
    }

    $scope.enrollDateOnblur = function () {
        if ($scope.carInfo !== undefined && $scope.carInfo.rBCode !== undefined && $scope.carInfo.rBCode != "") {
            if ($scope.enrollDateOldValue != $scope.mainInfo.carInfo.enrollDate) {
                $.LoaderMask.loading({title: "重新计算车辆实际价值...", isFlag: true});
                $scope.enrollDateOldValue = $scope.mainInfo.carInfo.enrollDate

                var carInfoQuery = {
                    "busiStartDate": $scope.mainInfo.main.startDate,
                    "carKindCode": $scope.mainInfo.carInfo.carKindCode,
                    "newVehicleFlag": $scope.mainInfo.carInfo.newCarFlag,
                    "brandName": $scope.mainInfo.carInfo.brandName,
                    "useNatureCode": $scope.mainInfo.carInfo.useNatureCode,
                    "enrollDate": $scope.mainInfo.carInfo.enrollDate,
                    "rBCode": $scope.carInfo.rBCode
                };

                var seatCount = $scope.carInfo.seatCount;
                $scope.autoVehicleModelQuery(carInfoQuery, seatCount);
            }
        }

    }
    //历史数据复用
    $scope.query = function (size, queryInfo) {
        if (!$scope.checkVal(queryInfo)) {
            return;
        }
        $.LoaderMask.loading({title: "加载中...", isFlag: true});
        $scope.quick.operator = userCode;
        var quickInfo = JSON.stringify($scope.quick);

        $http.post('car/getCarPolicyInfo/02', quickInfo)
            .success(function (data, status) {
                $.LoaderMask.loading({title: "加载中...", isFlag: false});
//
                $scope.items = data.carPolicyQueryList;
                //打开模态
                var modalInstance = $modal.open({
                    templateUrl: 'myModelContent.html',  //指向上面创建的视图
                    controller: 'ModalInstanceCtrl',// 初始化模态范围
                    size: size, //大小配置
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                })
                modalInstance.result.then(function (selectedItem) {
                    $scope.selectedItems = selectedItem;
                    $scope.selected = null;
                    //初始化保险期限
                    $scope.mainInfo.main.startDate = null;
                    $scope.mainInfo.main.bzStartDate = null;

                    $scope.mainInfo.main.policyNo = null;


                    $scope.policy = {};
                    if ($scope.selectedItems.length == 1) {
                        $scope.selected = $scope.selectedItems[0];
                        //                  根据选中的保单险种类别设置不同的字段值
                        if ($scope.selected.riskCode == '0507') {
                            $scope.policy = {
                                "policyNo": $scope.selected.policyNo,
                                "bzStartDate": $scope.selected.startDate,
                                "bzEndDate": $scope.selected.endDate,
                                "relationFlag": "3",
                                "TmkFlag": "1"
                            };
                        }
                        else {
                            $scope.policy = {
                                "policyNo": $scope.selected.policyNo,
                                "startDate": $scope.selected.startDate,
                                "endDate": $scope.selected.endDate,
                                "relationFlag": "2",
                                "TmkFlag": "1",
                                "operator": userCode
                            };
                        }
                    }
                    if ($scope.selectedItems.length == 2) {
                        $scope.policy = {
                            "policyNo": $scope.selectedItems[0].policyNo,
                            "startDate": $scope.selectedItems[0].startDate,
                            "endDate": $scope.selectedItems[0].endDate,
                            "bzStartDate": $scope.selectedItems[1].startDate,
                            "bzEndDate": $scope.selectedItems[1].endDate,
                            "relationFlag": "1",
                            "TmkFlag": "1",
                            "operator": userCode
                        };
                    }

                    $.LoaderMask.loading({title: "加载中...", isFlag: true});

                    $http.post('car/policyReuse/03', $scope.policy)
                        .success(function (data, status) {

//                                         设置投保人信息
                            $scope.mainInfo.applicant = data.applicantEhm;

                            $scope.mainInfo.main.policyNo = data.mainEhm.policyNo;
                            if (data.mainEhm.startDate != null && data.mainEhm.startDate != "") {
                                var mainStartDate = new Date(data.mainEhm.startDate);
                                var currentDate = new Date();
                                var nextDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
                                var scopeStartDate = nextDate;
                                if (mainStartDate < scopeStartDate) {
                                    if (scopeStartDate.getFullYear() - mainStartDate.getFullYear() > 0) {
                                        mainStartDate.setYear(scopeStartDate.getFullYear());
                                        var dateToString = $scope.DateToString(mainStartDate);
                                        if (new Date(dateToString) > new Date()) {
                                            $scope.mainInfo.main.startDate = dateToString;
                                        }
                                        else {

                                            $scope.mainInfo.main.startDate = $scope.DateToString(scopeStartDate);
                                        }
                                    }
                                    else {
                                        $scope.mainInfo.main.startDate = $scope.DateToString(scopeStartDate);
                                    }

                                }
                                else {
                                    $scope.mainInfo.main.startDate = data.mainEhm.startDate;
                                }
                            }
                            else {
                                $scope.mainInfo.main.startDate = data.mainEhm.startDate;
                            }

                            if (data.mainEhm.bzStartDate != null && data.mainEhm.bzStartDate != "") {
                                var mainBzStartDate = new Date(data.mainEhm.bzStartDate);
                                var currentDate = new Date();
                                var nextDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
                                var scopeBzStartDate = nextDate;
                                if (mainBzStartDate < scopeBzStartDate) {
                                    if (scopeBzStartDate.getFullYear() - mainBzStartDate.getFullYear() > 0) {
                                        mainBzStartDate.setYear(scopeBzStartDate.getFullYear());
                                        var dateToString = $scope.DateToString(mainBzStartDate);
                                        if (new Date(dateToString) > new Date()) {
                                            $scope.mainInfo.main.bzStartDate = dateToString;
                                        }
                                        else {

                                            $scope.mainInfo.main.bzStartDate = $scope.DateToString(scopeBzStartDate);
                                        }
                                    }


                                }
                                else {
                                    $scope.mainInfo.main.bzStartDate = data.mainEhm.bzStartDate;
                                }
                            }
                            else {
                                $scope.mainInfo.main.bzStartDate = data.mainEhm.bzStartDate;
                            }


                            if ($scope.mainInfo.main.bzStartDate == null || $scope.mainInfo.main.bzStartDate == "") {
                                $scope.mainInfo.main.bzStartDate = $scope.mainInfo.main.startDate;
                            }
                            if ($scope.mainInfo.main.startDate == null || $scope.mainInfo.main.startDate == "") {
                                $scope.mainInfo.main.startDate = $scope.mainInfo.main.bzStartDate;
                            }

//                                         设置被保险人和车主信息
                            var insuredArr = data.insuredDataEhmArr;
                            if (insuredArr.length == 2) {
                                if (insuredArr[0].insuredFlag == '5') {

                                    if (insuredArr[0].insuredNature == '7') {
                                        $scope.ownerIdentifyTypeArr = personIdentifyType;
                                    } else {
                                        $scope.ownerIdentifyTypeArr = groupIdentifyType;
                                    }
                                    if (insuredArr[1].insuredType == '1') {
                                        $scope.identifyTypeArr = personIdentifyType;
                                    }
                                    else {
                                        $scope.identifyTypeArr = groupIdentifyType;
                                    }

                                    $scope.mainInfo.insuredList[0] = insuredArr[0];
                                    $scope.mainInfo.insuredList[0].insuredType = insuredArr[0].insuredNature;
                                    $scope.mainInfo.insuredList[1] = insuredArr[1];
                                }
                                else {

                                    if (insuredArr[0].insuredType == '1') {
                                        $scope.identifyTypeArr = personIdentifyType;
                                    } else {
                                        $scope.identifyTypeArr = groupIdentifyType;
                                    }
                                    if (insuredArr[1].insuredNature == '7') {
                                        $scope.ownerIdentifyTypeArr = personIdentifyType;
                                    }
                                    else {
                                        $scope.ownerIdentifyTypeArr = groupIdentifyType;
                                    }

                                    $scope.mainInfo.insuredList[0] = insuredArr[1];
                                    $scope.mainInfo.insuredList[1] = insuredArr[0];
                                    $scope.mainInfo.insuredList[0].insuredType = insuredArr[1].insuredNature;
                                }
                            }
                            else {
                                if (insuredArr[0].insuredFlag == '5') {

                                    if (insuredArr[0].insuredNature == '7') {
                                        $scope.ownerIdentifyTypeArr = personIdentifyType;
                                    } else {
                                        $scope.ownerIdentifyTypeArr = groupIdentifyType;
                                    }

                                    $scope.mainInfo.insuredList[0] = insuredArr[0];
                                    $scope.mainInfo.insuredList[0].insuredType = insuredArr[0].insuredNature;

                                }
                                else {

                                    if (insuredArr[0].identifyType == '01') {
                                        $scope.identifyTypeArr = personIdentifyType;
                                    } else {
                                        $scope.identifyTypeArr = groupIdentifyType;
                                    }
                                    $scope.mainInfo.insuredList[1] = insuredArr[0];
                                }
                                swal('系统提示', '被保险人或车主信息缺失，请手动录入', 'warning');
                            }
                            //设置新增设备信息
                            if (data.carDeviceDataEhmArr !== undefined && data.carDeviceDataEhmArr != null && data.carDeviceDataEhmArr != '') {
                                var carDeviceList = [];
                                for (var i = 0; i < data.carDeviceDataEhmArr.length; i++) {
                                    //console.log(data.carDeviceDataEhmArr[i].deviceName);
                                    var carDevice = {
                                        "deviceName": data.carDeviceDataEhmArr[i].deviceName,
                                        "actualValue": parseInt(data.carDeviceDataEhmArr[i].actualValue)
                                    };
                                    carDeviceList.push(carDevice);

                                }
                                $scope.carDeviceList = carDeviceList;
                            }

                            var itemKindDataEhmArr = data.itemKindDataEhmArr;
                            if (itemKindDataEhmArr[0].kindCode != 'BZ') {
                                $scope.syx = 1;
                            }
//                                         $scope.combosData.sumPremium= data.mainEhm.sumPremium;
                            var all = $scope.temp[0].itemKindList;
                            for (var i = 0; i < itemKindDataEhmArr.length; i++) {
                                var itemKind = itemKindDataEhmArr[i];
                                for (var j = 0; j < all.length; j++) {
                                    if (itemKind.kindCode == all[j].kindCode) {
                                        $scope.kind[j] = 1;
                                        if (itemKind.deductableFlag == '1') {
                                            all[j].deductableFlag = 1;
                                        }
                                        if (itemKind.amount != '' && itemKind.amount != '0.0') {
                                            if (itemKind.kindCode == '002') {
                                                var number = parseInt(itemKind.amount);
                                                all[j].amount = number + '';
                                            }
                                            else if (itemKind.kindCode == '006') {
                                                all[j].quantity = itemKind.quantity;
                                                all[j].unitAmount = itemKind.unitAmount;
                                                var number = parseInt(itemKind.amount);
                                                all[j].amount = number + '';
                                            }
                                            else if (itemKind.kindCode == '205') {
                                                var number = parseInt(itemKind.amount);
                                                all[j].amount = number + '';
                                            }
                                            else {
                                                all[j].amount = itemKind.amount;
                                            }

                                        }
                                        if (itemKind.m1Value != '' && itemKind.amount != '0.0') {
                                            all[j].m1Value = itemKind.m1Value;
                                        }
                                        if (itemKind.kindCode == '201') {
                                            all[j].modeCode = itemKind.modeCode;
                                        }
                                        //$scope.temp[0].itemKindList[1].amount=1000000;
                                        //all[j].amount=itemKind.amount;
//                                                     all[j].premium=itemKind.premium;
//                                                     all[j].benchMarkPremium=itemKind.benchMarkPremium;
//                                                     all[j].discount=itemKind.discount;
//                                                     break;
                                    }

                                }
                            }
                            //设置车辆信息
                            if (data.carInfoEhm.carKindCode == 'A0') {
                                $scope.carArr = $scope.busarr;
                            }
                            if (data.carInfoEhm.carKindCode == 'H0') {
                                $scope.carArr = $scope.cargoCararr;
                            }
                            $scope.mainInfo.carInfo = data.carInfoEhm;
                            $scope.mainInfo.carInfo.specialCarFlag = '0';
                            $scope.mainInfo.carInfo.transferFlag = null;
                            $scope.mainInfo.carInfo.transferDate = null;
                            $scope.mainInfo.carInfo.carChecker = null;
                            $scope.mainInfo.carInfo.carCheckStatus = null;
                            $scope.mainInfo.carInfo.secondHandCarFlag = '0';
                            if ($scope.mainInfo.carInfo.carPriceType == "" || $scope.mainInfo.carInfo.carPriceType == null) {
                                $scope.mainInfo.carInfo.carPriceType = '1';
                            }
                            //                                    重新进行一次车型查询
                            var carInfoQuery = {
                                "busiStartDate": $scope.mainInfo.main.startDate,
                                "carKindCode": $scope.mainInfo.carInfo.carKindCode,
                                "newVehicleFlag": $scope.mainInfo.carInfo.newCarFlag,
                                "brandName": $scope.mainInfo.carInfo.brandName,
                                "useNatureCode": $scope.mainInfo.carInfo.useNatureCode,
                                "enrollDate": $scope.mainInfo.carInfo.enrollDate,
                                "rBCode": $scope.mainInfo.carInfo.rbCode,
                                "operator": userCode
                            };
                            var seatCount = data.carInfoEhm.seatCount;
                            var importFlag = data.carInfoEhm.importFlag;
                            $scope.autoVehicleModelQuery(carInfoQuery, seatCount, importFlag);
                            //$scope.kind[10]=1;
                            //console.log($scope.kind);
                            //$.LoaderMask.loading({title:"加载中...",isFlag:false});
                        })
                        .error(function (data, status) {
                            $.LoaderMask.loading({title: "加载中...", isFlag: false});
                            //sys.error("系统出错，请联系系统管理员");
                            // alert("系统出错，请联系系统管理员");
                            swal("系统提示", "历史数据复用接口服务调用失败，请联系系统管理员", "error");
//                                         alert(status);
                        })


                }, function () {

                    $log.info('Modal dismissed at: ' + new Date())
                })
            })
            .error(function (data, status) {
                //sys.error("系统出错，请联系系统管理员");
                // alert("系统出错，请联系系统管理员");
                $.LoaderMask.loading({title: "加载中...", isFlag: false});
                swal("系统提示", "保单查询接口服务调用失败，请联系系统管理员", "error");
            });

//            $scope.items = ['8050120164039900001','8050120164039900001','8050120164039900001'];

    };
    //车损险的参考实际价值等于平台返回的车辆实际价值
    //$scope.changeAmount = function () {
    //    if ($scope.mainInfo.carInfo.carPriceType == 2) {
    //        $scope.temp[0].itemKindList[0].amount = $scope.mainInfo.carInfo.fairMarketValue;
    //        $scope.temp[0].itemKindList[2].amount = $scope.mainInfo.carInfo.fairMarketValue;
    //    }
    //    if ($scope.mainInfo.carInfo.carPriceType == 1) {
    //        $scope.temp[0].itemKindList[0].amount = $scope.carInfo.actualValue;
    //        $scope.temp[0].itemKindList[2].amount = $scope.carInfo.actualValue;
    //    }
    //
    //};

    /*        $scope.change=function(carInfo){

     $scope.temp[0].itemKindList[0].amount = carInfo.actualValue;
     $scope.temp[0].itemKindList[2].amount=carInfo.actualValue;

     }; */
// 格式化日期
    $scope.formatDate = function (date) {
        var splitArr = date.split("-");
        var formatDate = "";
        if (splitArr[0].length == 4) {
            formatDate = splitArr[0] + "-";
        }
        if (splitArr[1].length == 2) {
            formatDate = formatDate + splitArr[1] + "-"
        }
        else {
            formatDate = formatDate + "0" + splitArr[1] + "-"
        }
        if (splitArr[2].length == 2) {
            formatDate = formatDate + splitArr[2];
        }
        else {
            formatDate = formatDate + "0" + splitArr[2];
        }
        return formatDate;
    }
    //日期转换成String
    $scope.DateToString = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        ;
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var formatDate = year + "-" + month + "-" + day;
        return formatDate;
    }

    //监听商业险和交强险日期变化
    $scope.$watch("mainInfo.main.startDate", function (newValue, oldValue) {
        if (newValue !== undefined) {
            var splitArr = newValue.split("-");
            if (splitArr.length == 3) {

                if (newValue != null) {
                    var date = new Date(newValue);

                    date.setYear(date.getFullYear() + 1);
                    date.setDate(date.getDate() - 1);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if (month < 10) {
                        month = "0" + month;
                    }
                    ;
                    var day = date.getDate();
                    if (day < 10) {
                        day = "0" + day;
                    }
                    var nextDate = year + "-" + month + "-" + day;
                    $scope.mainInfo.main.endDate = nextDate;
                }
            }
        }


    });
    $scope.$watch("mainInfo.main.bzStartDate", function (newValue, oldValue) {
        if (newValue != null) {
            var date = new Date(newValue);
            date.setYear(date.getFullYear() + 1);
            date.setDate(date.getDate() - 1);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            ;
            var day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            var nextDate = year + "-" + month + "-" + day;
            $scope.mainInfo.main.bzEndDate = nextDate;
        }

    });
//监听车辆实际价值
    $scope.$watch("carInfo.actualValue", function (newValue, oldValue) {
        if ($scope.mainInfo.carInfo.fairMarketValue === undefined || ($scope.mainInfo.carInfo.fairMarketValue.replace(/^\s+|\s+$/g, '') == '')) {
            if ($scope.carInfo != undefined && $scope.carInfo.actualValue != undefined) {
                $scope.temp[0].itemKindList[0].amount = $scope.carInfo.actualValue;
                $scope.mainInfo.carInfo.carPriceType = '1';
            }

        }

    })

    //监听市场公允价值 carInfo.fairMarketValue
    $scope.$watch("mainInfo.carInfo.fairMarketValue", function (newValue, oldValue) {
        if ($scope.mainInfo.carInfo.fairMarketValue != undefined && ($scope.mainInfo.carInfo.fairMarketValue.replace(/^\s+|\s+$/g, '') != '')) {
            $scope.temp[0].itemKindList[0].amount = $scope.mainInfo.carInfo.fairMarketValue;
            $scope.mainInfo.carInfo.carPriceType = '2';
        }
        else {
            if ($scope.carInfo != undefined && $scope.carInfo.actualValue != undefined) {
                $scope.temp[0].itemKindList[0].amount = $scope.carInfo.actualValue;
                $scope.mainInfo.carInfo.carPriceType = '1';
            }

        }
    })

//        监听参考实际价值
    $scope.$watch("temp[0].itemKindList[0].amount", function (newValue, oldValue) {
        if (!($scope.temp[0].itemKindList[0].amount === undefined)) {
            $scope.temp[0].itemKindList[2].amount = $scope.temp[0].itemKindList[0].amount;
            $scope.temp[0].itemKindList[7].amount = $scope.temp[0].itemKindList[0].amount;
        }
    })
//    监听选中车型
    $scope.$watch("carInfo", function (newValue, oldValue) {
        if ($scope.mainInfo.main.policyNo !== undefined && $scope.carInfo !== undefined && $scope.carInfo != null) {
            if ($scope.mainInfo.main.policyNo == null) {
                if ($scope.carInfo.importFlag == 'A') {
                    $scope.repairRate = '60';
                    $scope.temp[0].itemKindList[6].modeCode = '2';
                }
                else {
                    $scope.repairRate = '30';
                    $scope.temp[0].itemKindList[6].modeCode = '1';
                }
            }
            else {
                if ($scope.carInfo.importFlag == 'A') {
                    $scope.repairRate = '60';
                }
                else {
                    $scope.repairRate = '30';
                }
            }

        }
    })
//        计算新增设备保额
    $scope.calPrice = function () {
        $scope.temp[0].itemKindList[11].amount = 0;

        for (var i = 0; i < $scope.carDeviceList.length; i++) {
            if (!($scope.carDeviceList[i].actualValue == "" || $scope.carDeviceList[i].actualValue == null)) {
                $scope.temp[0].itemKindList[11].amount = $scope.carDeviceList[i].actualValue + $scope.temp[0].itemKindList[11].amount;
            }
        }
        return $scope.temp[0].itemKindList[11].amount;
    };
//        三者责任险大于100万是，计算赔偿限额
    $scope.setThirdAmount = function (thirdAmount) {
        $scope.temp[0].itemKindList[1].amount = thirdAmount * 10000 + "";

    }
//        下拉框设置
    $scope.setInputSelect = function (i) {
        if (i == 3) {
            if (!($scope.inputSelect === undefined)) {
                $scope.temp[0].itemKindList[3].amount = $scope.inputSelect;
            }

        }
        if (i == 4) {
            if (!($scope.inputUnitAmount === undefined)) {
                $scope.temp[0].itemKindList[4].unitAmount = $scope.inputUnitAmount;
            }

        }
    }

//    初始化车船税纳税信息
    $scope.initCarshipTaxInfo = function () {
        if ($scope.carShipTaxInfo.taxFlag !== undefined) {
            if ($scope.carShipTaxInfo.taxFlag == '3M' || $scope.carShipTaxInfo.taxFlag == '4J') {
                $scope.mainInfo.carShipTaxInfo.relifReason = 'M7';

                $scope.mainInfo.carShipTaxInfo.freeNo = '440399000088100';
                $scope.mainInfo.carShipTaxInfo.kTaxComCode = '2440300';
                $scope.mainInfo.carShipTaxInfo.kTaxComName = '深圳市地方税务局';
                if ($scope.carShipTaxInfo.taxFlag == '3M') {
                    $scope.mainInfo.carShipTaxInfo.deductionDueType = 'E';
                    $scope.mainInfo.carShipTaxInfo.deductionDueProportion = null;
                }
                if ($scope.carShipTaxInfo.taxFlag == '4J') {
                    $scope.mainInfo.carShipTaxInfo.deductionDueType = '2';
                    $scope.mainInfo.carShipTaxInfo.deductionDueProportion = 50;
                }

            }
            if ($scope.carShipTaxInfo.taxFlag == '2W') {
                $scope.mainInfo.carShipTaxInfo.freeNo = '';
                $scope.mainInfo.carShipTaxInfo.kTaxComCode = '';
                $scope.mainInfo.carShipTaxInfo.kTaxComName = '';
                $scope.mainInfo.carShipTaxInfo.deductionDueType = null;
                $scope.mainInfo.carShipTaxInfo.deductionDueProportion = null;
            }
            if ($scope.carShipTaxInfo.taxFlag == '1N') {
                $scope.mainInfo.carShipTaxInfo = {};

            }
        }
    }
//    设置新能源是否展示
    $scope.setfuelStatus = function () {
        if ($scope.carInfo === undefined) {
            return false;
        }
        else {
            if ($scope.carInfo.fuelName != '' && $scope.carInfo.fuelCode != '') {
                return true;
            }
            else {
                return false;
            }
        }

    }
//    自动调用车型查询功能
    $scope.autoVehicleModelQuery = function (carInfo, seatCount) {
        var carInfoQuery = JSON.stringify(carInfo);
        $http.post('car/getVehicleModelList/04', carInfoQuery)
            .success(function (data, status, header, config) {
                $scope.carInfoList = data.vehicleModelDataArr;
                if ($scope.carInfoList != null) {
                    $scope.carInfoList[0].seatCount = seatCount;
                    $scope.carInfo = $scope.carInfoList[0];

                    $.LoaderMask.loading({title: "加载中...", isFlag: false});
                    var reuseInfo = $scope.mainInfo;
                }

            })
            .error(function (data, status, header, config) {
                $.LoaderMask.loading({title: "加载中...", isFlag: false});
                swal("系统提示", "车型查询接口服务调用失败，请联系管理员", "error");
            });
    }

//        被保险人查询
    $scope.insuredQuery = function () {
//            $scope.mainInfo.insuredList[0].customerCName=$scope.mainInfo.insuredList[0].insuredName;
//            $scope.mainInfo.insuredList[0].customerType=$scope.mainInfo.insuredList[0].insuredType;
        var customerInfo = {
            "customerCName": $scope.mainInfo.insuredList[1].insuredName,
            "customerType": $scope.mainInfo.insuredList[1].insuredType,
            "identifyType": $scope.mainInfo.insuredList[1].identifyType,
            "identifyNumber": $scope.mainInfo.insuredList[1].identifyNumber,
            "idvSex": $scope.mainInfo.insuredList[1].sex
        }
//            alert(JSON.stringify(customerInfo));
//           var datas= JSON.stringify($scope.mainInfo.insuredList[0]);
//           /car/getCustomerInfo/{id}
        $http.post('car/getCustomerInfo/07', customerInfo)
            .success(function (data, status) {

                var customerInfo = data;
                $scope.mainInfo.insuredList[1] = {
                    "insuredName": customerInfo.customerCName,
                    "insuredType": customerInfo.customerType,
                    "identifyType": customerInfo.identifyType,
                    "identifyNumber": customerInfo.identifyNumber,
                    "sex": customerInfo.sex,
                    "insuredCode": customerInfo.customerCode,
                    "mobile": customerInfo.mobile,
                    "birthDay": customerInfo.birthDate,
                    "insuredType": "1"
                }


            })
            .error(function (data, status) {

//                        alert(status);
//                        alert(data);
            });

    };
    // 检查是否输入
    $scope.checkSaveAndQuotePara = function ($scope) {
        var autoScope = $scope;
        if (!autoScope.insuredForm.$valid) {
            //sys.alert('被保人信息校验不通过');
            swal("系统提示", "被保人信息校验不通过", "warning");
            return false;
        }
        if (!autoScope.ownerForm.$valid) {
            //sys.alert('行驶证车主信息校验不通过');
            swal("系统提示", "行驶证车主信息校验不通过", "warning");
            return false;
        }
        if (!autoScope.insuranceDeadline.$valid) {
            //sys.alert('保险期限信息校验不通过');
            swal("系统提示", "保险期限信息校验不通过", "warning");
            return false;
        }
        if (!autoScope.carForm.$valid) {
            //sys.alert('行车辆信息校验不通过');
            swal("系统提示", "车辆信息校验不通过", "warning");
            return false;
        }
        if (autoScope.jqx == 0 && !autoScope.checkProtection.$valid) {
            //sys.alert('交强险信息校验不通过');
            swal("系统提示", "交强险信息校验不通过", "warning");
            return false;
        }
        if (autoScope.syx == 0 && !autoScope.checkProtection.$valid) {
            //sys.alert('商业险信息校验不通过');
            swal("系统提示", "商业险信息校验不通过", "warning");
            return false;
        }
        return true;
    };


    //校验保单折扣系数
    $scope.validateFinalRatio = function () {
        var _finalRatio = $("#finalRatio");
        var finalRatioD = $scope.combosData.ratioInfo.finalRatioD;
        var finalRatioU = $scope.combosData.ratioInfo.finalRatioU;
        if (_finalRatio.val() == "") {
            _finalRatio.tooltip({placement: 'bottom'});
            _finalRatio.attr("data-original-title", "保单折扣系数不能为空").css({
                'background-color': '#FFED86',
                'border-color': 'rgba(236, 168, 82, 0.8)'
            });
            return false;
        } else {
            if (_finalRatio.val() < finalRatioD || _finalRatio.val() > finalRatioU) {
                _finalRatio.tooltip({placement: 'bottom'});
                _finalRatio.attr("data-original-title", "保单折扣系数必须在" + finalRatioD + "和" + finalRatioU + "之间").css({
                    'background-color': '#FFED86',
                    'border-color': 'rgba(236, 168, 82, 0.8)'
                });
                return false;
            }
            else {
                _finalRatio.attr("data-original-title", "").css({
                    'background-color': '',
                    'border-color': ''
                });
                return true;
            }
        }


    }

    //人工计算保费
    $scope.manualBaojia = function () {

        if (!$scope.validateFinalRatio()) {
            return;
        }

        if ($scope.combosData && $scope.mainInfo.main.demandNo && $scope.finalRatio) {


            var syxSumPremium = 0.00;
            var syxSumBenchMarkPremium = 0.00;
            for (var flag = 0; flag < $scope.temp[0].itemKindList.length; flag = flag + 1) {

                if ($scope.kind[flag] == "1") {
                    $scope.temp[0].itemKindList[flag].discount = $scope.finalRatio;
                    $scope.temp[0].itemKindList[flag].premium = parseFloat($scope.temp[0].itemKindList[flag].discount * $scope.temp[0].itemKindList[flag].benchMarkPremium).toFixed(2);
                    syxSumPremium = parseFloat(parseFloat(syxSumPremium) + parseFloat($scope.temp[0].itemKindList[flag].premium)).toFixed(2);
                }

            }
            var oldSumPremium = $scope.combosData.sumPremium;
            $scope.combosData.sumPremium = syxSumPremium;
            $scope.combosData.sumDiscountPremium = parseFloat($scope.combosData.sumBenchMarkPremium - syxSumPremium).toFixed(2);
            $scope.sumPremium = parseFloat(parseFloat($scope.sumPremium - oldSumPremium) + parseFloat($scope.combosData.sumPremium)).toFixed(2);
            //    设置maininfo信息
            $scope.mainInfo.combosList[0].ratioInfo.finalRatio = $scope.finalRatio;
            var syxitemKindList = $scope.mainInfo.combosList[0].itemKindList;
            for (var i = 0; i < syxitemKindList.length; i++) {
                syxitemKindList[i].discount = $scope.finalRatio;
                syxitemKindList[i].premium = parseFloat(syxitemKindList[i].discount * syxitemKindList[i].benchMarkPremium).toFixed(2);
            }
        }

        else {
            if ($scope.mainInfo.main.demandNo === undefined) {
                swal("系统提示", "请先进行系统报价!", "error");
            }
            if ($scope.finalRatio === undefined) {
                return;
            }
            else {
                swal("系统提示", "未知错误，请联系管理员!", "error");
            }
        }
    }
    //保费计算
    $scope.baojia = function () {
        //$scope.checkSaveAndQuotePara($scope);
        /* if(!$scope.checkSaveAndQuotePara($scope)) {
         return;
         //} */

        var insuredFromStatus = insuredFormValidate.form();
        var ownerFormStatus = ownerFormValidate.form();
        var insuranceDeadLineStatus = insuranceDeadlineValidate.form();
        var carFormStatus = carFormValidate.form();
        var combosStatus = combosValidate.form();

        if (!(insuredFromStatus && ownerFormStatus && insuranceDeadLineStatus && carFormStatus && combosStatus)) {
            return;
        }
        //增加对玻璃破碎险的校验
        if ($scope.kind[6] == 1) {
            if ($scope.temp[0].itemKindList[6].modeCode == null) {
                swal("", "玻璃类型不能为空", "error");
                $("#glassModeCode").tooltip({placement: 'bottom'});
                $("#glassModeCode").css({'background-color': '#FFED86', 'border-color': 'rgba(236, 168, 82, 0.8)'});
                return;
            }
        }
        $.LoaderMask.loading({title: "保费计算中...", isFlag: true});
        $scope.selected = [];
        //设置主信息
        $scope.mainInfo.main.demandNo = null;
        $scope.mainInfo.main.bzDemandNo = null;
        $scope.mainInfo.main.proposalNo = null;
        //设置上年理赔信息
        $scope.claimList = null;
        //设置商业险费率因子
        $scope.combosData.ratioInfo = null;
        //格式化商业险 交强险 保险期限
        //预先保存交强险日期，以免被返回值冲掉

        $scope.mainInfo.main.bzStartDate = $scope.formatDate($scope.mainInfo.main.bzStartDate);
        $scope.mainInfo.main.startDate = $scope.formatDate($scope.mainInfo.main.startDate);
        var bzStartDate = $scope.mainInfo.main.bzStartDate;
        var bzEndDate = $scope.mainInfo.main.bzEndDate;
        //设置商业险交强险日期
        /*  $sope.mainInfo.main={
         "bzStartDate":function(){return $("#bzStartDate").val()},
         "bzEndDate":function(){return $("#bzEndDate").val()},
         "startDate":function(){return $("#startDate").val()},
         "endDate":function(){return $("#endDate").val()}
         } */


        $scope.mainInfo.combosList[0] = {
            "itemKindList": [{
                "kindCode": "",
                "amount": "",
                "m1Value": "",
                "deductableFlag": "",
                "rateFactor": "",
                "benchMarkPremium": ""

            }]
        };
        //存储商业险险别列表
        //处理商业险险别列表
        $scope.temp[0].itemKindList[4].quantity = $scope.carInfo.seatCount - 1;
        $scope.temp[0].itemKindList[4].amount = $scope.temp[0].itemKindList[4].quantity * $scope.temp[0].itemKindList[4].unitAmount;
        $scope.temp[0].itemKindList[10].rate = $scope.repairRate / 100;

        for (var flag = 0; flag < $scope.temp[0].itemKindList.length; flag = flag + 1) {
            $scope.temp[0].itemKindList[flag].benchMarkPremium = null;
            $scope.temp[0].itemKindList[flag].discount = null;
            $scope.temp[0].itemKindList[flag].premium = null;
            if ($scope.temp[1].itemKindList[flag] != null) {
                $scope.temp[1].itemKindList[flag].benchMarkPremium = null;
                $scope.temp[1].itemKindList[flag].discount = null;
                $scope.temp[1].itemKindList[flag].premium = null;
            }


            if ($scope.kind[flag] == "1") {
                $scope.selected.push($scope.temp[0].itemKindList[flag]);
                if (flag == '14') {
                    $scope.temp[0].itemKindList[14].amount = $scope.temp[0].itemKindList[14].quantity * $scope.temp[0].itemKindList[14].unitAmount;
                }
                if ($scope.temp[0].itemKindList[flag].deductableFlag == "1") {
                    $scope.temp[1].itemKindList[flag].amount = "0";
                    $scope.selected.push($scope.temp[1].itemKindList[flag]);
                }

            }
            //else {
            //    //    未选中的险种，清空之前计算返回的保费信息
            //    $scope.temp[0].itemKindList[flag].benchMarkPremium = null;
            //    $scope.temp[0].itemKindList[flag].discount = null;
            //    $scope.temp[0].itemKindList[flag].premium = null;
            //}
        }
//            $scope.mainInfo.combosList[0].itemKindList = $scope.selected;
//            设置被保险人 车主 信息
        $scope.mainInfo.insuredList[0].insuredNature = "carOwner";
        if ($scope.mainInfo.insuredList[1].insuredType == "1") {
            $scope.mainInfo.insuredList[1].insuredNature = "3";
        }
        if ($scope.mainInfo.insuredList[1].insuredType == "2") {
            $scope.mainInfo.insuredList[1].insuredNature = "4";
        }

//            设置险种信息
        $scope.mainInfo.combosList[0].itemKindList = $scope.selected;

//            设置交强险信息
        if ($scope.jqx == '1') {
//                设置交强险主信息
            $scope.mainInfo.combosList[1] = {
                "combosCode": "PACK000000",
                "serialNo": "0",
                "riskCode": "0507",
                "comboNature": "3",
                "itemKindList": [
                    {"riskcode": "0507", "kindCode": "BZ", "deductableFlag": "0",}

                ]

            }
            $scope.initCarshipTaxInfo();
//                设置车船税信息
            $scope.mainInfo.carShipTaxInfo.taxFlag = $scope.carShipTaxInfo.taxFlag;
            $scope.mainInfo.carShipTaxInfo.taxPayerName = $scope.mainInfo.insuredList[1].insuredName;
            $scope.mainInfo.carShipTaxInfo.taxPayerCertiCode = $scope.mainInfo.insuredList[1].identifyNumber;
            //            正常缴税
            if ($scope.mainInfo.carShipTaxInfo.taxFlag == '1N') {

                $scope.mainInfo.carShipTaxInfo.relifReason = null;
                $scope.mainInfo.carShipTaxInfo.deductionDueType = null;
                $scope.mainInfo.carShipTaxInfo.kTaxComCode = null;
                $scope.mainInfo.carShipTaxInfo.kTaxComName = null;
                $scope.mainInfo.carShipTaxInfo.freeNo = null;

            }
            //免税
            if ($scope.mainInfo.carShipTaxInfo.taxFlag == '3M' || $scope.mainInfo.carShipTaxInfo.taxFlag == '4J') {
                $scope.mainInfo.carShipTaxInfo.taxStartDate = null;
                $scope.mainInfo.carShipTaxInfo.taxEndDate = null;
                if ($scope.mainInfo.carShipTaxInfo.deductionDueType == '1') {
                    $scope.mainInfo.carShipTaxInfo.deductionDueProportion = null;
                }
                if ($scope.mainInfo.carShipTaxInfo.deductionDueType == '2') {
                    $scope.mainInfo.carShipTaxInfo.deduction = null;
                }
                if ($scope.mainInfo.carShipTaxInfo.deductionDueType == 'E') {
                    $scope.mainInfo.carShipTaxInfo.deductionDueProportion = null;
                    $scope.mainInfo.carShipTaxInfo.deduction = null;
                }
            }
//            减税
            if ($scope.mainInfo.carShipTaxInfo.taxFlag == '2W') {
                $scope.mainInfo.carShipTaxInfo.relifReason = null;
                $scope.mainInfo.carShipTaxInfo.deductionDueType = null;
                $scope.mainInfo.carShipTaxInfo.deductionDueProportion = null;
                $scope.mainInfo.carShipTaxInfo.deduction = null;
                //    deductionDueProportion
            }
            $scope.combosJQX = {}
//                $scope.carShipTaxInfo={
//                    "taxFlag":"3M",
//                    "taxPayerName":"田伟",
//                    "taxPayerCertiType":"01",
//                    "taxPayerCertiCode":"420683198809066118",
//                    "relifReason":"M7",
//                    "deductionDueType":"E",
//                    "kTaxComCode":"2440304",
//                    "kTaxComName":"深圳市福田区地税局",
//                    "freeNo":"440300255489"
//                }

        }
        if ($scope.jqx == '0') {
            $scope.mainInfo.combosList = [$scope.mainInfo.combosList[0]];
            if ($scope.mainInfo.carShipTaxInfo !== undefined) {
                $scope.mainInfo.carShipTaxInfo.taxActual = null;
                $scope.mainInfo.carShipTaxInfo.previousPay = null;
                $scope.mainInfo.carShipTaxInfo.lateFee = null;
                $scope.mainInfo.carShipTaxInfo.sumPayTax = null;
            }


            $scope.combosJQX = {};

        }

        var selectedArray = JSON.stringify($scope.selected);
//            将车型查询返回值绑定到车辆请求信息上
//        $scope.mainInfo.carInfo= $scope.carInfo;
        $scope.mainInfo.carInfo.completeKerbMass = $scope.carInfo.vehicleWeight;
        $scope.mainInfo.carInfo.wholeWeight = $scope.carInfo.vehicleWeight;
        $scope.mainInfo.carInfo.tonCount = $scope.carInfo.vehicleTonnage;
        $scope.mainInfo.carInfo.exhaustScale = $scope.carInfo.exhaustCapacity;
        $scope.mainInfo.carInfo.purchasePrice = $scope.carInfo.purchasePrice;
        $scope.mainInfo.carInfo.actualValue = $scope.carInfo.actualValue;
        $scope.mainInfo.carInfo.rbCode = $scope.carInfo.rBCode;
        $scope.mainInfo.carInfo.platmodelCode = $scope.carInfo.platModelCode;
        $scope.mainInfo.carInfo.platmodelname = $scope.carInfo.platModelName;
        $scope.mainInfo.carInfo.importFlag = $scope.carInfo.importFlag;
        $scope.mainInfo.carInfo.seatCount = $scope.carInfo.seatCount;

//            设置车辆车主信息
        $scope.mainInfo.carInfo.carOwner = $scope.mainInfo.insuredList[0].insuredName;
        $scope.mainInfo.carInfo.carOwnerNature = $scope.mainInfo.insuredList[0].insuredType;
        $scope.mainInfo.carInfo.carOwnerIdentifyType = $scope.mainInfo.insuredList[0].identifyType;
        $scope.mainInfo.carInfo.carOwnerIdentifyNumber = $scope.mainInfo.insuredList[0].identifyNumber;

//            var ss = JSON.stringify($scope.mainInfo.combosList[0].itemKindList);

//设置投保人信息
        $scope.mainInfo.applicant = {
            "insuredNature": $scope.mainInfo.insuredList[1].insuredNature,
            "insuredType": $scope.mainInfo.insuredList[1].insuredType,
            "identifyType": $scope.mainInfo.insuredList[1].identifyType,
            "identifyNumber": $scope.mainInfo.insuredList[1].identifyNumber,
            "appliName": $scope.mainInfo.insuredList[1].insuredName
        };
//            设置新增设备信息
        if ($scope.kind[11] == 1) {
            $scope.mainInfo.carDeviceList = $scope.carDeviceList;
        }
        else {
            $scope.mainInfo.carDeviceList = null;
        }
        $scope.mainInfo.main.policyNo = null;
        var info = JSON.stringify($scope.mainInfo);
        $http.post('car/premiumCalculate/06', info)
            .success(function (data, status) {
                var resdata = JSON.stringify(data);
                console.log(resdata);
                if (data.main.agentCode !== undefined && data.main.agentCode == null) {
                    $scope.mainInfo.main.agentCode = agentCode;
                }
                if (data.main.agentName !== undefined && data.main.agentName == null) {
                    $scope.mainInfo.main.agentName = agentName;
                }
                if (data.main.agreementNo !== undefined && data.main.agreementNo == null) {
                    $scope.mainInfo.main.agreementNo = agreementNo;
                }
                if (data.main.operateDate !== undefined && data.main.operateDate == null) {
                    $scope.mainInfo.main.operateDate = operateDate;
                }
                if (data.main.operatorCode !== undefined && data.main.operatorCode == null) {
                    $scope.mainInfo.main.operatorCode = operatorCode;
                }
                if (data.main.operatorName !== undefined && data.main.operatorName == null) {
                    $scope.mainInfo.main.operatorName = operatorName;
                }
                if ($scope.mainInfo.main.bzStartDate == null || $scope.mainInfo.main.bzStartDate == "") {
                    $scope.mainInfo.main.bzStartDate = bzStartDate;
                }
                if ($scope.mainInfo.main.bzEndDate == null || $scope.mainInfo.main.bzEndDate == "") {
                    $scope.mainInfo.main.bzEndDate = bzEndDate;
                }
                $scope.mainInfo.main.proposalNo = data.main.sSproposalNo;
                $scope.mainInfo.main.demandNo = data.main.demandNo;
                $scope.mainInfo.main.bzDemandNo = data.main.bzDemandNo;
                //设置上年理赔信息
                if (data.claimList !== undefined && data.claimList != null) {
                    $scope.claimList = data.claimList;
                }
                var syxcombosList = data.combosList[0];
                $scope.combosData = syxcombosList;
                $scope.mainInfo.combosList[0] = syxcombosList;
                var selected = $scope.selected;
                var itemKindList = $scope.combosData.itemKindList;

                for (var i = 0; i < itemKindList.length; i++) {
                    var itemKind = itemKindList[i];
                    for (var j = 0; j < selected.length; j++) {
                        if (selected[j].kindCode == itemKind.kindCode) {
                            selected[j].benchMarkPremium = itemKind.benchMarkPremium;
                            selected[j].premium = itemKind.premium;
                            selected[j].discount = itemKind.discount;
                        }
                    }
                }
//                        设置车船税
//                        $scope.carShipTaxInfo=data.carShipTaxInfo;
//                    展示交强险信息
//                       //                   设置总保费
                $scope.sumPremium = $scope.combosData.sumPremium;
                if (data.combosList.length == 2) {
                    //                        设置车船税
                    $scope.mainInfo.carShipTaxInfo = data.carShipTaxInfo;
                    $scope.combosJQX = data.combosList[1];
                    //console.log($scope.combosJQX.itemKindList[0].discount);
                    //设置交强险保单折扣系数

                    $scope.mainInfo.combosList[1] = data.combosList[1];
                    if (!($scope.combosJQX.sumPremium === undefined)) {
                        $scope.sumPremium = (parseFloat($scope.sumPremium) + parseFloat($scope.combosJQX.sumPremium)).toFixed(2);
                    }
                    if (!($scope.mainInfo.carShipTaxInfo.sumPayTax === undefined)) {
                        $scope.sumPremium = (parseFloat($scope.sumPremium) + parseFloat($scope.mainInfo.carShipTaxInfo.sumPayTax)).toFixed(2);
                    }
                }


                $.LoaderMask.loading({title: "保费计算中...", isFlag: false});
                if (data.ilogResultDto.ilogStatus == "2") {
                    swal("规则引擎信息：", data.ilogResultDto.ilogDesc, "warning");
                }
//

            })
            .error(function (data, status) {
                $.LoaderMask.loading({title: "保费计算中...", isFlag: false});
                if (status == 405) {
                    swal("", data.errorMessage, "error");
                }
                if (status == 406) {
                    swal("", "保费计算接口服务调用失败，请联系管理员", "error");
                }
            });

    };


//        是否同被保险人
    $scope.isSample = function (toInsured) {

        if (toInsured == "1") {
            $scope.mainInfo.carInfo.carInsureRelation = "1";
            if ($scope.mainInfo.insuredList[1].insuredType == '1') {
                $scope.ownerIdentifyTypeArr = personIdentifyType;
                $scope.mainInfo.insuredList[0] = {
                    "insuredName": $scope.mainInfo.insuredList[1].insuredName,
                    "identifyType": $scope.mainInfo.insuredList[1].identifyType,
                    "identifyNumber": $scope.mainInfo.insuredList[1].identifyNumber,

                };
                $scope.mainInfo.insuredList[0].insuredType = "7";
            }
            else {
                $scope.ownerIdentifyTypeArr = groupIdentifyType;
                $scope.mainInfo.insuredList[0] = {
                    "insuredName": $scope.mainInfo.insuredList[1].insuredName,
                    "identifyType": $scope.mainInfo.insuredList[1].identifyType,
                    "identifyNumber": $scope.mainInfo.insuredList[1].identifyNumber,

                };
            }


        }
        else {
            $scope.mainInfo.insuredList[0] = {};
        }
    };
//        车型查询
    $scope.getVehicleModelQuery = function () {
        var _insurance_obj = $("#insuranceDeadline");
        var _car_obj = $("#carForm");
        if (_insurance_obj.find("input[name='startDate']").val() == "") {
            _insurance_obj.find("input[name='startDate']").tooltip({placement: 'bottom'});
            _insurance_obj.find("input[name='startDate']").attr("data-original-title", "商业险保险期限不能为空").css({
                'background-color': '#FFED86',
                'border-color': 'rgba(236, 168, 82, 0.8)'
            });
            return;
        } else {
            _insurance_obj.find("input[name='startDate']").attr("data-original-title", "").css({
                'background-color': '',
                'border-color': ''
            });
        }
        if (_car_obj.find("select[name='carKindCode']").val() == "?") {
            _car_obj.find("select[name='carKindCode']").tooltip({placement: 'bottom'});
            _car_obj.find("select[name='carKindCode']").attr("data-original-title", "请选择车辆种类").css({
                'background-color': '#FFED86',
                'border-color': 'rgba(236, 168, 82, 0.8)'
            });
            return;
        } else {
            _car_obj.find("select[name='carKindCode']").attr("data-original-title", "").css({
                'background-color': '',
                'border-color': ''
            });
        }
        if (_car_obj.find("select[name='useNatureCode']").val() == "?") {
            _car_obj.find("select[name='useNatureCode']").tooltip({placement: 'bottom'});
            _car_obj.find("select[name='useNatureCode']").attr("data-original-title", "请选择使用性质").css({
                'background-color': '#FFED86',
                'border-color': 'rgba(236, 168, 82, 0.8)'
            });
            return;
        } else {
            _car_obj.find("select[name='useNatureCode']").attr("data-original-title", "").css({
                'background-color': '',
                'border-color': ''
            });
        }
        if (_car_obj.find("input[name='enrollDate']").val() == "") {
            _car_obj.find("input[name='enrollDate']").tooltip({placement: 'bottom'});
            _car_obj.find("input[name='enrollDate']").attr("data-original-title", "初次登记日期不能为空").css({
                'background-color': '#FFED86',
                'border-color': 'rgba(236, 168, 82, 0.8)'
            });
            return;
        } else {
            _car_obj.find("input[name='enrollDate']").attr("data-original-title", "").css({
                'background-color': '',
                'border-color': ''
            });
        }
        if (_car_obj.find("input[name='carModel']").val() == "") {
            _car_obj.find("input[name='carModel']").tooltip({placement: 'bottom'});
            _car_obj.find("input[name='carModel']").attr("data-original-title", "厂牌型号不能为空").css({
                'background-color': '#FFED86',
                'border-color': 'rgba(236, 168, 82, 0.8)'
            });
            return;
        } else {
            _car_obj.find("input[name='carModel']").attr("data-original-title", "").css({
                'background-color': '',
                'border-color': ''
            });
        }

        $.LoaderMask.loading({title: "车型查询中...", isFlag: true});
        var carInfo = {
            "busiStartDate": $scope.mainInfo.main.startDate,
            "carKindCode": $scope.mainInfo.carInfo.carKindCode,
            "newVehicleFlag": $scope.mainInfo.carInfo.newCarFlag,
            "brandName": $scope.mainInfo.carInfo.brandName,
            "useNatureCode": $scope.mainInfo.carInfo.useNatureCode,
            "enrollDate": $scope.mainInfo.carInfo.enrollDate,
            "operator": userCode
        };
        $http.post('car/getVehicleModelList/04', carInfo)
            .success(function (data, status, header, config) {
                //console.log(JSON.stringify(data));
                $.LoaderMask.loading({title: "车型查询中...", isFlag: false});
                if (data.transResultEhm.resultCode != '1') {
                    swal("系统提示", data.transResultEhm.resultInfoDesc, "warning");
                }
                else {
                    $scope.carInfoList = data.vehicleModelDataArr;
                    $scope.carInfo = $scope.carInfoList[0];
                }
            })
            .error(function (data, status, header, config) {
                $.LoaderMask.loading({title: "车型查询中...", isFlag: false});
//                        alert("车型查询失败，请明确车型名称")
//                        sweetAlert("车型查询失败，请明确车型名称");
                // sys.error("车型查询失败，请明确车型名称");
                //alert("车型查询失败，请明确车型名称");
                swal("系统提示", "车型查询接口服务调用异常，请联系管理员", "error");
//                         alert(header);
//                        alert(status);
            });
    };

//test
    $scope.download = function () {
        $http({method: 'GET', url: '/download/' + image[0]['_id']}).
            success(function (data, status, headers, config) {
                var element = angular.element('<a/>');
                element.attr({
                    href: 'data:attachment/tif;charset=utf-8,' + encodeURI(data),
                    target: '_self',
                    download: 'test.tif'
                })[0].click();
            }).
            error(function (data, status, headers, config) {
            });
    }

    //    生成pdf
    $scope.generatePDF = function (demandNo) {
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var url = 'car/generatePDF/' + '' + demandNo + '/08';
        //alert(url);
        //var mainInfo = JSON.stringify($scope.mainInfo);
        var pdfInfo = $scope.mainInfo;
        pdfInfo.claimList = $scope.claimList;
        //console.log(pdfInfo);
        //console.log(mainInfo);
        $http.post(url, JSON.stringify(pdfInfo))
            .success(function (data, status) {

                var element = angular.element('<a/>');
                element.attr({
                    href: './download/' + demandNo,
                    target: '_blank',
                    download: demandNo + '.pdf'
                });


                if (document.createEvent) {
                    var ev = document.createEvent("MouseEvent");
                    ev.initMouseEvent(
                        "click",
                        true /* bubble */, true /* cancelable */,
                        window, null,
                        0, 0, 0, 0, /* coordinates */
                        false, false, false, false, /* modifier keys */
                        0 /*left*/, null
                    );
                    element[0].dispatchEvent(ev);
                }
                else {
                    element[0].fireEvent("onclick");
                }


            })
            .error(function (data, status) {
                //alert(error);
                swal("系统提示", "车险报价单生成失败，请联系管理员", "error");
            })
    }

});


app.directive('capitalize', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});

/**
 * 带筛选功能的下拉框
 * 使用方法 <select ngc-select-search name="select1" ng-options="">
 * 说明[ select 一定要有name,ng-options 属性]
 */

app.directive('ngcSelectSearch', function ($animate, $compile, $parse) {

    function parseOptions(optionsExp, element, scope) {
        // ngOptions里的正则
        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;

        var match = optionsExp.match(NG_OPTIONS_REGEXP);
        if (!(match)) {
            console.log('ng-options 表达式有误')
        }
        var valueName = match[5] || match[7];
        var keyName = match[6];
        var displayFn = $parse(match[2]);
        var keyFn = $parse(match[1]);
        var valuesFn = $parse(match[8]);

        var labelArray = [],
            idArray = [],
            optionValues = [];
        scope.$watch(match[8], function (newValue, oldValue) {
            if (newValue && newValue.length > 0) {
                optionValues = valuesFn(scope) || [];
                labelArray = [];
                idArray = []
                for (var index = 0, l = optionValues.length; index < l; index++) {
                    var it = optionValues[index];
                    if (match[2] && match[1]) {
                        var localIt = {};
                        localIt[valueName] = it;
                        var label = displayFn(scope, localIt);
                        var dataId = keyFn(scope, localIt);
                        labelArray.push(label);
                        idArray.push(dataId);
                    }
                }

                scope.options = {
                    'optionValues': optionValues,
                    'labelArray': labelArray,
                    'idArray': idArray
                }
            }
        });
    }

    return {
        restrict: 'A',
        require: ['ngModel'],
        priority: 100,
        replace: false,
        scope: true,
        template: '<div class="chose-container">' +
        '<div class="chose-single"><span class="j-view"></span><i class="glyphicon glyphicon-remove"></i></div>' +
        '<div class="chose-drop chose-hide j-drop">' +
        '<div class="chose-search">' +
        '<input class="j-key" type="text" autocomplete="off">' +
        '</div>' +
        '<ul class="chose-result">' +
            // '<li ng-repeat="'+repeatTempl+'" data-id="'+keyTempl+'" >{{'+ valueTempl+'}}</li>'+
        '</ul>' +
        '</div>' +
        '</div>',
        link: {
            pre: function selectSearchPreLink(scope, element, attr, ctrls) {

                var tmplNode = $(this.template).first();

                var modelName = attr.ngModel,
                    name = attr.name ? attr.name : ('def' + Date.now());
                tmplNode.attr('id', name + '_chosecontianer');

                $animate.enter(tmplNode, element.parent(), element);
            },
            post: function selectSearchPostLink(scope, element, attr, ctrls) {
                var choseNode = element.next(); //$('#'+attr.name +'_chosecontianer');
                choseNode.addClass(attr.class);
                element.addClass('chose-hide');
                // 当前选中项
                var ngModelCtrl = ctrls[0];
                if (!ngModelCtrl || !attr.name) return;

                parseOptions(attr.ngOptions, element, scope);
                var rs = {};

                function setView() {
                    var currentKey = ngModelCtrl.$modelValue;
                    if (isNaN(currentKey) || !currentKey) {
                        currentKey = '';
                        choseNode.find('.j-view:first').text('请选择');
                        choseNode.find('i').addClass('chose-hide');
                    }
                    if ((currentKey + '').length > 0) {
                        for (var i = 0, l = rs.idArray.length; i < l; i++) {
                            if (rs.idArray[i] == currentKey) {
                                choseNode.find('.j-view:first').text(rs.labelArray[i]);
                                choseNode.find('i').removeClass('chose-hide');
                                break;
                            }
                        }
                    }
                }

                function setViewAndData() {
                    if (!scope.options) {
                        return;
                    }
                    rs = scope.options;
                    setView();
                }

                scope.$watchCollection('options', setViewAndData);
                scope.$watch(attr.ngModel, setView);


                function getListNodes(value) {
                    var nodes = [];
                    value = $.trim(value);
                    for (var i = 0, l = rs.labelArray.length; i < l; i++) {
                        if (rs.labelArray[i].indexOf(value) > -1) {
                            nodes.push($('<li>').data('id', rs.idArray[i]).text(rs.labelArray[i]))
                        }
                    }
                    return nodes;

                }

                choseNode.on('keyup', '.j-key', function () {
                    // 搜索输入框keyup，重新筛选列表
                    var value = $(this).val();
                    choseNode.find('ul:first').empty().append(getListNodes(value));
                    return false;
                }).on('click', function () {
                    choseNode.find('.j-drop').removeClass('chose-hide');
                    if (choseNode.find('.j-view:first').text() != '请选择') {
                        choseNode.find('i').removeClass('chose-hide');
                    }
                    choseNode.find('ul:first').empty().append(getListNodes(choseNode.find('.j-key').val()));
                    return false;
                }).on('click', 'ul>li', function () {
                    var _this = $(this);
                    ngModelCtrl.$setViewValue(_this.data('id'));
                    ngModelCtrl.$render();
                    choseNode.find('.j-drop').addClass('chose-hide');
                    return false;

                }).on('click', 'i', function () {
                    ngModelCtrl.$setViewValue('');
                    ngModelCtrl.$render();
                    choseNode.find('.j-view:first').text('请选择');
                    return false;

                });
                $(document).on("click", function () {
                    $('.j-drop').addClass('chose-hide');
                    choseNode.find('i').addClass('chose-hide');
                    return false;
                });

            }
        }
    };
})


app.directive('orz', function () {
    return {
        restrict: 'A',
        //总是和ng-model配合使用
        require: 'ngModel',
        scope: {
            //此方法需要与预先定义好，然后传递给视图控制器中的指令
            action: '&', //把我们所引用的select函数绑定到右边的作用域中
            dateflag: '='//双向绑定变量

        },
        link: function (scope, element, attrs, ngModel) {

            element.datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                language: 'zh-CN',
                autoclose: true,
                clearBtn: true
                //onSelect: function (dateText, inst) {
                //    ngModel.$setViewValue(dateText);
                //    scope.$apply();
                //}
            })
                .on('changeDate', function (e) {
                    //console.log('dp.change'+e.date.format('yyyy'));
                    $(this).datetimepicker('hide');
                    var year = e.date.getFullYear();
                    var month = e.date.getMonth() + 1;
                    if (month < 10) {
                        month = '0' + month;
                    }
                    var date = e.date.getDate();
                    if (date < 10) {
                        date = '0' + date;
                    }
                    var formatDate = year + '-' + month + '-' + date;
                    //console.log(formatDate);
                    //console.debug(scope);
                    ngModel.$setViewValue(formatDate);

                    scope.$apply();
                    scope.action();

                });
        }
    }
});

app.directive('backTop', [function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div id="backtop" class="{{theme}}"><button><div ng-transclude></div></button></div>',
        scope: {
            text: "@buttonText",
            speed: "@scrollSpeed",
            theme: "@buttonTheme"
        },
        link: function (scope, element) {

            scope.text = scope.text || 'Scroll top';
            scope.speed = parseInt(scope.speed, 10) || 300;
            scope.theme = scope.theme || 'light';

            var self = this;

            scope.currentYPosition = function () {
                if (self.pageYOffset)
                    return self.pageYOffset;
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                if (document.body.scrollTop)
                    return document.body.scrollTop;
                return 0;
            };

            scope.smoothScroll = function () {
                var startY = scope.currentYPosition();
                var stopY = 0;
                var distance = stopY > startY ? stopY - startY : startY - stopY;
                if (distance < 100) {
                    scrollTo(0, stopY);
                    return;
                }
                var speed = Math.round(scope.speed / 100);
                var step = Math.round(distance / 25);
                var leapY = stopY > startY ? startY + step : startY - step;
                var timer = 0;
                if (stopY > startY) {
                    for (var i = startY; i < stopY; i += step) {
                        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                        leapY += step;
                        if (leapY > stopY) leapY = stopY;
                        timer++;
                    }
                    return;
                }
                for (var j = startY; j > stopY; j -= step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY -= step;
                    if (leapY < stopY) leapY = stopY;
                    timer++;
                }
            };

            scope.button = element.find('button');

            scope.button.on('click', function () {
                scope.smoothScroll();
                element.removeClass('show');
            });

            window.addEventListener('scroll', function () {
                if (window.pageYOffset > 0) {
                    element.addClass('show');
                } else {
                    element.removeClass('show');
                }
            });
        }
    };

}]);


angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) { //依赖于modalInstance
    $scope.items = items;
    $scope.selectedItems = [];
    $scope.selected = {};
    $scope.checkbox = [];
    $scope.showState = 1;
    $scope.setSelectedItems = function (index) {
        var tempShowState = 0;
        for (var i = 0; i < $scope.checkbox.length; i++) {
            tempShowState = tempShowState + $scope.checkbox[i];
        }
        if (tempShowState == 0) {
            $scope.showState = 0;
        }
        else {
            $scope.showState = 1;
        }

    }
    $scope.ok = function () {
        for (var i = 0; i < $scope.checkbox.length; i++) {
            if ($scope.checkbox[i] == 1) {
                $scope.selectedItems.push($scope.items[i]);
            }

        }
        //$scope.selected=$scope.selectedItems[0];
        $modalInstance.close($scope.selectedItems); //关闭并返回当前选项

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel'); // 退出
    }
});

angular.module('myApp').controller('ModalDeviceCtrl', function ($scope, $modalInstance, myModalCarDeviceList) { //依赖于modalInstance
    $scope.modalCarDeviceList = myModalCarDeviceList;
    var initialCarDeviceList = JSON.stringify(myModalCarDeviceList);

    $scope.selected = {};
//        $scope.selected = {
//            item : $scope.items[0]
//        };
    $scope.grandTotal = function (modalCarDeviceList) {
        var totalamount = 0;
        for (var i = 0; i < modalCarDeviceList.length; i++) {
            if (!(modalCarDeviceList[i].actualValue == "" || modalCarDeviceList[i].actualValue == null)) {
                totalamount = modalCarDeviceList[i].actualValue + totalamount;
            }
        }
        return totalamount;
    };
    $scope.add = function () {
//            $modalInstance.close($scope.selected); //关闭并返回当前选项
        var device = {
            "deviceName": "",
            "actualValue;": ""
        }
        $scope.modalCarDeviceList.push(device);

    };
    $scope.confirm = function () {
        var newCarDeviceList = [];
        for (var i = 0; i < $scope.modalCarDeviceList.length; i++) {
            if ($scope.modalCarDeviceList[i].deviceName != "" && $scope.modalCarDeviceList[i].actualValue != "") {
                newCarDeviceList.push($scope.modalCarDeviceList[i]);
            }
        }
        $modalInstance.close(newCarDeviceList); //关闭并返回当前选项

    };
//        resert
    $scope.resert = function () {
        $scope.modalCarDeviceList = [
            {"deviceName": "", "actualValue": ""},
            {"deviceName": "", "actualValue": ""},
            {"deviceName": "", "actualValue": ""},
            {"deviceName": "", "actualValue": ""}
        ]

    };
    $scope.cancel = function () {
        $modalInstance.dismiss(initialCarDeviceList); // 退出
    }
});

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
function getBrowserInfo() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
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