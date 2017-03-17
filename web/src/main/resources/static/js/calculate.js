/**
 * 保费计算js
 */
var app = angular.module('myApp', ['angularjs-datetime-picker']);
    app.controller('myController', function ($scope, $http) {
    	 $scope.mainInfo = {
    	            "insuredList": [{
    	                "insuredName": "",
    	                "insuredType": "1",
    	                "identifyType": "01",
    	                "identifyNumber": "",
    	                "mobile": "",
    	                "sex": "2",
    	                "email": "",
    	                "postCode": "",
    	                "addressName": "",
    	                "linkerName": "",
    	                "customerCName": ""
    	            }
    	            ]
    	        };
    	 
//       被保险人查询
         $scope.insuredQuery = function () {
             var customerInfo = {
                 "customerCName": $scope.mainInfo.insuredList[1].insuredName,
                 "customerType": $scope.mainInfo.insuredList[1].insuredType,
                 "identifyType": $scope.mainInfo.insuredList[1].identifyType,
                 "identifyNumber": $scope.mainInfo.insuredList[1].identifyNumber,
                 "idvSex": $scope.mainInfo.insuredList[1].sex
             }
             var insuredType = $scope.mainInfo.insuredList[1].insuredType;
             alert(JSON.stringify(customerInfo));
//            var datas= JSON.stringify($scope.mainInfo.insuredList[0]);
//            /car/getCustomerInfo/{id}
             $http.post('car/getCustomerInfo/07', customerInfo)
                     .success(function (data, status) {
                   //  alert(identifyType);
                         var customerInfo = data;
                         $scope.mainInfo.insuredList[1] = {
                             "insuredName": customerInfo.customerCName,
                             "insuredType":insuredType,
                             "identifyType": customerInfo.identifyType,
                             "identifyNumber": customerInfo.identifyNumber,
                             "sex": customerInfo.sex,
                             "insuredCode": customerInfo.customerCode,
                             "mobile":customerInfo.phoneNumber,
                             "birthDay":customerInfo.birthDate,
                             "email": customerInfo.email,
                             "addressName":customerInfo.addressCName,
                             "postCode":customerInfo.postCode
                         }


                         alert(JSON.stringify($scope.mainInfo.insuredList[1]));

                     })
                     .error(function (data, status) {

                         alert("查询失败");
                         alert(data);
                     });

         };
         
//       是否同被保险人
         $scope.isSample = function (toInsured) {
             alert(toInsured == "1");
             if (toInsured == "1") {
                 $scope.mainInfo.insuredList[0] = {
                     "insuredName": $scope.mainInfo.insuredList[1].insuredName,
                     "insuredType": $scope.mainInfo.insuredList[1].insuredType,
                     "identifyType": $scope.mainInfo.insuredList[1].identifyType,
                     "identifyNumber": $scope.mainInfo.insuredList[1].identifyNumber,
                     "birthDay": $scope.mainInfo.insuredList[1].birthDay,
                     "sex":$scope.mainInfo.insuredList[1].sex
                 };
             }
             else {
                 $scope.mainInfo.insuredList[0] = {};
             }
         };
         
     /**
      * 车型查询
      */    
         //初始化新车标志
         $scope.mainInfo.carInfo = {
                 "newCarFlag": "0"
             };
         
         $scope.getVehicleModelQuery = function () {
             var newCarFlag = $scope.mainInfo.carInfo.newCarFlag;

             var carInfo = {
            		 "carKindCode":$scope.mainInfo.carInfo.carType,
            		 "licenseType":$scope.mainInfo.carInfo.licenseType,
            		 "useNatureCode":$scope.mainInfo.carInfo.useNatureCode,
            		 "enrollDate":$scope.mainInfo.carInfo.enrollDate,
            		 "brandName":$scope.mainInfo.carInfo.brandName,
            		 "busiStartDate":$scope.mainInfo.main.startDate
             }
             
             
            // alert(JSON.stringify(carInfo));
             $http.post('car/getVehicleModelList/04', carInfo)
                     .success(function (data, status,header,config) {
                         $scope.carInfoList = data;

//                         alert(JSON.stringify($scope.carInfoList));
                         alert(status);

                     })
                     .error(function (data, status,header,config) {
                          alert(header);
                         alert(status);
                     });
         };
         
 
         /**
          * 险别列表，报价模块
          */
    	 
    	$scope.mainInfo.combosList = [];
        $scope.temp = [];
        $scope.temp[0] = {
            "itemKindList": [{
                "kindCode": "",
                "amount": "",
                "m1Value": "",
                "deductableFlag": "",
                "rateFactor": "",
                "benchMarkPremium": ""

            }]
        };
        $scope.temp[1] = {
                "itemKindList": [{
                    "kindCode": "",
                    "amount": "",
                    "m1Value": "",
                    "deductableFlag": "",
                    "rateFactor": "",
                    "benchMarkPremium": ""

                }]
            };


        //基本险种
        $scope.temp[0].itemKindList = [
            {"kindCode": "001", "kindName": "机动车损失保险", "deductableFlag": "0"},
            {"kindCode": "002", "kindName": "机动车第三者责任保险", "deductableFlag": "0"},
            {"kindCode": "007", "kindName": "机动车全车盗抢保险", "deductableFlag": "0"},
            {"kindCode": "003", "kindName": "机动车车上人员责任保险（司机）", "deductableFlag": "0"},
            {"kindCode": "006", "kindName": "机动车车上人员责任保险（乘客）", "deductableFlag": "0"},
            {"kindCode": "205", "kindName": "机动车划痕损失险", "deductableFlag": "0"},
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
            {"kindCode": "307", "kindName": "不计免赔率险（自燃损失险）", "deductableFlag": "0"},
            {"kindCode": "310", "kindName": "不计免赔率险（发动机涉水损失险）", "deductableFlag": "0"},
            null,
            null,
            {"kindCode": "308", "kindName": "不计免赔率险（新增设备损失保险）", "deductableFlag": "0"},
            {"kindCode": "311", "kindName": "不计免赔率险（车上货物责任险）", "deductableFlag": "0"},
            {"kindCode": "315", "kindName": "不计免赔率险（精神损害抚慰金责任险）", "deductableFlag": "0"},
            null
                                                ];
      //标记是否选中对应险种 
        $scope.kind = [];
        
        //车损险的参考实际价值等于平台返回的车辆实际价值
        $scope.changeAmount=function(){
            $scope.temp[0].itemKindList[0].amount=$scope.mainInfo.carInfo.actualValue;
        };
        
        //点击报价
        $scope.baojia = function () {
        	$scope.selected = [];
        	$scope.mainInfo.combosList[0] = {
                    "itemKindList": [{
                        "kindCode": "",
                        "amount": "",
                        "m1Value": "",
                        "deductableFlag": "",
                        "rateFactor": "",
                        "benchMarkPremium": ""

                    }]
                }; //存储商业险险别列表
        	//处理商业险险别列表
        	for(var flag = 0;flag<$scope.temp[0].itemKindList.length;flag=flag+1){
        		if($scope.kind[flag]=="1"){
        			$scope.selected.push($scope.temp[0].itemKindList[flag]);	
        			if($scope.temp[0].itemKindList[flag].deductableFlag=="1"){
        				$scope.temp[1].itemKindList[flag].amount="0";
        				$scope.selected.push($scope.temp[1].itemKindList[flag]);	
        			}
        				
        		}
        	}
        	$scope.mainInfo.combosList[0].itemKindList = $scope.selected;
        	
//          将车型查询返回值绑定到车辆请求信息上
            $scope.mainInfo.carInfo.completeKerbMass = $scope.carInfo.vehicleWeight;
            $scope.mainInfo.carInfo.tonCount = $scope.carInfo.vehicleTonnage;
            $scope.mainInfo.carInfo.exhaustScale = $scope.carInfo.exhaustCapacity;
            $scope.mainInfo.carInfo.purchasePrice = $scope.carInfo.purchasePrice;
            $scope.mainInfo.carInfo.actualValue = $scope.carInfo.actualValue;
            $scope.mainInfo.carInfo.rbCode = $scope.carInfo.rbcode;
            $scope.mainInfo.carInfo.platmodelCode = $scope.carInfo.platModelCode;
            $scope.mainInfo.carInfo.platmodelname = $scope.carInfo.platModelName;
            $scope.mainInfo.carInfo.importFlag = $scope.carInfo.importFlag;
            $scope.mainInfo.carInfo.seatCount = $scope.carInfo.seatCount;

//            设置车辆车主信息
            $scope.mainInfo.carInfo.carOwner=$scope.mainInfo.insuredList[0].insuredName;
            $scope.mainInfo.carInfo.carOwnerNature=$scope.mainInfo.insuredList[0].insuredType;
            $scope.mainInfo.carInfo.carOwnerIdentifyType=$scope.mainInfo.insuredList[0].identifyType;
            $scope.mainInfo.carInfo.carOwnerIdentifyNumber=$scope.mainInfo.insuredList[0].identifyNumber;
            $scope.mainInfo.carInfo.vin = $scope.mainInfo.carInfo.frameNo;
            
            alert(JSON.stringify($scope.mainInfo.carInfo));
            
            $scope.mainInfo.applicant = {
                    "insuredNature": "3",
                    "insuredType": "1",
                    "identifyType": "01",
                    "identifyNumber": "341022199207102513",
                    "appliName": "程杰"
                };
            
        	var info = JSON.stringify($scope.mainInfo);
        	alert(info);
           
            $http.post('car/premiumCalculate/06', info)
                    .success(function (data, status) {
//                        $scope.mainInfo = data;
                        alert(status);

                    })
                    .error(function (data, status) {
                        alert(status);
                    }); 

        };
    });
        
        $("#passengerCount").keyup(function () {
            $("#passengerAmount").val($("#passengerPer").val() * $("#passengerCount").val()).trigger('input');
        });

        $("#passengerPer").keyup(function () {
            $("#passengerAmount").val($("#passengerPer").val() * $("#passengerCount").val()).trigger('input');
        });

        $("#seatCount").keyup(function () {
            $("#fixAmount").val($("#seatCount").val() * $("#perAmount").val()).trigger('input');
        });

        $("#perAmount").keyup(function () {
            $("#fixAmount").val($("#seatCount").val() * $("#perAmount").val()).trigger('input');
        });
        
