var app = angular.module('myApp', ['AxelSoft','ngRoute']);
app.controller('myController', function ($scope, $http, $log, $filter,$timeout,$q,$location,$window) {

    $scope.showStatus=1;
    $scope.query={
        "jobLevel":{
            "id":"",
            "code":"",
            "name":""
        },
        "jobGrade":{
            "id":"",
            "code":"",
            "name":""
        }
    };
    $scope.paymentStandardInfo={
        "jobLevel":{
            "id":"",
            "code":"",
            "name":""
        },
        "jobGrade":{
            "id":"",
            "code":"",
            "name":""
        }
    };


    $http.get('api-a/get?remark=职级')
        .success(function (data, status) {
            $scope.jobLevels = data;
            $scope.paymentStandardInfo.jobLevel = $scope.jobLevels[0];
            $scope.jobLevelOptions.onSelect( $scope.jobLevels[0]);
        })
        .error(function (data, status) {
            swal("系统提示", "获取职级信息失败", "error");
        })

    $http.get('api-a/get?remark=档次')
        .success(function (data, status) {
            $scope.jobGrades = data;
            $scope.paymentStandardInfo.jobGrade = $scope.jobGrades[0];

            $scope.jobGradeOptions.onSelect( $scope.jobGrades[0]);
        })
        .error(function (data, status) {
            swal("系统提示", "获取档次信息失败", "error");
        })


    $scope.jobLevelOptions = {
        onSelect: function (item) {

        }
    };

    $scope.jobGradeOptions = {
        onSelect: function (item) {

        }
    };


    $scope.findPaymentStandard=function(){

        if ($scope.query.jobLevel.code == '' || $scope.query.jobGrade.code == '') {
            swal("系统提示", "职级和档次信息不能为空", "warning");
            return;
        }
        var paymentStandUrl="api-a/findPaymentStandard?jobLevel="+$scope.query.jobLevel.code+"&jobGrade="+$scope.query.jobGrade.code;
        console.log(paymentStandUrl);
        $http.get(paymentStandUrl)
            .success(function (data, status){
                if(data==null||data==''){
                    swal("系统提示","职级档次信息不存在","warning");
                    return;
                }
                else{
                    $scope.paymentStandardInfo=data;
                    $scope.showStatus=0;
                    $location.path("/paymentStandInfo");
                }
            })
            .error(function (data,status) {
                swal("系统提示","查询出错","error");
                return;
            })
        //$scope.showStatus=0;
        //
        //$location.path("/paymentStandInfo");
    }
//
})

//ng-view 设置
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/paymentStandInfo', {
            //controller : 'myController',
            templateUrl: 'paymentStandardInfo1.html'

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
