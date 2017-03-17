var app = angular.module('myApp', ['ngRoute']);
app.controller('myController', function ($scope, $http, $log, $filter, $timeout, $q, $location, $window) {
    $scope.showStatus = 1;

    $scope.query = {
        "identityNumber": "",
        "name": ""
    }
    $scope.accountInfo={
        "id":"",
        "name":"",
        "identityNumber":"",
        "accountNo":"",
        "socialInsuranceNo":"",
        "houseNo":"",
        "version":""
    }
    $scope.findEmployee = function () {
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
                var accoutUrl = 'api-a/findAccount?identityNumber=' + $scope.query.identityNumber;
                $http.get(accoutUrl)
                    .success(function (data, status) {
                        if (data == null || data == '') {

                        }
                        else {
                            $scope.accountInfo = data;
                        }

                    })
                    .error(function (data, status) {
                        swal("系统提示", "账号信息查询失败", "error");
                    })
                $scope.showStatus = 0;
                $location.path("/accountInfo");

            })
            .error(function (data, status) {
                swal("系统提示", "账号信息查询失败", "error");
            })
        //$scope.showStatus=0;
        //$location.path("/accountInfo");
    }
    $scope.save = function () {
        var accoutUrl = 'api-a/saveAccount';
        console.log($scope.accountInfo);
        $http.post(accoutUrl, $scope.accountInfo)
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
})


//ng-view 设置
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/accountInfo', {
            //controller : 'myController',
            templateUrl: 'accountInfo1.html'

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