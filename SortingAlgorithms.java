import java.util.Arrays;

/**
 * 排序算法集合类
 * 包含多种常见的排序算法实现
 */
public class SortingAlgorithms {
    
    /**
     * 冒泡排序
     * 时间复杂度: O(n²)
     * 空间复杂度: O(1)
     */
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // 如果没有发生交换，说明数组已经有序
            if (!swapped) {
                break;
            }
        }
    }
    
    /**
     * 快速排序
     * 时间复杂度: 平均O(nlogn)，最坏O(n²)
     * 空间复杂度: O(logn)
     */
    public static void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }
    
    private static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    /**
     * 归并排序
     * 时间复杂度: O(nlogn)
     * 空间复杂度: O(n)
     */
    public static void mergeSort(int[] arr) {
        mergeSort(arr, 0, arr.length - 1);
    }
    
    private static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];
        
        for (int i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (int j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }
        
        int i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
    /**
     * 插入排序
     * 时间复杂度: O(n²)
     * 空间复杂度: O(1)
     */
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    /**
     * 选择排序
     * 时间复杂度: O(n²)
     * 空间复杂度: O(1)
     */
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }
    
    /**
     * 堆排序
     * 时间复杂度: O(nlogn)
     * 空间复杂度: O(1)
     */
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // 构建最大堆
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // 逐个从堆中取出元素
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            heapify(arr, i, 0);
        }
    }
    
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            heapify(arr, n, largest);
        }
    }
    
    /**
     * 希尔排序
     * 时间复杂度: O(n^1.3)
     * 空间复杂度: O(1)
     */
    public static void shellSort(int[] arr) {
        int n = arr.length;
        
        for (int gap = n / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                arr[j] = temp;
            }
        }
    }
    
    /**
     * 计数排序
     * 时间复杂度: O(n + k)
     * 空间复杂度: O(k)
     */
    public static void countingSort(int[] arr) {
        int n = arr.length;
        if (n == 0) return;
        
        // 找到最大值和最小值
        int max = arr[0], min = arr[0];
        for (int i = 1; i < n; i++) {
            if (arr[i] > max) max = arr[i];
            if (arr[i] < min) min = arr[i];
        }
        
        int range = max - min + 1;
        int[] count = new int[range];
        int[] output = new int[n];
        
        // 计数
        for (int i = 0; i < n; i++) {
            count[arr[i] - min]++;
        }
        
        // 累加计数
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }
        
        // 构建输出数组
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }
        
        // 复制回原数组
        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }
    
    /**
     * 打印数组
     */
    public static void printArray(int[] arr) {
        System.out.println(Arrays.toString(arr));
    }
    
    /**
     * 测试所有排序算法
     */
    public static void main(String[] args) {
        int[] arr1 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr2 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr3 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr4 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr5 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr6 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr7 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr8 = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("原始数组:");
        printArray(arr1);
        
        System.out.println("\n=== 冒泡排序 ===");
        bubbleSort(arr1);
        printArray(arr1);
        
        System.out.println("\n=== 快速排序 ===");
        quickSort(arr2);
        printArray(arr2);
        
        System.out.println("\n=== 归并排序 ===");
        mergeSort(arr3);
        printArray(arr3);
        
        System.out.println("\n=== 插入排序 ===");
        insertionSort(arr4);
        printArray(arr4);
        
        System.out.println("\n=== 选择排序 ===");
        selectionSort(arr5);
        printArray(arr5);
        
        System.out.println("\n=== 堆排序 ===");
        heapSort(arr6);
        printArray(arr6);
        
        System.out.println("\n=== 希尔排序 ===");
        shellSort(arr7);
        printArray(arr7);
        
        System.out.println("\n=== 计数排序 ===");
        countingSort(arr8);
        printArray(arr8);
    }
}