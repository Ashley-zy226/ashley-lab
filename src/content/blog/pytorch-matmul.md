---
title: "从矩阵乘法看 PyTorch 张量计算"
description: "用一次最小实验串起矩阵乘法、张量形状与运行时间测量。"
date: 2026-11-17
category: deep-learning
tags: [ai, deep-learning, pytorch]
featured: true
example: true
---

矩阵乘法是神经网络线性变换的基础。这篇示例文章从形状入手，用一组小矩阵检查计算结果，再说明怎样避免误读 GPU 计时。阅读时可以把三个问题分开：数学上在算什么，框架收到了怎样的张量，以及实际运行时把哪些工作放进了计时区间。

## 先从矩阵形状开始

令 $A \in \mathbb{R}^{m \times k}$，$B \in \mathbb{R}^{k \times n}$。只有第一个矩阵的列数等于第二个矩阵的行数时，这个矩阵乘积才有定义：

$$
C_{ij} = \sum_{p=1}^{k} A_{ip} B_{pj},\qquad
C \in \mathbb{R}^{m \times n}.
$$

可以把输出的每个元素理解为一次行向量与列向量的点积。例如，输入形状为 `(2, 3)` 和 `(3, 4)`，输出应为 `(2, 4)`。

## 用 PyTorch 验证

下面的代码仅使用 CPU。先检查输出形状，再手算第一行和第一列的点积，核对结果中的第一个数。

```python
import torch

a = torch.arange(6, dtype=torch.float32).reshape(2, 3)
b = torch.arange(12, dtype=torch.float32).reshape(3, 4)
c = a @ b

assert c.shape == (2, 4)
assert c[0, 0].item() == 20.0  # 0×0 + 1×4 + 2×8
print(c)
```

### 观察张量步幅

`a.stride()` 返回 `(3, 1)`，表示沿第 0 维移动一格跨过三个元素，沿第 1 维移动一格跨过一个元素。尝试输出 `a.T.stride()`，观察转置视图如何交换这两个步幅。形状描述逻辑维度，步幅描述逻辑索引如何映射到内存。

## 如何测量运行时间

在 GPU 上，许多 PyTorch 操作会异步提交。若只用 CPU 时钟把一次调用包起来，测到的可能主要是提交开销。可以使用同一 CUDA 流中的 CUDA events 计时，或在使用 CPU 时钟时于计时边界显式同步。

1. 固定矩阵形状、数据类型与设备。
2. 在计时前完成输入分配并预热。
3. 多轮采样，报告中位数，并写清楚是否计入传输和同步。

如果结果差异很大，先确认两轮实验是否测量了同一组操作，再讨论实现的快慢。

## 延伸阅读

- [PyTorch：torch.matmul](https://docs.pytorch.org/docs/stable/generated/torch.matmul.html)
- [PyTorch：CUDA 异步执行与计时](https://docs.pytorch.org/docs/stable/notes/cuda.html#asynchronous-execution)
