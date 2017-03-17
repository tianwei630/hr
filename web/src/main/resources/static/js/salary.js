var app = angular.module('myApp', ['AxelSoft', 'ngRoute']);
app.controller('myController', function ($scope, $http, $log, $filter, $timeout, $q, $location, $window) {

    //$scope.employee={};
    $scope.showStatus = 1;
    $scope.query = {
        "name": "",
        "identityNumber": "",
        "year":"2017",
        "month":1
    };
    var oldForm={};


    $scope.findEmployee = function () {
        if ($scope.query.identityNumber == null || $scope.query.identityNumber == '') {
            swal("系统提示", "身份证号不能为空", "warning");
            return;
        }
        if ($scope.query.year == null || $scope.query.year == '') {
            swal("系统提示", "年份不能为空", "warning");
            return;
        }
        if ($scope.query.month == null || $scope.query.month == '') {
            swal("系统提示", "月份不能为空", "warning");
            return;
        }
        var employeeUrl = 'api-a/findEmployee?identityNumber=' + $scope.query.identityNumber;
        $http.get(employeeUrl)
            .success(function (data, status) {
                if (data == null || data == '') {
                    swal("系统提示", "该人员在系统不存在", "warning");
                    return;
                }
                var salaryUrl = 'api-a/findSalaryMonth';
                $http.post(salaryUrl,$scope.query)
                    .success(function (data, status) {
                        if (data == null || data == '') {
                            swal("系统提示", "该人员该月暂无工资信息", "warning");
                        }
                        else {
                            $scope.salaryInfo = data;
                            $scope.showStatus = 0;
                            $location.path("/salaryMonthInfo");
                        }

                    })
                    .error(function (data, status) {
                        swal("系统提示", "工资信息查询失败", "error");
                    })


            })
            .error(function (data, status) {
                swal("系统提示", "人员信息查询失败", "error");
            })


    }

//
})

//ng-view 设置
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/salaryMonthInfo', {
            //controller : 'myController',
            templateUrl: 'salaryMonthInfo1.html'

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

            element.datepicker({
                minView: "year",
                format: "yyyy",
                language: 'zh-CN',
                autoclose: true,
                clearBtn: true
                //onSelect: function (dateText, inst) {
                //    ngModel.$setViewValue(dateText);
                //    scope.$apply();
                //}
            })
                .on('changeDate', function (e) {

                    //$(this).datetimepicker('hide');
                    //var year = e.date.getFullYear();
                    //var month = e.date.getMonth() + 1;
                    //if (month < 10) {
                    //    month = '0' + month;
                    //}
                    //var date = e.date.getDate();
                    //if (date < 10) {
                    //    date = '0' + date;
                    //}
                    //var formatDate = year + '-' + month + '-' + date;
                    ////console.log(formatDate);
                    ////console.debug(scope);
                    //ngModel.$setViewValue(formatDate);
                    //
                    //scope.$apply();
                    //scope.action();

                });
        }
    }
})
