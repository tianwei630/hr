package com.chinaLife.hr.service.exception;

import com.chinaLife.hr.service.constant.Constants;
import com.chinaLife.hr.service.domain.ResultInfo;
import org.hibernate.StaleObjectStateException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by tianwei on 2017/2/21.
 */
//统一异常处理
    @ControllerAdvice
public class DefaultExceptionHandler {

    @ExceptionHandler(value = StaleObjectStateException.class )
    @ResponseBody
    public ResultInfo  handleInvalidData( StaleObjectStateException exception){
        ResultInfo resultInfo= new ResultInfo();
        resultInfo.setCode(Constants.ERROR_CODE);
        resultInfo.setMessage(Constants.ERROR_MSG);
        resultInfo.setErrorCode(Constants.DATA_EXPIRE_CODE);
        resultInfo.setErrorMessage(Constants.DATA_EXPIRE_MSG);
        return resultInfo;
    }
}
