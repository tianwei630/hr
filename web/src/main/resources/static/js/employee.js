var app = angular.module('myApp', ['AxelSoft','ngRoute']);
app.controller('myController', function ($scope, $http, $log, $filter,$timeout,$q,$location,$window) {

    $scope.employee={};
    $scope.showStatus=1;
    $scope.query={};
    $scope.mainInfo={};
    $scope.educationInfo = {
        "name": "",
        "identityNumber": "",
        "educations": [
        ],
        add: function () {
            this.educations.push(
                {
                    "beginDate": "",
                    "endDate": "",
                    "graduateSchool": "",
                    "education": "",
                    "degree": "",
                    "major": "",
                    "fullTimeFlag": ""
                }
            );
        },
        remove: function (index) {
            if (this.educations.length == 1) {
                swal("系统提示", "必须录入至少一条教育信息", "error");
                return;
            }
            this.educations.splice(index, 1);
        }
    }
    $scope.payment={};

    $http.get('api-a/get?remark=人员清分')
        .success(function (data, status) {
            $scope.personTypes = data;
            $scope.employee.personType = $scope.personTypes[0];

            $scope.personTypeOptions.onSelect( $scope.personTypes[0]);
        })
        .error(function (data, status) {
            swal("系统提示", "获取人员清分信息失败", "error");
        })


    $http.get('api-a/get?remark=部门')
        .success(function (data, status) {
            $scope.comCodes = data;
            $scope.employee.comCode = $scope.comCodes[0];

            $scope.comCodeOptions.onSelect($scope.comCodes[0]);
        })
        .error(function (data, status) {
            swal("系统提示", "获取部门信息失败", "error");
        })

    $http.get('api-a/get?remark=二级部门')
        .success(function (data, status) {
            $scope.teamCodes = data;
        })
        .error(function (data, status) {
            swal("系统提示", "获取二级部门信息失败", "error");
        })

    $http.get('api-a/get?remark=所属渠道')
        .success(function (data, status) {
            $scope.channelTypes = data;
            $scope.employee.channelType = $scope.channelTypes[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取渠道信息失败", "error");
        })

    $http.get('api-a/get?remark=岗位类别')
        .success(function (data, status) {
            $scope.postTypes = data;
            $scope.employee.postType = $scope.postTypes[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取岗位类别信息失败", "error");
        })
    $http.get('api-a/get?remark=户籍')
        .success(function (data, status) {
            $scope.residences = data;
            $scope.employee.residence = $scope.residences[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取户籍信息失败", "error");
        })
    $http.get('api-a/get?remark=民族')
        .success(function (data, status) {
            $scope.nations = data;
            $scope.employee.nation = $scope.nations[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取民族信息失败", "error");
        })
    $http.get('api-a/get?remark=政治面貌')
        .success(function (data, status) {
            $scope.politicalStatuss = data;
            $scope.employee.politicalStatus = $scope.politicalStatuss[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取政治面貌信息失败", "error");
        })
    $http.get('api-a/get?remark=学历')
        .success(function (data, status) {
            $scope.educations = data;
            $scope.employee.education = $scope.educations[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取学历信息失败", "error");
        })
    $http.get('api-a/get?remark=学位')
        .success(function (data, status) {
            $scope.degrees = data;
            $scope.employee.degree = $scope.degrees[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取学位信息失败", "error");
        })
    $http.get('api-a/get?remark=职称级别')
        .success(function (data, status) {
            $scope.professionalLevels = data;
            $scope.employee.professionalLevel = $scope.professionalLevels[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取职称级别失败", "error");
        })
    $http.get('api-a/get?remark=合同类型')
        .success(function (data, status) {
            $scope.contractTyes = data;
            $scope.employee.contractTye = $scope.contractTyes[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取合同级别失败", "error");
        })
    $http.get('api-a/get?remark=婚姻状态')
        .success(function (data, status) {
            $scope.maritalStatuss = data;
            $scope.employee.maritalStatus = $scope.maritalStatuss[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取婚姻状况信息失败", "error");
        })
    $http.get('api-a/get?remark=在职状态')
        .success(function (data, status) {
            $scope.statuss = data;
            $scope.employee.status = $scope.statuss[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取在职状态信息失败", "error");
        })

    $http.get('api-a/get?remark=职级')
        .success(function (data, status) {
            $scope.jobLevels = data;
            $scope.payment.jobLevel = $scope.jobLevels[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取职级信息失败", "error");
        })

    $http.get('api-a/get?remark=档次')
        .success(function (data, status) {
            $scope.jobGrades = data;
            $scope.payment.jobGrade = $scope.jobGrades[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取档次信息失败", "error");
        })


    $scope.comCodeOptions = {
        onSelect: function (item) {
            console.log($scope.employee.comCode);
        }
    };
    $scope.teamCodeOptions = {
        onSelect: function (item) {
        }
    };
    $scope.channelTypeOptions = {
        onSelect: function (item) {
        }
    };
    $scope.postTypeOptions = {
        onSelect: function (item) {
        }
    };
    $scope.residenceOptions = {
        onSelect: function (item) {
        }
    };
    $scope.nationOptions = {
        onSelect: function (item) {
        }
    };
    $scope.politicalStatusOptions = {
        onSelect: function (item) {
        }
    };
    $scope.educationOptions = {
        onSelect: function (item) {
        }
    };
    $scope.degreeOptions = {
        onSelect: function (item) {
        }
    };
    $scope.professionalLevelOptions = {
        onSelect: function (item) {
        }
    };
    $scope.contractTyeOptions = {
        onSelect: function (item) {
        }
    };
    $scope.maritalStatusOptions = {
        onSelect: function (item) {
        }
    };
    $scope.statusOptions = {
        onSelect: function (item) {
        }
    };
    $scope.personTypeOptions = {
        onSelect: function (item) {

        }
    };

    //$scope.findEmployee=function(){
    //    $scope.showStatus=1;
    //}
//


    $scope.findEmployee=function(){
        if($scope.query.identityNumber==null||$scope.query.identityNumber==''){
            swal("系统提示","身份证号不能为空","warning");
            return;
        }
        var employeeUrl='api-a/findEmployee?identityNumber='+$scope.query.identityNumber;
        $http.get(employeeUrl)
            .success(function (data, status) {
                if(data==null||data==''){
                    swal("系统提示","该人员在系统不存在","warning");
                    return;
                }
                $scope.employee = data;


                var educationUrl='api-a/findEducation?identityNumber='+$scope.query.identityNumber;
                $http.get(educationUrl)
                    .success(function (data, status) {
                        $scope.educationInfo = data;
                        //$scope.educationInfo.educations[0].fullTimeFlag="1";
                        for(var i=0;i<$scope.educationInfo.educations.length;i++){
                            var fullTimeFlag = parseInt($scope.educationInfo.educations[i].fullTimeFlag);
                            $scope.educationInfo.educations[i].fullTimeFlag=fullTimeFlag;
                        }
                        //console.log($scope.xxs);
                    })
                    .error(function (data, status) {
                        swal("系统提示", "教育信息查询失败", "error");
                    })

                var workUrl='api-a/findWork?identityNumber='+$scope.query.identityNumber;
                $http.get(workUrl)
                    .success(function (data, status) {
                        $scope.workInfo = data;
                    })
                    .error(function (data, status) {
                        swal("系统提示", "工作信息查询失败", "error");
                    })

                var accountUrl='api-a/findAccount?identityNumber='+$scope.query.identityNumber;
                $http.get(accountUrl)
                    .success(function (data, status) {
                        $scope.accountInfo = data;
                    })
                    .error(function (data, status) {
                        swal("系统提示", "账号信息查询失败", "error");
                    })

                //findPayment
                var paymentUrl='api-a/findPayment?identityNumber='+$scope.query.identityNumber;
                $http.get(paymentUrl)
                    .success(function (data, status) {
                        $scope.paymentInfo = data;
                    })
                    .error(function (data, status) {
                        swal("系统提示", "账号信息查询失败", "error");
                    })


                $scope.showStatus=0;
                $location.path("/employeeInfo");

            })
            .error(function (data, status) {
                swal("系统提示", "人员信息查询失败", "error");
            })

    }

//    修改并员工信息
    $scope.save=function(){
        var saveEmployeeUrl="api-a/saveEmployee";
        $http.post(saveEmployeeUrl,$scope.employee)
            .success(function(data,status){
                $scope.resultInfo=data;
                if($scope.resultInfo.code=="V001"){
                    swal("系统提示", $scope.resultInfo.message, "success");
                }
                else {
                    swal("系统提示", $scope.resultInfo.errorMessage, "warning");
                }
            })
            .error(function(data,status){
                swal("系统提示","系统错误","error");
            })
    }

//    下载人员信息pdf
//    浏览器展示pdf
    $scope.generatePDF = function (demandNo) {
        var url = 'api-a/generatePDF/';
        $scope.mainInfo={
            "employee":$scope.employee,
            "educationInfo":$scope.educationInfo,
            "workInfo":$scope.workInfo,
            "paymentInfo":$scope.paymentInfo
        }
        $http({
            url: url,
            method: "POST",
            data: $scope.mainInfo, //this is your json data string
            responseType:"arraybuffer"
        })
            .success(function (response) {
            var file = new Blob([response], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
        })
            .error(function (data, status) {
                            //alert(error);
                            swal("系统提示", "人员信息生成失败，请联系管理员", "error");
                        })
    }
})

//ng-view 设置
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/employeeInfo', {
            //controller : 'myController',
            templateUrl: 'employeeInfo1.html'

        })
        .when('/', {
            //controller : 'applicantController',
            templateUrl: 'blank.html'
        })

        .otherwise({
            redirectTo: '/'
        });
}]);

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
})
