angular

    .module('app', ['angularFileUpload'])


    .controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        $scope.input={
            "kindCode":"1"
        };
        var uploader=$scope.uploader = new FileUploader();
        //var uploader = $scope.uploader = new FileUploader({
        //    url: 'api-a/upload1'
        //});

        // FILTERS
      
        // a sync filter
        uploader.filters.push({
            name: 'queueLimit',
            fn: function(item) {
                if(this.queue.length>0){
                    swal("系统提示", "暂时只允许上传一个文件", "error");
                }
                //return this.queue.length < 2;
                return this.queue.length<1;
            }
        });
      

        // CALLBACKS

        //uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //    console.info('onWhenAddingFileFailed', item, filter, options);
        //};
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);

        };
        //uploader.onAfterAddingAll = function(addedFileItems) {
        //    console.info('onAfterAddingAll', addedFileItems);
        //};
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);

            item.url="api-a/uploadFile";
            item.formData=[
                {"type":$scope.input.kindCode}
            ]
        };
        //uploader.onProgressItem = function(fileItem, progress) {
        //    console.info('onProgressItem', fileItem, progress);
        //};
        //uploader.onProgressAll = function(progress) {
        //    console.info('onProgressAll', progress);
        //};
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            //console.info('onSuccessItem', fileItem, response, status, headers);
            console.log(fileItem);
            console.log(response);
            console.log(status);
            console.log(headers);
        };
        //uploader.onErrorItem = function(fileItem, response, status, headers) {
        //    console.info('onErrorItem', fileItem, response, status, headers);
        //};
        //uploader.onCancelItem = function(fileItem, response, status, headers) {
        //    console.info('onCancelItem', fileItem, response, status, headers);
        //};
        //uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //    console.info('onCompleteItem', fileItem, response, status, headers);
        //};
        //uploader.onCompleteAll = function() {
        //    console.info('onCompleteAll');
        //};
        //
        //console.info('uploader', uploader);
    }]);
