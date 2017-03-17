package com.chinaLife.hr.service.test;

/**
 * Created by tianwei on 2017/2/27.
 */
public class Single {

    Single(){

    }

    public static void main(String[] args){
        SingleEnum single = SingleEnum.SINGLE;
        Single single1 = single.getInstance();
        Single single2 = single.getInstance();
        System.out.println(single1==single2);
    }
}
