package com.chinaLife.hr.service.test;


/**
 * Created by tianwei on 2017/2/27.
 */
public enum SingleEnum {
    SINGLE;
     private Single single;
  private  SingleEnum() {
      single=new Single();
    }
    public Single getInstance(){
          return single;

    }
}
