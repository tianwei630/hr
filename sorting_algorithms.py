#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
排序算法集合
包含多种常见的排序算法实现
"""

import random
import time
from typing import List, Callable


def bubble_sort(arr: List[int]) -> List[int]:
    """
    冒泡排序
    时间复杂度: O(n²)
    空间复杂度: O(1)
    稳定性: 稳定
    """
    n = len(arr)
    for i in range(n):
        # 标记此轮是否发生交换
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # 如果没有发生交换，说明已经有序
        if not swapped:
            break
    return arr


def selection_sort(arr: List[int]) -> List[int]:
    """
    选择排序
    时间复杂度: O(n²)
    空间复杂度: O(1)
    稳定性: 不稳定
    """
    n = len(arr)
    for i in range(n):
        # 找到未排序部分的最小值
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # 将最小值放到已排序部分的末尾
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr


def insertion_sort(arr: List[int]) -> List[int]:
    """
    插入排序
    时间复杂度: O(n²)
    空间复杂度: O(1)
    稳定性: 稳定
    """
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # 将key插入到已排序部分的正确位置
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr


def quick_sort(arr: List[int]) -> List[int]:
    """
    快速排序
    时间复杂度: 平均O(nlogn)，最坏O(n²)
    空间复杂度: O(logn)
    稳定性: 不稳定
    """
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)


def merge_sort(arr: List[int]) -> List[int]:
    """
    归并排序
    时间复杂度: O(nlogn)
    空间复杂度: O(n)
    稳定性: 稳定
    """
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)


def merge(left: List[int], right: List[int]) -> List[int]:
    """归并两个有序数组"""
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def heap_sort(arr: List[int]) -> List[int]:
    """
    堆排序
    时间复杂度: O(nlogn)
    空间复杂度: O(1)
    稳定性: 不稳定
    """
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and arr[left] > arr[largest]:
            largest = left
        
        if right < n and arr[right] > arr[largest]:
            largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)
    
    n = len(arr)
    
    # 构建最大堆
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # 逐个提取堆顶元素
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr


def counting_sort(arr: List[int]) -> List[int]:
    """
    计数排序
    时间复杂度: O(n + k)，k为数据范围
    空间复杂度: O(k)
    稳定性: 稳定
    适用于数据范围不大的整数排序
    """
    if not arr:
        return arr
    
    # 找到最大值和最小值
    max_val = max(arr)
    min_val = min(arr)
    
    # 创建计数数组
    count_size = max_val - min_val + 1
    count = [0] * count_size
    
    # 统计每个元素出现的次数
    for num in arr:
        count[num - min_val] += 1
    
    # 重建排序后的数组
    result = []
    for i in range(count_size):
        result.extend([i + min_val] * count[i])
    
    return result


def test_sorting_algorithm(sort_func: Callable, arr: List[int], name: str):
    """测试排序算法的性能和正确性"""
    arr_copy = arr.copy()
    
    # 记录开始时间
    start_time = time.time()
    sorted_arr = sort_func(arr_copy)
    end_time = time.time()
    
    # 验证排序结果
    is_correct = sorted_arr == sorted(arr)
    
    print(f"{name}:")
    print(f"  正确性: {'✓' if is_correct else '✗'}")
    print(f"  耗时: {end_time - start_time:.6f} 秒")
    print(f"  结果: {sorted_arr[:10]}{'...' if len(sorted_arr) > 10 else ''}")
    print()


def main():
    """主函数：演示各种排序算法"""
    print("=== 排序算法演示 ===\n")
    
    # 生成测试数据
    test_sizes = [100, 1000, 10000]
    
    for size in test_sizes:
        print(f"测试数据大小: {size}")
        print("=" * 50)
        
        # 生成随机数组
        arr = [random.randint(1, 1000) for _ in range(size)]
        
        # 测试各种排序算法
        algorithms = [
            (bubble_sort, "冒泡排序"),
            (selection_sort, "选择排序"),
            (insertion_sort, "插入排序"),
            (quick_sort, "快速排序"),
            (merge_sort, "归并排序"),
            (heap_sort, "堆排序"),
            (counting_sort, "计数排序"),
        ]
        
        for sort_func, name in algorithms:
            if size <= 1000 or name in ["快速排序", "归并排序", "堆排序", "计数排序"]:
                test_sorting_algorithm(sort_func, arr, name)
        
        print()


if __name__ == "__main__":
    main()