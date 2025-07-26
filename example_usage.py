#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
排序算法使用示例
"""

from sorting_algorithms import (
    bubble_sort, selection_sort, insertion_sort,
    quick_sort, merge_sort, heap_sort, counting_sort
)


def simple_example():
    """简单使用示例"""
    print("=== 简单排序示例 ===\n")
    
    # 测试数据
    test_data = [64, 34, 25, 12, 22, 11, 90]
    print(f"原始数组: {test_data}")
    print()
    
    # 使用不同的排序算法
    algorithms = [
        ("冒泡排序", bubble_sort),
        ("选择排序", selection_sort),
        ("插入排序", insertion_sort),
        ("快速排序", quick_sort),
        ("归并排序", merge_sort),
        ("堆排序", heap_sort),
        ("计数排序", counting_sort),
    ]
    
    for name, sort_func in algorithms:
        # 创建副本避免修改原数组
        arr_copy = test_data.copy()
        sorted_arr = sort_func(arr_copy)
        print(f"{name}: {sorted_arr}")


def performance_comparison():
    """性能比较示例"""
    print("\n=== 性能比较示例 ===\n")
    
    import random
    import time
    
    # 生成测试数据
    test_data = [random.randint(1, 1000) for _ in range(1000)]
    
    algorithms = [
        ("快速排序", quick_sort),
        ("归并排序", merge_sort),
        ("堆排序", heap_sort),
        ("插入排序", insertion_sort),
        ("选择排序", selection_sort),
        ("冒泡排序", bubble_sort),
    ]
    
    results = []
    
    for name, sort_func in algorithms:
        arr_copy = test_data.copy()
        
        start_time = time.time()
        sorted_arr = sort_func(arr_copy)
        end_time = time.time()
        
        execution_time = end_time - start_time
        results.append((name, execution_time))
        
        print(f"{name}: {execution_time:.6f} 秒")
    
    # 按执行时间排序
    results.sort(key=lambda x: x[1])
    print(f"\n按性能排序:")
    for i, (name, time_taken) in enumerate(results, 1):
        print(f"{i}. {name}: {time_taken:.6f} 秒")


if __name__ == "__main__":
    simple_example()
    performance_comparison()