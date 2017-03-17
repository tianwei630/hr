package com.chinaLife.hr.service.test;

/**
 * Created by tianwei on 2017/2/27.
 */
public class SuanFa {


    int[] maopao(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
         for(int k=0;k<array.length-1-i;k++){
             int temp;
             if (array[k] > array[k + 1]) {
                 temp = array[k];
                 array[k] = array[k + 1];
                 array[k+1]=temp;
             }
         }

        }

        return array;
    }
      //插入排序
    int[]  insertSort(int[] array){
        int[] temp=new int[array.length];
        for(int i=1;i<array.length;i++){
           if(i==1){
               int[] sortArray={array[0]};
               temp= insertData(array[i],sortArray);
           }
            else {
               temp=insertData(array[i],temp);
           }
        }
       return temp;
    }

    int[] insertData(int data,int[] array){
        int[] newArray=new int[array.length+1];
        if(data<array[0]){
            newArray[0]=data;
            for(int k=1;k<newArray.length;k++){
                newArray[k]=array[k-1];
            }
        }
        if(data>array[array.length-1]){
            newArray[newArray.length-1]=data;
            for(int k=0;k<newArray.length-1;k++){
                newArray[k]=array[k];
            }
        }
        else {
            for(int i=0;i<array.length;i++){
                if(data>array[i]&&data<array[i+1]){
                    for(int k=0;k<newArray.length;k++){
                        if(k<i+1){
                            newArray[k]=array[k];
                        }
                        if(k==i+1){
                            newArray[k]=data;
                        }
                        if(k>i+1){
//                            System.out.println("length:"+k);
                            newArray[k]=array[k-1];
                        }
                    }
                }

            }
        }
         return newArray;
    }

    //选择排序
//    int[] xuanze(int[] array){
//        int[] sortArray=new int[array.length];
//        for(int i=0;i<sortArray.length;i++){
//            int min;
//            for(int j=0;j<array.length;j++){
//
//            }
//        }
//    }

    public static void main(String[] args){
        int [] array={3,5,1,8,4,9,2,13,11};
//        int [] array={3};
        SuanFa suanFa = new SuanFa();
//        int[] sortArray = suanFa.maopao(array);
//        int[] sortArray = suanFa.insertData(1,array);
        int[] sortArray=suanFa.insertSort(array);
        for(int i=0;i<sortArray.length;i++){
            System.out.print(sortArray[i]+",");
        }
    }
}
