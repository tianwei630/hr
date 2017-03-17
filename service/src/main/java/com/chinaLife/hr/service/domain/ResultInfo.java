package com.chinaLife.hr.service.domain;

import java.io.Serializable;

/**
 * Created by tianwei on 2017/2/15.
 */
public class ResultInfo<T> implements Serializable{
    private String code;
    private String errorCode;
    private String  message;
    private String errorMessage;
    private String requestType;
    private T data;


    @Override
    public String toString() {
        return "ResultInfo{" +
                "code='" + code + '\'' +
                ", errorCode='" + errorCode + '\'' +
                ", message='" + message + '\'' +
                ", errorMessage='" + errorMessage + '\'' +
                ", requestType='" + requestType + '\'' +
                ", data=" + data +
                '}';
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
