var app = angular.module('myApp', ['AxelSoft','ngRoute']);
app.controller('myController', function ($scope, $http, $log, $filter,$timeout,$q,$location,$window) {

    $scope.showStatus=1;

    $scope.query = {
        "name": "",
        "identityNumber": ""
    };

    $http.get('api-a/get?remark=学历')
        .success(function (data, status) {
            $scope.educations = data;
            //$scope.education.education = $scope.educations[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取学历信息失败", "error");
        })
    $http.get('api-a/get?remark=学位')
        .success(function (data, status) {
            $scope.degrees = data;
            //$scope.education.degree = $scope.degrees[0];
        })
        .error(function (data, status) {
            swal("系统提示", "获取学位信息失败", "error");
        })

    $scope.findEmployee=function(){
        if ($scope.query.identityNumber == null || $scope.query.identityNumber == '') {
            swal("系统提示", "身份证号不能为空", "warning");
            return;
        }
        var employeeUrl = 'api-a/findEmployee?identityNumber=' + $scope.query.identityNumber;
        $http.get(employeeUrl)
            .success(function (data, status) {
                if (data == null || data == '') {
                    swal("系统提示", "该人员在系统不存在", "warning");
                    return;
                }
                var educationUrl = 'api-a/findEducation?identityNumber=' + $scope.query.identityNumber;
                $http.get(educationUrl)
                    .success(function (data, status) {
                        if (data == null || data == '') {
                            $scope.educationInfo = {
                                "name": "",
                                "identityNumber": "",
                                "educations": [
                                    {
                                        "beginDate": "",
                                        "endDate": "",
                                        "graduateSchool": "",
                                        "education": "",
                                        "degree": "",
                                        "major": "",
                                        "fullTimeFlag": "",
                                        "version":""
                                    },
                                    {
                                        "beginDate": "",
                                        "endDate": "",
                                        "graduateSchool": "",
                                        "education": "",
                                        "degree": "",
                                        "major": "",
                                        "fullTimeFlag": "",
                                        "version":""
                                    }

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
                                            "fullTimeFlag": "",
                                            "version":""
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


                        }
                        else {
                            $scope.educationInfo = data;
                            for(var i=0;i<$scope.educationInfo.educations.length;i++){
                                var fullTimeFlag = parseInt($scope.educationInfo.educations[i].fullTimeFlag);
                                $scope.educationInfo.educations[i].fullTimeFlag=fullTimeFlag;
                            }
                            $scope.educationInfo.add = function () {
                                this.educations.push(
                                    {
                                        "beginDate": "",
                                        "endDate": "",
                                        "graduateSchool": "",
                                        "education": "",
                                        "degree": "",
                                        "major": "",
                                        "fullTimeFlag": "",
                                        "version":""
                                    }
                                );
                            }

                            $scope.educationInfo.remove = function (index) {
                                if (this.educations.length == 1) {
                                    swal("系统提示", "必须录入至少一条教育信息", "error");
                                    return;
                                }
                                this.educations.splice(index, 1);
                            }

                        }

                    })
                    .error(function (data, status) {
                        swal("系统提示", "教育信息查询失败", "error");
                    })
                $scope.showStatus = 0;
                $location.path("/educationInfo");

            })
            .error(function (data, status) {
                swal("系统提示", "人员信息查询失败", "error");
            })
        //$scope.showStatus=0;
        //$location.path("/educationInfo");
    }

    //    保存教育信息
    $scope.save = function () {
        console.log($scope.educationInfo);
        //    saveWork
        var saveEducationUrl = 'api-a/saveEducation';
        $http.post(saveEducationUrl, $scope.educationInfo)
            .success(function (data, status) {
                $scope.resultInfo=data;
                if($scope.resultInfo.code=="V001"){
                    swal("系统提示", $scope.resultInfo.message, "success");
                }
                else {
                    swal("系统提示", $scope.resultInfo.errorMessage, "warning");
                }

            })
            .error(function (data, status) {
                swal("系统提示", "系统错误", "error");
            })
    }

//
})

//ng-view 设置
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/educationInfo', {
            //controller : 'myController',
            templateUrl: 'educationInfo1.html'

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
